require 'sinatra'
require 'active_record'
require 'json'
require 'rack/contrib'
require 'pry'

require 'pg'
require 'sqlite3'

require './model/plants'

set :root, File.dirname(__FILE__)

class PlantApplication < Sinatra::Base
	dbconfig = YAML.load(ERB.new(File.read(File.join("config", "database.yml"))).result)

	configure :development do
		ActiveRecord::Base.establish_connection(dbconfig['development'])
	end

	configure :production do
		ActiveRecord::Base.establish_connection(dbconfig['production'])
	end

	configure :test do
		ActiveRecord::Base.establish_connection(dbconfig['test'])
	end

	use Rack::PostBodyContentTypeParser

	get '/plants' do
	  plants = Plant.all || []
	  plants.to_json
	end

	get '/home' do
		File.read("home.html")
	end

	post '/plants' do
		plant = Plant.create(:name => params[:name],
			:description => params[:description],
			:created_at => Time.now,
			:updated_at => Time.now)

		if plant.save
			[201, "/plants/#{plant['id']}"]
		end
	end

	get '/plants/:id' do
		plant = Plant.find(params[:id])
		plant.to_json
	end

	delete '/plants/:id' do
		plant = Plant.delete(params[:id])
		plant.to_json
	end

	post '/plants/:id' do
		plant = Plant.find_by(:id => params[:id])
		plant.update(:name => params[:name],
																		:description => params[:description],
												 :created_at => Time.now,
												 :updated_at => Time.now)
		plant.to_json
	end

	get '/perfume' do
		File.read("perfume.html")
		end

	get '/save-perfume' do
		File.read("save-perfume.html")
	end

end
