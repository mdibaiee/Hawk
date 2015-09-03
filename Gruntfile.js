module.exports = function(grunt) {
  require('grunt-task-loader')(grunt);

  grunt.initConfig({
    browserify: {
      dev: {
        files: [{
          dest: 'build/main.js',
          src: ['src/js/**/*', '!src/js/libs/**']
        }],
        options: {
          alias: {
            store: './src/js/store.js',
            utils: './src/js/utils.js'
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
                },
                {
                  src: '**/*.js',
                  expose: 'libs',
                  cwd: __dirname + '/src/js/libs'
                }
              ]
            ]
          ]
        }
      }
    },
    mochify: {
      options: {
        reporter: 'land'
      },
      tests: {
        src: 'test/**/*.js',
        options: '<%= browserify.dev.options %>'
      }
    },
    less: {
      dev: {
        files: [{
          src: 'src/less/main.less',
          dest: 'build/style.css'
        }]
      },
      prod: {
        options: {
          plugins: require('less-plugin-clean-css')()
        },
        files: [{
          src: 'src/less/main.less',
          dest: 'build/style.css'
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
    mochaTest: {
      tests: {
        src: ['tests/**/*.js'],
        options: {
          reporter: 'landing'
        }
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
  grunt.registerTask('test', 'mochaTest');
};
