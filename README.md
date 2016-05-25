[![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)
[![Build Status](https://travis-ci.org/bardius/savingsAccounts.svg?branch=master)](https://travis-ci.org/bardius/savingsAccounts)
[![Dependency Status](https://www.versioneye.com/user/projects/574612face8d0e00360bd640/badge.png)](https://www.versioneye.com/user/projects/574612face8d0e00360bd640)
[![Dependency Status](https://www.versioneye.com/user/projects/574612fbce8d0e004130c785/badge.png)](https://www.versioneye.com/user/projects/574612fbce8d0e004130c785)

Savings Accounts Application
============================================================================

This is an JQuery app project that visualises a Savings Accounts data with capability to be a fully 
responsive web application or website.

Bower and Grunt with custom build tasks are included for better workflow on development, testing and documentation 
generation.

Pages are generated with grunt assemble npm module from handlebars templates.
Good practices are being used for htaccess, favicons, html meta, og meta, twitter card meta, legacy browsers etc.

Editorconfig file and jshint is in place to ensure coding and formatting standards are in place, along with a gitignore 
file to filter the tracked files at will.

Travis CI service is used to test the build (running the grunt bundle task in the Travis Servers) as changes are 
getting committed.

Requirements

* [NodeJs]  (http://nodejs.org/) (+v4.4)
* [Grunt]   (http://gruntjs.com/)
* [Bower]   (https://github.com/bower/bower)


Quick Start
------------------------------------------------------

To setup and spin up a local server, use follow these steps 
(assuming no proxy is required, if one is in place add the details to the project .npmrc file)

    1. Checkout of the Git repo
    2. Run npm install
    2. Run npm grunt
    2. Run npm grunt-cli
    3. Run grunt serve
    4. Use the commands grunt [watch, dev, bundle, generate, serve, document, test]


Dependencies
---------------------------------------------

    1. Install NodeJs +v4.4 and add it to you system PATH (http://nodejs.org/download/)


How To Use
---------------------------------------------

You can run the Grunt tasks from the root folder and all the compiled/generated assets will be placed to the /public_html 
folder.

The JQuery application source files are found under /js/src and grunt tasks take care of the concatenation and 
unit testing.

The HTML files are generated with Grunt tasks based on Assemble generator with the Handlebars templates found in 
/static-src folder. The templates are split into layouts, partials and pages. Partials can be included in a layout, 
page or another partial. Pages can have variables whose values are defined in the top part of the file (eg. page title).

In the /scss folder you can find the existing styles and place your own. IT css methodology has been used for the 
conventions.

The application JavaScript is getting "bootstrapped" the /js/script.js file following structural pattern and self 
declaring variable/method names. Alternatively, AJAX loading and responsive table features are written as jQuery plugins 
with a module pattern.

The mock data file for the response of the API endpoint that should provide the Savings Accounts table data can be found
under /public_html/mockData folder.


Grunt tasks
---------------------------------------------

Grunt tasks have been created to support the automated builds while developing and when releasing to environments.
The existing tasks can be found under the /grunt folder and are grouped in shorthand tasks within Gruntfile.js

Essentially by running grunt serve all the assets are generated, a local server is spin up and tests are run, while 
watch rebuilds any required assets, runs test and uses live reload as necessary.
 
To generate the fully optimized assets that should be deployed for a release candidate, grunt bundle executed the 
required tasks.

    All available tasks:

     * grunt : run jshint, uglify, sass, autoprefixer, csssplit
     * grunt watch : run jshint, uglify, sass, autoprefixer, csssplit, karma
     * grunt dev : run jshint, uglify, sass, autoprefixer, csssplit
     * grunt jsdev : jshint, uglify
     * grunt bundle : run jshint, uglify, sass, autoprefixer, combine_mq, csssplit, csso
     * grunt serve  : run jshint, uglify, sass, autoprefixer, csssplit, assemble, connect, karma, watch
     * grunt generate  : run jshint, uglify, sass, autoprefixer, csssplit, assemble
     * grunt document  : run jsdoc
     * grunt test : run jshint, uglify, sass, autoprefixer, csssplit, assemble, karma
     * grunt travis :  run jshint, uglify, sass, autoprefixer, combine_mq, csssplit, csso


Testing, coverage & reports
---------------------------------------------

Karma is in place as a test runner with jasmine for unit tests. 
Tests can be run with the corresponding grunt tasks. Upon the tests completion reports are getting generated for coverage
and unit testing scenarios and are placed within /test/test-reports.

    Related grunt tasks:
    
    * grunt karma:unit
    * grunt karma:continuous
    * grunt test (will run once all the tests and generate reports)


Documentation
---------------------------------------------

The application documentation can be generated in the docs folder with the corresponding grunt task and the 
help of jsdoc (https://github.com/krampstudio/grunt-jsdoc) by adding proper annotations to the code.

    Related grunt tasks:
    
    * grunt document


Deployment scripts
---------------------------------------------

Sample deployment shell scripts have been included in the /deployment folder. These scripts could be run as a deploy task 
within a CI solution like Jenkins or Teamcity to support continuous delivery/integration workflow.

This scripts will use rsync to:

* copy the files for the Jenkins job workspace to the provided target directory,
* excluding the files listed in exclude.txt (regular expressions list)
* setting proper file owner and permissions

This scripts accepts parameters to:

* 1 - Location of the build checkout - double quoted, no trailing slash
* 2 - Relative path to be deployed - no trailing slash (in this case is the public_html folder)
* 3 - Target server location - full server path
* 4 - Target server sudo user


Sample Virtual Host Settings
---------------------------------------------

Here is a sample setup for your virtual host configuration

	    <VirtualHost *:80>
               ServerAdmin support@domain.com

                ServerName domain.com
                ServerAlias domain.co.uk

                DocumentRoot /var/www/domain.com/httpdocs

                <Directory /var/www/domain.com/httpdocs>
                        Options -Indexes FollowSymLinks MultiViews
                        AllowOverride All
                        Order allow,deny
                        allow from all
                </Directory>

                ErrorLog ${APACHE_LOG_DIR}/domain.com.error.log

                # Possible values include: debug, info, notice, warn, error, crit,
                # alert, emerg.
                LogLevel warn

                CustomLog ${APACHE_LOG_DIR}/domain.com.access.log combined
        </VirtualHost>
        

Useful Links and Documentation
----------------------------------------------
NodeJs, Node Packaged Modules, sass, GIT and bower dependency manager

* http://git-scm.com/downloads				(GIT)
* http://nodejs.org/					    (NodeJs)
* https://npmjs.org/					    (Node Packaged Modules)
* https://github.com/bower/bower			(Bower)
* http://sass-lang.com/install				(Sass)
* http://gruntjs.com/			            (Grunt)
