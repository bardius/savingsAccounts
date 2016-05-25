module.exports = function (config) {
    config.set({
        //  root path location that will be used to resolve all relative paths in files and exclude sections
        basePath: '../',

        // files to include, ordered by dependencies
        files: [
            // include vendor files and libs
            'js/libs/jquery/jquery.js',
            'js/libs/jasmine-jquery/lib/jasmine-jquery.js',

            // include helper files and libs
            'js/helpers/smartResize.js',

            // include JS files
            'js/src/**/*.js',

            // include unit test specs
            'test/unit/**/*.spec.js',
            'test/unit/*.spec.js'
        ],

        // list of karma plugins
        plugins: [
            "karma-chrome-launcher",
            "karma-coverage",
            "karma-firefox-launcher",
            "karma-htmlfile-reporter",
            "karma-jasmine",
            "karma-jshint-preprocessor",
            "karma-junit-reporter",
            "karma-phantomjs-launcher"
        ],

        // map of preprocessors that is used mostly for plugins
        preprocessors: {
            // test coverage
            'js/src/**/*.js': ['jshint', 'coverage']
        },

        // files to exclude
        exclude: [
        ],

        // karma has its own autoWatch feature but Grunt watch can also do this
        autoWatch: false,

        // testing framework, be sure to install the correct karma plugin
        frameworks: ['jasmine'],

        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera
        // - Safari (only Mac)
        // - PhantomJS
        // - IE (only Windows)
        browsers: ['PhantomJS'],

        // If browser does not capture in given timeout [ms], kill it
        captureTimeout: 30000,

        reporters: ['progress', 'junit', 'html', 'coverage'],

        coverageReporter: {
            // directory where coverage results are saved
            dir: './test/test-results/coverage/',
            reporters: [
                { type: 'html', subdir: '.' },
                { type: 'teamcity', subdir: '.', file: 'teamcity.txt' }
            ],
            instrumenterOptions: {
                istanbul: { noCompact: true }
            }
        },

        htmlReporter: {
            outputFile: './test/test-results/unit/index.html',
            pageTitle: 'Savings Accounts Unit Tests',
            subPageTitle: 'The unit tests report'
        },

        junitReporter: {
            outputDir: './test/test-results/junit',
            outputFile: 'junit-results.xml'
        }
    })
};
