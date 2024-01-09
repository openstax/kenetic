=begin
#OpenStax Kinetic API

#The Kinetic API for OpenStax.  Requests to this API should include `application/json` in the `Accept` header.  The desired API version is specified in the request URL, e.g. `[domain]/api/v1/researcher/studies`. While the API does support a default version, that version will change over time and therefore should not be used in production code! 

The version of the OpenAPI document: 0.1.0

Generated by: https://openapi-generator.tech
OpenAPI Generator version: 6.6.0

=end

require 'date'
require 'time'

module Api::V1::Bindings
  class EnvironmentUser
    # The user's ID.
    attr_accessor :user_id

    # If true, the user is an administrator
    attr_accessor :is_administrator

    # If true, the user is a researcher
    attr_accessor :is_researcher

    attr_accessor :uuid

    # Full name
    attr_accessor :name

    # Full name
    attr_accessor :full_name

    attr_accessor :first_name

    attr_accessor :last_name

    attr_accessor :support_identifier

    attr_accessor :applications

    attr_accessor :signed_contract_names

    attr_accessor :external_ids

    # Users contact information
    attr_accessor :contact_infos

    attr_accessor :is_not_gdpr_location

    attr_accessor :is_test

    attr_accessor :opt_out_of_cookies

    attr_accessor :using_openstax

    attr_accessor :needs_complete_edu_profile

    attr_accessor :faculty_status

    attr_accessor :self_reported_role

    attr_accessor :school_type

    attr_accessor :school_location

    # Attribute mapping from ruby-style variable name to JSON key.
    def self.attribute_map
      {
        :'user_id' => :'user_id',
        :'is_administrator' => :'is_administrator',
        :'is_researcher' => :'is_researcher',
        :'uuid' => :'uuid',
        :'name' => :'name',
        :'full_name' => :'full_name',
        :'first_name' => :'first_name',
        :'last_name' => :'last_name',
        :'support_identifier' => :'support_identifier',
        :'applications' => :'applications',
        :'signed_contract_names' => :'signed_contract_names',
        :'external_ids' => :'external_ids',
        :'contact_infos' => :'contact_infos',
        :'is_not_gdpr_location' => :'is_not_gdpr_location',
        :'is_test' => :'is_test',
        :'opt_out_of_cookies' => :'opt_out_of_cookies',
        :'using_openstax' => :'using_openstax',
        :'needs_complete_edu_profile' => :'needs_complete_edu_profile',
        :'faculty_status' => :'faculty_status',
        :'self_reported_role' => :'self_reported_role',
        :'school_type' => :'school_type',
        :'school_location' => :'school_location'
      }
    end

    # Returns all the JSON keys this model knows about
    def self.acceptable_attributes
      attribute_map.values
    end

    # Attribute type mapping.
    def self.openapi_types
      {
        :'user_id' => :'String',
        :'is_administrator' => :'Boolean',
        :'is_researcher' => :'Boolean',
        :'uuid' => :'String',
        :'name' => :'String',
        :'full_name' => :'String',
        :'first_name' => :'String',
        :'last_name' => :'String',
        :'support_identifier' => :'String',
        :'applications' => :'Array<String>',
        :'signed_contract_names' => :'Array<String>',
        :'external_ids' => :'Array<String>',
        :'contact_infos' => :'Array<ContactInfo>',
        :'is_not_gdpr_location' => :'Boolean',
        :'is_test' => :'Boolean',
        :'opt_out_of_cookies' => :'Boolean',
        :'using_openstax' => :'Boolean',
        :'needs_complete_edu_profile' => :'Boolean',
        :'faculty_status' => :'String',
        :'self_reported_role' => :'String',
        :'school_type' => :'String',
        :'school_location' => :'String'
      }
    end

    # List of attributes with nullable: true
    def self.openapi_nullable
      Set.new([
      ])
    end

    # Initializes the object
    # @param [Hash] attributes Model attributes in the form of hash
    def initialize(attributes = {})
      if (!attributes.is_a?(Hash))
        fail ArgumentError, "The input argument (attributes) must be a hash in `Api::V1::Bindings::EnvironmentUser` initialize method"
      end

      # check to see if the attribute exists and convert string to symbol for hash key
      attributes = attributes.each_with_object({}) { |(k, v), h|
        if (!self.class.attribute_map.key?(k.to_sym))
          fail ArgumentError, "`#{k}` is not a valid attribute in `Api::V1::Bindings::EnvironmentUser`. Please check the name to make sure it's valid. List of attributes: " + self.class.attribute_map.keys.inspect
        end
        h[k.to_sym] = v
      }

      if attributes.key?(:'user_id')
        self.user_id = attributes[:'user_id']
      end

      if attributes.key?(:'is_administrator')
        self.is_administrator = attributes[:'is_administrator']
      end

      if attributes.key?(:'is_researcher')
        self.is_researcher = attributes[:'is_researcher']
      end

      if attributes.key?(:'uuid')
        self.uuid = attributes[:'uuid']
      end

      if attributes.key?(:'name')
        self.name = attributes[:'name']
      end

      if attributes.key?(:'full_name')
        self.full_name = attributes[:'full_name']
      end

      if attributes.key?(:'first_name')
        self.first_name = attributes[:'first_name']
      end

      if attributes.key?(:'last_name')
        self.last_name = attributes[:'last_name']
      end

      if attributes.key?(:'support_identifier')
        self.support_identifier = attributes[:'support_identifier']
      end

      if attributes.key?(:'applications')
        if (value = attributes[:'applications']).is_a?(Array)
          self.applications = value
        end
      end

      if attributes.key?(:'signed_contract_names')
        if (value = attributes[:'signed_contract_names']).is_a?(Array)
          self.signed_contract_names = value
        end
      end

      if attributes.key?(:'external_ids')
        if (value = attributes[:'external_ids']).is_a?(Array)
          self.external_ids = value
        end
      end

      if attributes.key?(:'contact_infos')
        if (value = attributes[:'contact_infos']).is_a?(Array)
          self.contact_infos = value
        end
      end

      if attributes.key?(:'is_not_gdpr_location')
        self.is_not_gdpr_location = attributes[:'is_not_gdpr_location']
      end

      if attributes.key?(:'is_test')
        self.is_test = attributes[:'is_test']
      end

      if attributes.key?(:'opt_out_of_cookies')
        self.opt_out_of_cookies = attributes[:'opt_out_of_cookies']
      end

      if attributes.key?(:'using_openstax')
        self.using_openstax = attributes[:'using_openstax']
      end

      if attributes.key?(:'needs_complete_edu_profile')
        self.needs_complete_edu_profile = attributes[:'needs_complete_edu_profile']
      end

      if attributes.key?(:'faculty_status')
        self.faculty_status = attributes[:'faculty_status']
      end

      if attributes.key?(:'self_reported_role')
        self.self_reported_role = attributes[:'self_reported_role']
      end

      if attributes.key?(:'school_type')
        self.school_type = attributes[:'school_type']
      end

      if attributes.key?(:'school_location')
        self.school_location = attributes[:'school_location']
      end
    end

    # Show invalid properties with the reasons. Usually used together with valid?
    # @return Array for valid properties with the reasons
    def list_invalid_properties
      invalid_properties = Array.new
      if @is_administrator.nil?
        invalid_properties.push('invalid value for "is_administrator", is_administrator cannot be nil.')
      end

      if @is_researcher.nil?
        invalid_properties.push('invalid value for "is_researcher", is_researcher cannot be nil.')
      end

      invalid_properties
    end

    # Check to see if the all the properties in the model are valid
    # @return true if the model is valid
    def valid?
      return false if @is_administrator.nil?
      return false if @is_researcher.nil?
      true
    end

    # Checks equality by comparing each attribute.
    # @param [Object] Object to be compared
    def ==(o)
      return true if self.equal?(o)
      self.class == o.class &&
          user_id == o.user_id &&
          is_administrator == o.is_administrator &&
          is_researcher == o.is_researcher &&
          uuid == o.uuid &&
          name == o.name &&
          full_name == o.full_name &&
          first_name == o.first_name &&
          last_name == o.last_name &&
          support_identifier == o.support_identifier &&
          applications == o.applications &&
          signed_contract_names == o.signed_contract_names &&
          external_ids == o.external_ids &&
          contact_infos == o.contact_infos &&
          is_not_gdpr_location == o.is_not_gdpr_location &&
          is_test == o.is_test &&
          opt_out_of_cookies == o.opt_out_of_cookies &&
          using_openstax == o.using_openstax &&
          needs_complete_edu_profile == o.needs_complete_edu_profile &&
          faculty_status == o.faculty_status &&
          self_reported_role == o.self_reported_role &&
          school_type == o.school_type &&
          school_location == o.school_location
    end

    # @see the `==` method
    # @param [Object] Object to be compared
    def eql?(o)
      self == o
    end

    # Calculates hash code according to all attributes.
    # @return [Integer] Hash code
    def hash
      [user_id, is_administrator, is_researcher, uuid, name, full_name, first_name, last_name, support_identifier, applications, signed_contract_names, external_ids, contact_infos, is_not_gdpr_location, is_test, opt_out_of_cookies, using_openstax, needs_complete_edu_profile, faculty_status, self_reported_role, school_type, school_location].hash
    end

    # Builds the object from hash
    # @param [Hash] attributes Model attributes in the form of hash
    # @return [Object] Returns the model itself
    def self.build_from_hash(attributes)
      new.build_from_hash(attributes)
    end

    # Builds the object from hash
    # @param [Hash] attributes Model attributes in the form of hash
    # @return [Object] Returns the model itself
    def build_from_hash(attributes)
      return nil unless attributes.is_a?(Hash)
      attributes = attributes.transform_keys(&:to_sym)
      self.class.openapi_types.each_pair do |key, type|
        if attributes[self.class.attribute_map[key]].nil? && self.class.openapi_nullable.include?(key)
          self.send("#{key}=", nil)
        elsif type =~ /\AArray<(.*)>/i
          # check to ensure the input is an array given that the attribute
          # is documented as an array but the input is not
          if attributes[self.class.attribute_map[key]].is_a?(Array)
            self.send("#{key}=", attributes[self.class.attribute_map[key]].map { |v| _deserialize($1, v) })
          end
        elsif !attributes[self.class.attribute_map[key]].nil?
          self.send("#{key}=", _deserialize(type, attributes[self.class.attribute_map[key]]))
        end
      end

      self
    end

    # Deserializes the data based on type
    # @param string type Data type
    # @param string value Value to be deserialized
    # @return [Object] Deserialized data
    def _deserialize(type, value)
      case type.to_sym
      when :Time
        Time.parse(value)
      when :Date
        Date.parse(value)
      when :String
        value.to_s
      when :Integer
        value.to_i
      when :Float
        value.to_f
      when :Boolean
        if value.to_s =~ /\A(true|t|yes|y|1)\z/i
          true
        else
          false
        end
      when :Object
        # generic object (usually a Hash), return directly
        value
      when /\AArray<(?<inner_type>.+)>\z/
        inner_type = Regexp.last_match[:inner_type]
        value.map { |v| _deserialize(inner_type, v) }
      when /\AHash<(?<k_type>.+?), (?<v_type>.+)>\z/
        k_type = Regexp.last_match[:k_type]
        v_type = Regexp.last_match[:v_type]
        {}.tap do |hash|
          value.each do |k, v|
            hash[_deserialize(k_type, k)] = _deserialize(v_type, v)
          end
        end
      else # model
        # models (e.g. Pet) or oneOf
        klass = Api::V1::Bindings.const_get(type)
        klass.respond_to?(:openapi_one_of) ? klass.build(value) : klass.build_from_hash(value)
      end
    end

    # Returns the string representation of the object
    # @return [String] String presentation of the object
    def to_s
      to_hash.to_s
    end

    # to_body is an alias to to_hash (backward compatibility)
    # @return [Hash] Returns the object in the form of hash
    def to_body
      to_hash
    end

    # Returns the object in the form of hash
    # @return [Hash] Returns the object in the form of hash
    def to_hash
      hash = {}
      self.class.attribute_map.each_pair do |attr, param|
        value = self.send(attr)
        if value.nil?
          is_nullable = self.class.openapi_nullable.include?(attr)
          next if !is_nullable || (is_nullable && !instance_variable_defined?(:"@#{attr}"))
        end

        hash[param] = _to_hash(value)
      end
      hash
    end

    # Outputs non-array value in the form of hash
    # For object, use to_hash. Otherwise, just return the value
    # @param [Object] value Any valid value
    # @return [Hash] Returns the value in the form of hash
    def _to_hash(value)
      if value.is_a?(Array)
        value.compact.map { |v| _to_hash(v) }
      elsif value.is_a?(Hash)
        {}.tap do |hash|
          value.each { |k, v| hash[k] = _to_hash(v) }
        end
      elsif value.respond_to? :to_hash
        value.to_hash
      else
        value
      end
    end

  end

end
