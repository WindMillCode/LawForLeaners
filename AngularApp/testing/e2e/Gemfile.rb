# frozen_string_literal: true


source "https://rubygems.org"

git_source(:github) {|repo_name| "https://github.com/#{repo_name}" }

# gem "rails"
# frozen_string_literal: true

gem 'capybara', '~> 3.35', '>= 3.35.3'
gem 'ffi'
gem 'rspec', '~> 3.10'
gem 'rails_helper'
gem 'rake'
gem 'percy-capybara', '~> 4.3.3'
gem 'sauce_whisk'
gem 'selenium-webdriver'
gem 'table_print'
# gem "eventmachine_httpserver", github: "eventmachine/evma_httpserver"
gem 'puffing-billy', :group => :test
gem 'rexml'
gem 'rotp'
gem 'typhoeus'
# gem 'aws-sdk', '~> 3'
