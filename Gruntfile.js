module.exports = function(grunt) {
  require('grunt-task-loader')(grunt);

  grunt.initConfig({
    pkg: require('./package.json'),
    browserify: {
      dev: {
        files: [{
          dest: 'build/main.js',
          src: ['src/js/**/*', '!src/js/libs/**']
        }],
        options: {
          alias: {
            store: './src/js/store.js',
            utils: './src/js/utils.js',
            tour: './src/js/tour.js'
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
                'fonts/**', 'img/**', 'js/libs/**', 'icon/**']
        }]
      }
    },
    zip: {
      release: {
        dest: 'releases/hawk-<%= pkg.version %>.zip',
        src: 'build/**/*',
        cwd: 'build/'
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
  grunt.registerTask('production', ['browserify', 'less:prod', 'copy', 'zip']);
  grunt.registerTask('test', 'mochaTest');
};
