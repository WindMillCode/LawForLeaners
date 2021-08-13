# require %{em/pure_ruby}
require %{capybara}
require %{capybara/dsl}
require %{capybara/rspec}
require %{capybara/rspec/matcher_proxies}
require %{rspec/expectations}
require %{rails_helper}
require %{percy}
require %{selenium/webdriver}
require %{selenium-webdriver}
require %{net/http}
require %{rest-client}
require %{json}
require %{pp}
require %{uri}
require %{billy/capybara/rspec}
require_relative %{./downloadhelpers.rb}
include DownloadHelpers
# load  %{testmod.rb}


# dev additions
# require %{rotp}
require %{table_print}
#




# dev setup
class Capybara::Node::Element
  def select_option(wait: nil)
    begin
      raise 's'
    rescue => exception
      scroll_to self
      synchronize(wait) { base.click }
      self
    end
  end
end
# Selenium::WebDriver.logger.level = :debug
# Selenium::WebDriver.logger.output = %{selenium.log}
Capybara.raise_server_errors = false
Capybara.run_server = false
Capybara.default_max_wait_time = 20
Capybara.ignore_hidden_elements = false
# Capybara.javascript_driver = :selenium_chrome_billy

$client = nil

# dev additions
$timeouts = Hash[
  :load_page => Hash[
      :chrome_billy => 2,
      :firefox_billy => 1,
  ],
]
#



Capybara.register_driver :chrome_billy do |app|

  options = Selenium::WebDriver::Chrome::Options.new
  # options.add_argument %{--auto-open-devtools-for-tabs} # figre out to open on seperate screen
  options.add_argument %{disable-infobars}
  options.add_argument %{--disable-notifications}
  options.add_argument %{--start-maximized}
  options.add_argument %{--no-sandbox}
  options.add_argument %{--disable-gpu}
  options.add_argument %{--disable-dev-shm-usage}
  options.add_argument %{--ignore-certificate-errors}
  options.add_argument %{--proxy-server=#{Billy.proxy.host}:#{Billy.proxy.port}}
  options.add_argument " --proxy-bypass-list=<-loopback>" # New argument here to ensure requests to localhost are sent to Puffing Billy's proxy

	Capybara::Selenium::Driver.new(
		app,
		:browser => :chrome,
    :options => options,
    :clear_local_storage => true,
    :clear_session_storage => true
	)
end


Capybara.register_driver :firefox_billy do |app|
  profile = Selenium::WebDriver::Firefox::Profile.new
  profile.assume_untrusted_certificate_issuer = false
  profile.proxy = Selenium::WebDriver::Proxy.new(
    http: "#{Billy.proxy.host}:#{Billy.proxy.port}",
    ssl: "#{Billy.proxy.host}:#{Billy.proxy.port}")


  options  =  Selenium::WebDriver::Firefox::Options.new(:profile => profile)
  capabilities = Selenium::WebDriver::Remote::Capabilities.firefox(:accept_insecure_certs => true)
  Capybara::Selenium::Driver.new(
    app,
    options: options,
    desired_capabilities: capabilities
  )
end



# RSpec configs
RSpec.configure do |config|



	my_drivers = %i{chrome_billy}
  # my_drivers = %i{chrome_billy}
	hosts = Hash.new
	hosts[:dev] =  ENV[%{FRONTEND_URL}]

	config.full_backtrace = false
	config.backtrace_exclusion_patterns = [
			/\/lib\d*\/ruby\//,
			/bin\//,
			/gems/,
			/spec\/spec_helper\.rb/,
			/lib\/rspec\/(core|expectations|matchers|mocks)/
	]

  config.before :example do

    visit %{/}
    # proxy.stub(ENV[%{BACKEND_URL}]).and_return :redirect_to => ENV[%{BACKEND_DEV_URL}]

    begin
      page.current_window.maximize
    rescue
      nil
    end

    # dev additions

    #

    sleep $timeouts[:load_page][Capybara.current_driver.to_sym]



  end

  config.after :example do

    # dev additions

    #

  end

  config.around do |example|
    $example  = example
    my_drivers.each do |browser|
      Capybara.current_driver = browser


      hosts.each do |k,v|
        Capybara.current_driver = browser
        Capybara.javascript_driver = Hash[
          :chrome_billy => :selenium_chrome_billy,
          :firefox_billy =>:selenium_billy
        ][browser.to_sym]

        Capybara.app_host = v
        # A Identifying and running each scenario
          # PP.pp example.metadata
        p Capybara.app_host.to_s +  %{ in } + Capybara.current_driver.to_s
        p %{scenario #{example.metadata[:description]}}
        begin
          example.run
        rescue => exception
          page.driver.quit
        end
        # A
      end
    end
  end

  config.before :suite do
    # dev additions

    # stub all requests to the backend and make sure the browser sends to  the testing backend

    #

    # delete the user from the user pool if they are still there

    #
  end

  config.after :suite do
    # dev addtions

    #

  end
end
#


# puffing billy configuration
Billy.configure do |c|

  # c.cache = true
  c.proxy_port = 64190
  c.record_requests = true
  # c.whitelist << %{#{$host}:4521}# to append a host without overriding the defaults.
  # c.whitelist << %{127.0.0.1:4521}
#   c.whitelist << ENV[%{BACKEND_URL}]
#   c.whitelist << %{127.0.0.1:3005}
  c.logger = nil
  c.persist_cache = true

  # pp c

end
#


def stagingTest
@javascript
  RSpec.feature  %{misc}, :skip => true  do

		scenario %{check that puffing billy is working}  do
      my_response = []
      my_proc = Proc.new do |*args|
        response = Billy.pass_request(*args)
        my_response << r
        PP.pp response
      end
      proxy.stub(ENV[%{FRONTEND_URL}]).and_return(my_proc)
      sleep 10
      expect(my_response.size).not_to eq 0
      # PP.pp Billy.proxy.requests
    end

  end


  RSpec.feature  %{staging} do

    scenario %{my_template} do
      p %{circleci e2e setup is working}
    end


  end

end


def dropdownSelectSelector
	(all %{.a_p_p_DropDownMiddle})
	.to_a
	.select! do |x|
		x.text == %{Select Item}
	end
end
def navigationPage
	(all %{*})
	.to_a
	.select! do |x|
		unless x[:class] == nil
			!(x[:class].include? %{main-navigation})
		else
			true
		end
	end
	.collect! do |x|
		x.style %{top},%{left}
	end

end

def numberParse  devObj
    dimension = devObj[:dimension]
    (dimension.split %{px}).at 0
end

def media_query devObj
	begin
		page.current_window.resize_to devObj[:width], 800
	rescue => e
		execute_script %Q{
			resizeTo(#{devObj[:width]},800)
		}
	end
end


def capybara_result_to_array devObj
	arr = []
	devObj[:target]
	.each do |x|
		arr.push x
	end
	arr
end
stagingTest
