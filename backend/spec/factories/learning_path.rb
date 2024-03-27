# frozen_string_literal: true

FactoryBot.define do
  factory :learning_path do
    label { Faker::Hobby.activity }
    description { Faker::Hobby.activity }
    badge_id { ENV.fetch('OBF_EXAMPLE_BADGE_ID', nil) }
  end
end
