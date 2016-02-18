require 'active_record'
require 'erb'
require 'yaml'
require 'logger'
require 'rspec/core/rake_task'

task :default =>:migrate

task :unit => ['unit']
# task :test => %w[test:end_to_end]

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
RSpec::Core::RakeTask.new :unit do |t|
	t.pattern = Dir.glob('spec/unit/*.rb')
end


# desc 'End-to-End Tests'
# RSpec::Core::RakeTask.new(:end_to_end) do |t|
# 	t.pattern = Dir.glob('spec/end_to_end/*.rb')
# end

task :default => ['specs']
