var path = require('path'),
    fs = require('fs');

module.exports = function(grunt) {
  grunt.initConfig({
    less: {
      development: {
        files: [{
          src: 'less/main.less',
          dest: 'style.css'
        }]
      },
      production: {
        options: {
          plugins: require('less-plugin-clean-css')()
        },
        files: [{
          src: 'less/main.less',
          dest: 'style.css'
        }]
      }
    },
    uglify: {
      production: {
        files: {
          'main.js': 'js/**/*.js'
        }
      }
    },
    injector: {
      options: {
        transform: function(file) {
          var ext = path.extname(file).slice(1);

          switch (ext) {
            case 'css':
              return '<link rel="stylesheet" href="' + file + '" />';
            case 'js':
              return '<script src="' + file + '"></script>';
            case 'html':
              return fs.readFileSync(__dirname + file);
          }
        }
      },
      development: {
        files: {
          'index.html': ['js/libs/*.js', 'js/*.js',
                         'style.css', 'partials/**/*.html'],
          'how.html': ['js/libs/*.js', 'js/*.js',
                       'style.css', 'partials/0-header.html',
                       'partials/how*.html']
        }
      },
      production: {
        files: {
          'index.html': ['main.js', 'style.css', 'partials/**/*.html'],
          'how.html': ['main.js', 'style.css',
                       'partials/0-header.html', 'partials/how*.html']
        }
      }
    },
    watch: {
      styles: {
        files: ['less/**/*.less'],
        tasks: ['less']
      },
      partials: {
        files: ['partials/**/*.html'],
        tasks: ['injector']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-asset-injector');

  grunt.registerTask('default', ['less:development', 'injector:development']);
  grunt.registerTask('production', ['less:production',
                                    'uglify:production',
                                    'injector:production']);
};
