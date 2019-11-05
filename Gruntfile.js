module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    copy: {
      main:{
        expand: true,
        cwd: 'src/',
        src: '**',
        dest: 'dist/'
      }
    },


    //watch for changes, and do a different action depending on situation
    watch: {
      options: {
        spawn: false,
        event: ['all'],
        livereload: true,
        cwd: 'src'
      },
      all: {
        files: '**/*',
        tasks: ['copy']
      }
    },

    //make a webserver on the dist folder
    connect: {
      server: {
        options: {
          port: 8000,
          hostname: 'localhost',
          livereload: true,
          // keepalive: true,
          base: "dist"
        }
      }
    },

    'gh-pages': {
      options: {
        base: 'dist'
      },
      src: '**/*'
    },



  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-gh-pages');

  //create build folder and run watch task
  grunt.registerTask('default', ['copy','connect','watch']);
  grunt.registerTask('deploy', ['copy', 'gh-pages']);

};