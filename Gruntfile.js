var mkdirp = require('mkdirp');
module.exports = function (grunt) {


    grunt.initConfig({

        pkg: grunt.file.readJSON("package.json"),

        uglify: {
            my_target: {
                files: {
                   'public/js/output.min.js' : ['public/js/1.js', 'public/js/2.js', 'public/js/3.js']
                }
            }
        },
        watch: {
            files: 'public/scss/**/*.scss',
            tasks: ['sass']
        },
        sass: {
            dev: {
                files: {
                    'public/css/main.css': 'public/scss/style1.scss'
                }
            }
        },
        browserSync: {
            dev: {
                bsFiles: {
                    src : [
                        'public/css/*.css',
                        'public/*.html'
                    ]
                },
                options: {
                    watchTask: true,
                    server: './public'
                }
            }
        }
    });

    //grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-css');
    //grunt.registerTask('default', 'concat min cssmin');
    grunt.registerTask('default', ['browserSync', 'watch','uglify']);
};