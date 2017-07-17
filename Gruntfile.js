

" use strict";

var mkdirp = require('mkdirp');
var mozjpeg = require('imagemin-mozjpeg');
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
                files: ['public_dev/ng/**/*', 'public_dev/**/*.html','public_dev/bower_components/'],
                tasks: ['copy']
            },
            set4: {
                files: ['public_dev/less/**/*'],
                tasks: ['less']
            }, set5: {
                files: ['public_dev/sass/**/*'],
                tasks: ['sass']
            },
        },
        sass: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'public_dev/sass',
                    src: ['*.scss'],
                    dest: 'public/sass',
                    ext: '.css'
                }]
            }
        },
        cssmin: {
            options: {
                mergeIntoShorthands: false,
                roundingPrecision: -1
            },
            target: {
                files: [{
                    expand: true,
                    cwd: 'public_dev/css',
                    src: ['*.css', '!*.min.css'],
                    dest: 'public/css',
                    ext: '.min.css'
                }]
            }
        },
        imagemin: {
            static: {
                options: {
                    optimizationLevel: 3,
                    svgoPlugins: [{ removeViewBox: false }],
                    use: [mozjpeg()] // Example plugin usage
                },
                files: {
                    'public/assets/Capture.png': 'public_dev/assets/Capture.png',

                }
            },
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'public_dev/assets',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'public/assets'
                }]
            }
        },
        image: {
            static: {
                options: {
                    pngquant: true,
                    optipng: false,
                    zopflipng: true,
                    jpegRecompress: false,
                    jpegoptim: true,
                    mozjpeg: true,
                    guetzli: false,
                    gifsicle: true,
                    svgo: true
                },
                files: {
                    'public/assets/Capture.png': 'public_dev/assets/Capture.png',

                }
            },
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'public_dev/assets',
                    src: ['**/*.{png,jpg,gif,svg}'],
                    dest: 'public/assets'
                }]
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
                    { src: 'public_dev/index.html', dest: 'public/index.html' },]
            },
            bower_comp: {
                files: [
                    {
                        expand: true,
                        dest: 'public/bower_components',
                        cwd: 'public_dev/bower_components',
                        src: '**',
                    }
                ]
            }
        },
        clean: {
            public_prod: {
                src: [
                    "public/css/**/*.min.css",
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

    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-image');
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


    //  grunt.registerTask('default', ['browserSync', 'watch', 'clean:public_prod'],function(target){
    //    console.log("The main target is "+target);
    // });

    grunt.registerTask('default', function (target) {
        grunt.task.run('browserSync');
        grunt.task.run('watch');
        grunt.task.run('clean:public_prod');

    });

    grunt.registerTask('prod', ['image', 'imagemin']);
};