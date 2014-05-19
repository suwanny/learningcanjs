module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      // define the files to lint
      // files: ['index.js', 'src/**/*.js', 'test/**/*.js'],
      files: ['index.js', 'public/js/**/*.js'],
      // configure JSHint (documented at http://www.jshint.com/docs/)
      options: {
        reporter: require('jshint-stylish'),
          // more options here if you want to override JSHint defaults
        globals: {
          jQuery: true,
          console: true,
          module: true
        }
      }
    },
    exec: {
      run: 'node index.js'
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-exec');

  grunt.registerTask('default', ['jshint']);
  grunt.registerTask('run', ['exec:run']);
}

