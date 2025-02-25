# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Environment', api: :v1 do

  let(:user_id) { SecureRandom.uuid }

  describe 'fetch' do
    context 'when no user is logged in' do
      it 'rejects the request' do
        get '/api/v1/preferences'
        expect(response).to have_http_status(:unauthorized)
      end
    end

    context 'with a new user' do
      before { stub_current_user(user_id) }

      it 'returns default preferences' do
        expect {
          get '/api/v1/preferences'
        }.to not_change { UserPreferences.count }
        expect(response).to have_http_status(:ok)
        expect(response_hash).to match(
          a_hash_including(
            digital_badge_available_email: false,
            session_available_email: true,
            study_available_email: false
          )
        )
      end
    end

    context 'with an existing user' do
      before { stub_current_user(user_id) }

      it 'returns their saved preferences' do
        UserPreferences.create!(user_id:, digital_badge_available_email: true)
        get '/api/v1/preferences'
        expect(response).to have_http_status(:ok)
        expect(response_hash).to match(
          a_hash_including(
            digital_badge_available_email: true,
            session_available_email: true,
            study_available_email: false
          )
        )
      end

    end
  end

  describe 'update' do
    context 'when no user is logged in' do
      it 'rejects the request' do
        post '/api/v1/preferences', params: { preferences: { digital_badge_available_email: true } }
        expect(response).to have_http_status(:unauthorized)
      end
    end

    context 'with an existing user' do
      before { stub_current_user(user_id) }

      it 'updates' do
        expect {
          post '/api/v1/preferences', params: { preferences: { digital_badge_available_email: true } }
          expect(response).to have_http_status(:accepted)
        }.to change { UserPreferences.count }.by(1)
        expect(UserPreferences.for_user_id(user_id).digital_badge_available_email).to be true

        post '/api/v1/preferences', params: { preferences: { digital_badge_available_email: false } }
        expect(UserPreferences.for_user_id(user_id).digital_badge_available_email).to be false
      end

      it 'updates the settings' do
        post '/api/v1/preferences', params: { preferences: { has_viewed_analysis_tutorial: true } }
        expect(response).to have_http_status(:accepted)
        expect(UserPreferences.for_user_id(user_id).has_viewed_analysis_tutorial).to be true
      end

    end
  end

end
