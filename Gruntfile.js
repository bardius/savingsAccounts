// ------------------------------
// Grunt Configuration/Setup
// ------------------------------

'use strict';

module.exports = function (grunt) {

    // Project configuration
    var options = {
        init: true,
        data: {
            pkg: grunt.file.readJSON('package.json'),
            site: grunt.file.readYAML('statix-src/data/site.yml'),
            releaseVersion: grunt.option('releaseVersion') || '',
            config: {
                /**
                 * Config - Edit this section
                 * ==========================
                 * Choose javascript release file names
                 * Choose javascript release locations
                 * Choose javascript files to be uglyfied
                 */
                js: {
                    // <%=config.js.releaseDir%>
                    releaseDir: 'public_html/js/release/',
                    // <%=config.js.releaseFile%>
                    releaseFile: 'scripts.min.js',
                    // <%=config.js.modernizrReleaseFile%>
                    modernizrReleaseFile: 'modernizr.min.js',
                    // <%=config.js.polyfillsFile%>
                    polyfillsFile: 'polyfills.min.js',
                    // <%=config.js.scriptFileList%>
                    scriptFileList: [
                        'js/helpers/addEventListener-polyfill.js',
                        'js/libs/jquery/jquery.js',
                        'js/helpers/smartResize.js',
                        'js/src/**/*.js'
                    ],
                    // <%=config.js.polyfillsFileList%>
                    polyfillsFileList: [
                        'js/helpers/addEventListener-polyfill.js',
                        'js/libs/es5-shim/es5-shim.js',
                        'js/libs/es5-shim/es5-sham.js',
                        'js/libs/es6-promise/es6-promise.js'
                    ],
                    // <%=config.js.modernizrScriptFile%>
                    modernizrScriptFile: [
                        'js/libs/modernizr/modernizr.js'
                    ]
                },
                img: {
                    // <%= config.img.path %>
                    path: 'public_html/images'
                },
                css: {
                    // <%= config.css.path %>
                    path: 'public_html/css'
                },
                scss: {
                    // <%= config.scss.path %>
                    path: 'scss'
                },
                bower: {
                    // <%= config.bower.path %>
                    path: './js/libs'
                },
                host: {
                    // <%= config.host.url %>
                    url: 'http://localhost:8000',
                    // <%= config.host.base %>
                    base: 'public_html',
                    // <%= config.host.port %>
                    port: '8000'
                },
                jstests: {
                    // <%= config.jstests.path %>
                    path: 'js/tests'
                },
                statix: {
                    // <%= config.statix.path %>
                    path: 'public_html'
                }
            }
        }
    };

    // Load the grunt configuration
    require('load-grunt-config')(grunt, options);
    require('jit-grunt')(grunt);

    // Load all the grunt tasks
    require('load-grunt-tasks')(grunt);
    grunt.loadNpmTasks('assemble');


    /* ==========================================================================
     Available tasks:

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
     ========================================================================== */

    /**
     * GRUNT
     * Default task
     * run jshint, uglify, sass, autoprefixer, csssplit
     */
    // Default task
    grunt.registerTask('default', [
        'dev'
    ]);


    /**
     * GRUNT JSDEV
     * A task for javascript development
     * run jshint, uglify
     */
    grunt.registerTask('jsdev', [
        'jshint',
        'uglify:release'
    ]);


    /**
     * GRUNT DEV
     * A task for development
     * run jshint, uglify, sass, autoprefixer, csssplit
     */
    grunt.registerTask('dev', [
        'jsdev',
        'sass:release',
        'autoprefixer:release',
        'csssplit:release'
    ]);


    /**
     * GRUNT BUNDLE
     * A task for your production/release environment
     * run jshint, uglify, sass, autoprefixer, combine_mq, csssplit, csso
     */
    grunt.registerTask('bundle', [
        'jsdev',
        'uglify:production',
        'sass:production',
        'autoprefixer:release',
        'combine_mq:release',
        'csssplit:release',
        'csso:release'
    ]);


    /**
     * GRUNT GENERATE
     * A task for generating static HTML files
     * run jshint, uglify, sass, autoprefixer, csssplit, assemble
     */
    grunt.registerTask("generate", [
        'dev',
        'assemble'
    ]);


    /**
     * GRUNT DOCUMENT
     * A task for generating documentation for the application
     * run jsdoc
     */
    grunt.registerTask("document", [
        'jsdoc'
    ]);


    /**
     * GRUNT TEST
     * A task for executing tests for application
     * run jshint, uglify, sass, autoprefixer, csssplit, assemble, karma
     */
    grunt.registerTask("test", [
        'generate',
        'karma:unit'
    ]);


    /**
     * GRUNT SERVE
     * A task for a static server with watch
     * run jshint, uglify, sass, autoprefixer, csssplit, assemble, connect, karma, watch
     */
    grunt.registerTask("serve", [
        'generate',
        'connect',
        'karma:continuous',
        'watch'
    ]);


    /**
     * GRUNT TRAVIS
     * A task for Travis CI to test build
     * run jshint, uglify, sass, autoprefixer, combine_mq, csssplit, csso
     */
    grunt.registerTask('travis', [
        'bundle'
    ]);
};
