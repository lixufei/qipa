require 'sinatra'
require 'active_record'
require 'json'

require 'pg'
require 'sqlite3'

require './model/plants'

env = ENV["ENV"] ? ENV["ENV"] : 'production'
dbconfig = YAML.load(ERB.new(File.read(File.join("config", "database.yml"))).result)
ActiveRecord::Base.establish_connection(dbconfig[env])

get '/plants' do
  plants = Plant.all || []
  plants.to_json
end