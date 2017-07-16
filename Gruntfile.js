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

        uglify: {
            my_target: {
                files: {
                    'public_dev/js/output.min.js': ['public_dev/js/1.js', 'public_dev/js/2.js','public_dev/js/3.js']
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

};