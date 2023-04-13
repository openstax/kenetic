# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Studies', api: :v1 do

  let(:researcher1) { create(:researcher) }
  let(:researcher2) { create(:researcher) }

  # describe 'Update nested fields' do
  #   let!(:study) { create(:study, researchers: researcher1) }
  #   let(:stage) { create(:stage) }
  #
  #   it 'updates stages?' do
  #     binding = Api::V1::Bindings::StudyUpdate.new({ title_for_researchers: 'Test', stages: [ stage ] })
  #     binding.update_model!(study)
  #   end
  # end

  describe 'POST researcher/studies' do
    let(:valid_new_study_attributes) do
      {
        title_for_participants: 'Participant study title',
        title_for_researchers: 'Researcher study title',
        internal_description: 'For researchers only',
        short_description: 'A short description',
        long_description: 'A longer description',
        study_type: 'Research',
        study_topic: 'Learning',
        study_subject: 'Biology',
        benefits: 'Some benefit to society',
        image_id: 'Schoolfuturecareer_1',
        stages: [
          {
            points: 10,
            duration_minutes: 5,
            feedback_types: ['debrief, personalized'],
            config: {
              type: 'qualtrics',
              survey_id: 'SV_12QHR3BE',
              secret_key: '1234567890123456'
            }
          }
        ]
      }
    end

    context 'when logged out' do
      it 'gives unauthorized' do
        api_post 'researcher/studies', params: { study: valid_new_study_attributes }
        expect(response).to have_http_status(:unauthorized)
      end
    end

    context 'when signed in as a non-researcher' do
      before { stub_random_user }

      it 'gives forbidden' do
        api_post 'researcher/studies', params: { study: valid_new_study_attributes }
        expect(response).to have_http_status(:forbidden)
      end
    end

    context 'when signed in as a researcher' do
      before { stub_current_user(researcher1) }

      it 'successfully creates a new study' do
        api_post 'researcher/studies', params: { study: valid_new_study_attributes }
        expect(response).to have_http_status(:created)
        expect(response_hash).to match(
          a_hash_including(
            title_for_participants: 'Participant study title',
            return_url: kind_of(String),
            researchers: a_collection_including(
              a_hash_including(
                user_id: researcher1.user_id
              )
            )
          )
        )
      end
    end
  end

  describe 'GET researcher/studies' do
    context 'when logged out' do
      it 'gives unauthorized' do
        api_get 'researcher/studies'
        expect(response).to have_http_status(:unauthorized)
      end
    end

    context 'when signed in as a non-researcher' do
      before { stub_random_user }

      it 'gives forbidden' do
        api_get 'researcher/studies'
        expect(response).to have_http_status(:forbidden)
      end
    end

    context 'when signed in as a researcher' do
      before do
        create(:study, researchers: researcher1)
        create(:study, researchers: researcher2)
        stub_current_user(researcher1)
      end

      it 'returns only the studies owned by the calling researcher' do
        api_get 'researcher/studies'
        expect(response).to have_http_status(:success)
        expect(response_hash[:data]).to match a_collection_containing_exactly(
          a_hash_including(
            return_url: kind_of(String),
            researchers: a_collection_including(
              a_hash_including(
                user_id: researcher1.user_id
              )
            )
          )
        )
      end
    end
  end

  describe 'PUT researcher/study' do
    let!(:study1) { create(:study, researchers: researcher1) }

    context 'when logged out' do
      it 'gives unauthorized' do
        api_put "researcher/studies/#{study1.id}", params: { study: { is_mandatory: true } }
        expect(response).to have_http_status(:unauthorized)
      end
    end

    context 'when signed in as a non-researcher' do
      before { stub_random_user }

      it 'gives forbidden' do
        expect {
          api_put "researcher/studies/#{study1.id}", params: { study: { is_mandatory: true } }
        }.not_to change { study1.reload; study1.is_mandatory }
        expect(response).to have_http_status(:forbidden)
      end
    end

    context 'when signed as the owning researcher' do
      before { stub_current_user(researcher1) }

      it 'updates the study' do
        api_put "researcher/studies/#{study1.id}", params: { study: { is_mandatory: true } }

        expect(response).to have_http_status(:success)
        expect(response_hash).to match(
          a_hash_including(is_mandatory: true)
        )
      end

      it 'cannot blank required fields' do
        expect {
          api_put "researcher/studies/#{study1.id}",
                  params: { study: { internal_description: '' } }
        }.not_to change { study1.internal_description }
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end

  describe 'DELETE researcher/study' do
    let!(:study1) { create(:study, researchers: researcher1) }

    context 'when logged out' do
      it 'gives unauthorized' do
        api_delete "researcher/studies/#{study1.id}"
        expect(response).to have_http_status(:unauthorized)
        expect(study1).not_to be_destroyed
      end
    end

    context 'when signed in as a non-researcher' do
      before { stub_random_user }

      it 'gives forbidden' do
        api_delete "researcher/studies/#{study1.id}"
        expect(response).to have_http_status(:forbidden)
        expect(study1).not_to be_destroyed
      end
    end

    context 'when signed as the owning researcher' do
      before { stub_current_user(researcher1) }

      it 'hides the study' do
        api_delete "researcher/studies/#{study1.id}"
        expect(response).to have_http_status(:ok)
        expect(study1.reload.is_hidden).to be(true)
        expect(study1).not_to be_destroyed
      end
    end
  end

  describe 'GET researcher/study' do
    let!(:study1) { create(:study, researchers: researcher1) }

    context 'when logged out' do
      it 'gives unauthorized' do
        api_get "researcher/studies/#{study1.id}"
        expect(response).to have_http_status(:unauthorized)
      end
    end

    context 'when signed in as a non-researcher' do
      before { stub_random_user }

      it 'gives forbidden' do
        api_get "researcher/studies/#{study1.id}"
        expect(response).to have_http_status(:forbidden)
      end
    end

    context 'when signed as the owning researcher' do
      before { stub_current_user(researcher1) }

      it 'deletes the study' do
        api_get "researcher/studies/#{study1.id}"
        expect(response).to have_http_status(:ok)
        expect(response_hash).to match(
          a_hash_including(id: study1.id)
        )
      end
    end
  end
end
