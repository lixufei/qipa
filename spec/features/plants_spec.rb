require_relative '../spec_helper'

describe 'Root Path' do
	describe 'GET /plants' do
		# before { get '/plants' }

		it 'is successful' do
			get '/plants'
			expect(last_response.status).to eq 200
		end
	end
end