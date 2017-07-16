var mkdirp = require('mkdirp');
module.exports = function (grunt) {
    
    var inDirectory = "public_dev";
    var outDirectory = "public";
    var inAbsolutePath = inDirectory + "/";
    var outAbsolutePath = outDirectory + "/";

    mkdirp(inDirectory, function (err) {
        if (err) throw new error("Error in creating output directory" + err);
        else
            console.log('in directory has been created');
    });

    grunt.initConfig({

        pkg: grunt.file.readJSON("package.json"),
        concat: {
            js: {
                src: 'public_dev/js/*.js',
                dest: 'public_dev/js/concat.js'
            },
            css: {
                src: 'public_dev/css/*.css',
                dest: 'public_dev/css/style.min.css'
            }
        },
        min: {
            js: {
                src: 'public_dev/js/sidebar.js',
                dest: 'public_dev/js/concat.min.js'
            }
        },
        cssmin: {
            css: {
                src: 'public_dev/css/style.css',
                dest: 'public_dev/css/concat.min.css'
            }
        }
    });

    //grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-css');
    grunt.registerTask('default', 'concat min cssmin');

};