

" use strict";

var mkdirp = require('mkdirp');
/**
 *  Grunt Task Runner 
 *  @param  {} grunt
 *  @author santosh
 *  @since 17 july 17
 */
module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);

    mkdirp('public_dev', function (err) {
        if (err) throw new Error("Error in Creation of public_dev" + err);
        else
            console.log('public_dev created Successfully');
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
                files: ['public_dev/ng/**/*', 'public_dev/**/*.html'],
                tasks: ['copy']
            },
              set4: {
                files: ['public_dev/less/**/*'],
                tasks: ['less']
            },

        },
        cssmin: {
            dev: {
                // destination              //source
                files: [{ 'public/css/main.min.css': 'public_dev/css/main.css' }]
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
        copy: {
            files: {
                cwd: 'public_dev/ng',  // set working folder / root to copy
                src: '**',           // copy all files and subfolders
                dest: 'public/ng',    // destination folder
                expand: true           // required when using cwd
            },
            html: {
                files: [
                    { src: 'public_dev/**/*.html', dest: 'public/index.html' },]
            },
        },
        clean: {
            public_prod: {
                src: ["public/css/**/*.min.css",
                    "public/css/**/*.css",
                    "public/js/**/*.min.js",
                    "public/js/**/*.js",
                    "public/ng/**/*",
                    "public/**/*.html",

                ]
            }
        }, less: {
            development: {
                options: {
                    paths: ['public_dev/less']
                },
                files: {
                    'public/less/less.min.css': 'public_dev/less/**/*.less'
                }
            },
            production: {
                options: {
                    paths: ['public/less'],
                    plugins: [
                        new (require('less-plugin-autoprefix'))({ browsers: ["last 2 versions"] }),
                        new (require('less-plugin-clean-css')) //(cleanCssOptions)
                    ],
                    modifyVars: {
                        imgPath: '"https://www.w3schools.com/css/trolltunga.jpg"',
                        bgColor: 'red'
                    }
                },
                files: {
                    'public/less/less.min.css': 'public_dev/less/**/*.less'
                }
            }
        },
        browserSync: {
            dev: {
                bsFiles: {
                    src: [
                        // 'public_dev/css/*.css',
                        // 'public_dev/index.html',
                        'public/'

                    ]
                },
                options: {
                    watchTask: true,
                    notify: true,
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

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-css');
    grunt.loadNpmTasks('grunt-processhtml');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.registerTask('default', ['browserSync', 'watch', 'clean:public_prod']);
};