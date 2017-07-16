var mkdirp = require('mkdirp');
module.exports = function (grunt) {


    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        watch: {
            set1: {
                files: ['public/css/**/*.css'],
                tasks: ['cssmin']
            },
            set2: {
                files: ['public/js/**/*.js'],
                tasks: ['uglify']
            }
        },
        cssmin: {
            dev: {
                files: [{ 'public/css/main.min.css': 'public/css/main.css' }]
            }
        },

        uglify: {
            dev: {
                files: {
                    'public/js/all.min.js': ['public/js/**/3.js', 'public/js/**/2.js', 'public/js/**/1.js'],
                    expand: true,
                    flatten: false,
                }

            }
        },

        browserSync: {
            dev: {
                bsFiles: {
                    src: [
                        'public/css/*.css',
                        'public/js/*.js',
                        'public/*.html',
                        'public/ng/**/*'
                    ]
                },
                options: {
                    watchTask: true,
                    server: './public'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-css');

    // grunt.registerTask('default', 'watch:set1', 'watch:set2');
    grunt.registerTask('default', ['browserSync', 'watch:set1', 'watch:set2']);
};