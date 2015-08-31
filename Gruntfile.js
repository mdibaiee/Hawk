module.exports = function(grunt) {
  require('grunt-task-loader')(grunt);

  grunt.initConfig({
    browserify: {
      dev: {
        files: {
          'build/main.js': ['src/js/**/*', '!src/js/libs/**']
        },
        options: {
          alias: {
            store: './src/js/store.js'
          },
          transform: [['babelify', {
            optional: ['es7.asyncFunctions', 'asyncToGenerator',
                       'es7.decorators'],
            blacklist: []
          }]],
          plugin: [
            [
              'remapify', [
                {
                  src: '**/*.js',
                  expose: 'components',
                  cwd: __dirname + '/src/js/components/'
                },
                {
                  src: '**/*.js',
                  expose: 'actions',
                  cwd: __dirname + '/src/js/actions'
                },
                {
                  src: '**/*.js',
                  expose: 'reducers',
                  cwd: __dirname + '/src/js/reducers'
                },
                {
                  src: '**/*.js',
                  expose: 'api',
                  cwd: __dirname + '/src/js/api'
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
    copy: {
      assets: {
        files: [{
          expand: true,
          cwd: 'src',
          dest: 'build',
          src: ['index.html', 'manifest.webapp',
                'fonts/**', 'img/**', 'js/libs/**']
        }]
      }
    },
    watch: {
      styles: {
        files: ['src/less/**/*.less'],
        tasks: ['less:dev']
      },
      scripts: {
        files: ['src/js/**/*'],
        tasks: ['browserify:dev']
      },
      assets: {
        files: ['src/index.html', 'src/manifest.webapp',
                'src/fonts/**', 'src/img/**', 'src/data/**'],
        tasks: ['copy']
      }
    }
  });

  grunt.registerTask('default', ['browserify:dev', 'less:dev', 'copy']);
  grunt.registerTask('production', ['browserify:prod', 'less:prod', 'copy']);
};
