/* Read only *//

"use strict";

var path = require( "path" );


module.exports = function ( grunt ) {

    grunt.loadNpmTasks( "grunt-angular-templates" );
    grunt.loadNpmTasks( "grunt-browserify" );
    grunt.loadNpmTasks( "grunt-contrib-clean" );
    grunt.loadNpmTasks( "grunt-contrib-copy" );
    grunt.loadNpmTasks( "grunt-contrib-jshint" );
    grunt.loadNpmTasks( "grunt-contrib-less" );
    grunt.loadNpmTasks( "grunt-contrib-uglify" );
    grunt.loadNpmTasks( "grunt-contrib-watch" );
    grunt.loadNpmTasks( "grunt-exorcise" );
    grunt.loadNpmTasks( "grunt-filerev" );
    grunt.loadNpmTasks( "grunt-filerev-replace" );
    grunt.loadNpmTasks( "grunt-istanbul" );
    grunt.loadNpmTasks( "grunt-newer" );
    grunt.loadNpmTasks( "grunt-protractor-coverage" );
    grunt.loadNpmTasks( "grunt-sync" );

    var env = grunt.file.readJSON( "env.json" );

    grunt.initConfig( {
        browserify: ( function ()
        {

            var files = [ "src/main/webapp/resources/modules/index.js" ];

            if( grunt.option( "mocks" ) )
            {
                files.push( "src/main/webapp/resources/modules/mocks/index.js" );
            }

            return {
                build: {
                    options: {
                        watch: true,
                        browserifyOptions: { debug: true }
                    },
                    files: {
                        "src/main/webapp/resources/build/dist.js": files
                    }
                },
                test: {
                    options: {
                        transform: [
                            [ "browserify-istanbul", {
                                ignore: [
                                    "**/templates.js",
                                    "**/*mock-*.js",
                                    "**/modules/mocks/**",
                                    "**/modules/_app/**",
                                    "**/modules/admin/**"
                                 ]
                            } ]
                        ]
                    },
                    src: files,
                    dest: path.join( env.wildflyPath, "standalone/deployments/web.war/resources/build/dist.js" )
                }
            };
        } )(),
        copy: {
            build: {
                expand: true,
                cwd: "src/main/webapp/resources",
                dest: "src/main/webapp/resources/build",
                src: [
                    "fonts/**/*.*",
                    "images/**/*.*"
                ]
            }
        },
        clean: {
            build: [
                "src/main/webapp/resources/build/dist.*",
                "src/main/webapp/resources/build/project.*",
                "src/main/webapp/WEB-INF/pages/**/*.html"
            ],
            test: [ ".instrumented" ],
            coverage: [ "coverage" ]
        },
        exorcise: {
        .............................
