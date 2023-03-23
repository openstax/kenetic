# frozen_string_literal: true

class Api::V1::BaseStudiesOpenApi
  include OpenStax::OpenApi::Blocks

  openapi_component do
    schema :BaseStudy do
      property :title_for_participants do
        key :type, :string
        key :description, 'The study name that participants see.'
        key :minLength, 1
      end
      property :title_for_researchers do
        key :type, :string
        key :description, 'The study name that only researchers see.'
        key :minLength, 1
      end
      property :short_description do
        key :type, :string
        key :description, 'A short study description.'
      end
      property :long_description do
        key :type, :string
        key :description, 'A long study description.'
      end
      property :tags do
        key :type, :array
        key :minLength, 0
        key :items, { 'type' => 'string' }
        key :description, 'The tags of the study object, used for grouping and filtering.'
      end
      property :feedback_description do
        key :type, :string
        key :description, 'Description of feedback displayed to the user upon study completion'
      end
      property :image_id do
        key :type, :string
        key :description, 'Freeform id of image that should be displayed on study card'
      end
      property :benefits do
        key :type, :string
        key :description, 'Description of how the study benefits participants'
      end
      property :is_hidden do
        key :type, :boolean
        key :description, 'Is the study hidden from participants'
      end
      property :opens_at do
        key :type, :string
        key :nullable, true
        key :format, 'date-time'
        key :description, 'When the study opens for participation; null means not open.'
      end
      property :closes_at do
        key :type, :string
        key :nullable, true
        key :format, 'date-time'
        key :description, 'When the study closes for participation; null means does not close.'
      end
      property :first_launched_at do
        key :type, :string
        key :format, 'date-time'
        key :description, 'When the study was launched; null means not launched'
      end
      property :researcher_pi do
        key :$ref, :Researcher
        key :description, 'The study\`s primary investogator'
      end
      property :researcher_lead do
        key :$ref, :Researcher
        key :description, 'The study\`s lead investigator'
      end
      property :is_mandatory do
        key :type, :boolean
        key :description, 'Mandatory studies must be completed by all users'
      end
      property :status do
        key :type, :string
        key :description, 'Status of the study'
        key :enum, %w[active paused scheduled draft completed]
      end
      property :view_count do
        key :type, :number
        key :description, 'How many times the study has been viewed'
      end
      property :completed_count do
        key :type, :number
        key :description, 'Number of times this study has been completed'
        key :readOnly, true
      end
      property :study_type do
        key :type, :string
        key :description, 'The type of study'
      end
      property :stages do
        key :type, :array
        key :description, 'The study\'s stages.'
        items do
          key :$ref, :Stage
        end
      end
    end
  end
end
