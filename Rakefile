require 'active_record'
require 'erb'
require 'yaml'
require 'logger'
require 'rspec/core/rake_task'

task :default =>:migrate

task :default => ['specs']

task :test => %w[:unit :functional]

desc "Migrate the database through scripts in db/."

task :migrate =>:environment do
	ActiveRecord::Migrator.migrate('db/', ENV["VERSION"] ? ENV["VERSION"].to_i : nil)
end

task :environment do
	dbconfig = YAML.load(ERB.new(File.read(File.join("config", "database.yml"))).result)
	env = ENV["ENV"] ? ENV["ENV"] : 'development'
	ActiveRecord::Base.establish_connection(dbconfig[env])
	ActiveRecord::Base.logger = Logger.new(File.open('database.log', 'a'))
end

RSpec::Core::RakeTask.new :specs do |task|
	task.pattern = Dir['spec/unit/*.rb']
end

desc 'Unit Tests'
RSpec::Core::RakeTask.new(:unit) do |t|
	t.pattern = Dir.glob('spec/unit/*.rb')
end

desc 'functional Tests'
RSpec::Core::RakeTask.new(:functional) do |t|
	t.pattern = Dir.glob('spec/unit/*.rb')
end
