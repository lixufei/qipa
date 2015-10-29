ENV['RACK_ENV'] = 'test'

require 'rspec'
require 'rack/test'

require_relative File.join('..', 'plant_application')

RSpec.configure do |config|
	include Rack::Test::Methods

	config.color = true
	config.tty = true

	def app
	 PlantApplication
	end
end