# frozen_string_literal: true

require 'csv'
require 'zip'
require 'set'

class ChatbotActivityReport
  META_KEYS = Set.new(%w[gs1 sk pk _type]).freeze
  HIDDEN_COLUMNS = ['msg_chatId', 'chat_userId'].freeze

  def initialize(start_date:, end_date:)
    @start_date = start_date
    @end_date = end_date
    @user_uuids = []
  end

  def client
    @client ||= Aws::DynamoDB::Client.new
  end

  def each_dynamodb_row(&block)
    last_key = nil
    loop do
      resp = client.scan(
        table_name: Rails.application.secrets.chatbot[:table_name],
        exclusive_start_key: last_key,
        expression_attribute_names: {
          '#CR' => 'created',
          '#TY' => '_type',
        },
        expression_attribute_values: {
          ':startdate' => @start_date.iso8601,
          ':enddate' => (@end_date + 1.day).iso8601,
          ':type' => 'Message',
          ':chat' => 'Chat',
          ':user' => 'User'
        },
        filter_expression: '(#TY = :type AND #CR > :startdate AND #CR < :enddate) OR (#TY = :chat) OR (#TY = :user)',
      )
      resp.items.each(&block)
      last_key = resp.last_evaluated_key
      break unless last_key
    end
  end

  def tables
    return @tables if @tables.present?

    @tables = Hash.new { |h, k| h[k] = {} }
    each_dynamodb_row do |row|
      type = row['_type']
      @tables[type][row['id']] = row.reject { |key| META_KEYS.include?(key) }

    end
    @tables
  end

  def chat_and_user_for_msg(msg)
    chat = (tables['Chat'][msg['chatId']] || {}).clone
    user = (tables['User'][chat['userId']] || {}).clone
    [chat, user]
  end

  def each_message(&block)
    tables['Message'].values.sort_by { |msg| msg['created'] }.each do |msg|
      chat, user = chat_and_user_for_msg(msg)
      block.call(msg, chat, user)
    end
  end

  def columns_for_rows
    columns = Set.new
    each_message do |msg, chat, user|
      user.each { |key, _| columns.add("user_#{key}") }
      chat.each { |key, _| columns.add("chat_#{key}") }
      msg.each do |key, _|
        columns.add("msg_#{key}") unless META_KEYS.include?(key)
      end
    end
    columns.subtract(HIDDEN_COLUMNS)
  end

  def as_csv_string

    CSV.generate do |csv|
      columns = columns_for_rows
      csv << columns.map(&:titleize)
      each_message do |msg, chat, user|

        user['id'] = ResearchId.for_user_id(user['id']).id if user['id']

        row = []
        columns.each do |column|
          prefix, key = column.split('_')
          case prefix
          when 'chat' then row << chat[key]
          when 'user' then row << user[key]
          when 'msg' then row << msg[key]
          end
        end
        csv << row
      end
    end
  end

end
