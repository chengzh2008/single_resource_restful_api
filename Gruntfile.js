"use strict";

module.exports = function (grunt) {
    // let grunt load npm tasks
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-simple-mocha');
    grunt.loadNpmTasks('grunt-jscs');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // grunt initilization
    grunt.initConfig({
        watch: {
            scripts: {
                files: ['Gruntfile.js', 'routes/**/*.js', 'models', 'test/**/*.js', '*.js', '.jshintrc'],
                tasks: ['default'],
                options: {
                    spawn: true
                }
            }
        },
        jshint: {
            dev: {
                options: {
                    jshintrc: '.jshintrc'
                },
                src: ['Gruntfile.js', 'routes/**/*.js', 'models/**/*.js', 'test/**/*.js', '*.js']
            }
        },
        simplemocha: {
            all: {
                src: ['test/**/*.js']
            }
        }
    });

    // register the tasks
    grunt.registerTask('test', ['jshint', 'simplemocha']);
    grunt.registerTask('default', ['test']);
};
