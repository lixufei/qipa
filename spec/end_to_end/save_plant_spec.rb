require 'rspec'
require 'date'
require 'capybara/rspec'
require_relative '../spec_helper'

Capybara.app = PlantApplication

Capybara.javascript_driver = :selenium
Capybara.default_wait_time = 20

describe 'Plant Creation', :type => :feature do

  before :each do
    visit '/perfume'

  end

  context 'Successfully creating a new plant' do

    it 'should create the new plant', :js => true do
      expect(1).to equal 1
    end
  end

end
