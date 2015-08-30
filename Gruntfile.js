module.exports = function(grunt) {
  require('grunt-task-loader')(grunt);

  grunt.initConfig({
    browserify: {
      dev: {
        files: {
          'build/main.js': 'src/js/**/*'
        },
        options: {
          transform: ['babelify'],
          plugin: [
            [
              'remapify', [
                {
                  src: '**/*.js',
                  expose: 'components',
                  cwd: __dirname + '/src/js/components/'
                }
              ]
            ]
          ]
        }
      },
      prod: {
        files: {
          'build/main.js': 'src/js/**/*'
        },
        options: {
          transform: ['babelify', 'uglifyify']
        }
      }
    },
    less: {
      dev: {
        files: [{
          src: 'less/main.less',
          dest: 'style.css'
        }]
      },
      prod: {
        options: {
          plugins: require('less-plugin-clean-css')()
        },
        files: [{
          src: 'less/main.less',
          dest: 'style.css'
        }]
      }
    },
    watch: {
      styles: {
        files: ['less/**/*.less'],
        tasks: ['less']
      }
    }
  });

  grunt.registerTask('default', ['browserify:dev', 'less:dev']);
  grunt.registerTask('production', ['browserify:prod', 'less:prod']);
};
