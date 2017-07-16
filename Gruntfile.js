" use strict";

var mkdirp = require('mkdirp');
module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);

    mkdirp('public_dev', function (err) {
        if (err) throw new Error("Error in Creation of public_dev" + err);
        else
            console.log('created Successfully');
    });

    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        watch: {
            set1: {
                files: ['public_dev/css/**/*.css'],
                tasks: ['cssmin']
            },
            set2: {
                files: ['public_dev/js/**/*.js'],
                tasks: ['uglify']
            },
            set3: {
                files: ['public_dev/**/'],
                tasks: ['processhtml']
            }
        },
        cssmin: {
            dev: {
                // destination              //source
                files: [{ 'public/css/main.min.css': 'public_dev/css/main.css' }]
            }
        },
        ngmin: {
            dev: {
                // destination            //source
                files: [{ 'public/**/': 'public_dev/**/*.html' }]
            }
        },

        processhtml: {
            dist: {
                files: {
                    'public/index.html': ['public_dev/index.html']
                }
            }
        },

        uglify: {
            dev: {
                files: [{
                    // destination              //source
                    'public/js/all.min.js': ['public_dev/js/**/1.js', 'public_dev/js/**/2.js'],
                    expand: false,
                    flatten: false,
                }]

            }
        },

        browserSync: {
            dev: {
                bsFiles: {
                    src: [
                        'public_dev/css/*.css',
                        'public_dev/*.html',
                        'public_dev/ng/**/*'
                    ]
                },
                options: {
                    watchTask: true,
                    notify: false,
                    open: true,  //  automatic open the index.html files in browser
                    reload: true,
                    spawn: true,
                    server: {
                        baseDir: "./public"
                    }

                }
            }
        },
        env: {
            options: {},
            dev: { NODE_ENV: 'DEVELOPMENT' },
            prod: { NODE_ENV: 'PRODUCTION' }

        },
    });

    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-css');
    grunt.loadNpmTasks('grunt-processhtml');
    grunt.loadNpmTasks('grunt-contrib-clean');

    // grunt.registerTask('default', 'watch:set1', 'watch:set2');
    grunt.registerTask('default', ['browserSync', 'watch']);
};