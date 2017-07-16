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
        cssmin: {
            my_target: {
                src: inAbsolutePath + "/" + "css" + "/*.css",
                dest: outAbsolutePath + "/" + "css" + "/" + "output.min.css"
            }
        }

    });



    // grunt.registerTask('default', grunt.help.display);
    grunt.registerTask('default', 'cssmin', function (res) {
        console.log('hello world');
    });
};