/*jslint indent:2, node:true*/
'use strict';

module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({

    jqlint: {
      all: {
        src: [
        ],
        options: {
          errorsOnly: true,
          failOnError: true
        }
      }
    },

    jslint: {
      all: {
        src: [
          '**/*.json',
          '**/*.js',
          '!**/node_modules/**',
          '!**/bower_components/**',
          '!**/*.min.js',
          '!lib/*.js'
        ],
        directives: {},
        options: {
          errorsOnly: true,
          failOnError: true
        }
      }
    },

    connect: {
      server: {
        options: {
          port: 9999
        }
      },
      keepalive: {
        options: {
          port: 9999,
          keepalive: true
        }
      }
    },

    karma: {
      unit: {
        configFile: 'karma.conf.js',
        singleRun: true
      }
    },

    mocha: {
      explicitrun: {
        options: {
          urls: [
            'http://localhost:9999/tests/index.html'
          ],
          run: true
        }
      },
      options: {
        mocha: {},
        log: false
      }
    },

    uglify: {
      all: {
        files: {
          'noscript.min.js': [
            'lib/*.js',
            'src/*.js',
            'noscript.js'
          ]
        },
        options: {
          preserveComments: 'some',
          beautify: {
            ascii_only: true,
            max_line_len: 80
          },
          compress: {}
        }
      }
    },

    watch: {
      files: [
        '**/*.html',
        '<%= jslint.all.src %>'
      ],
      tasks: ['uglify', 'jslint', 'mocha'],
      options: {
        interrupt: true
      }
    }

  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-jslint');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-mocha');

  grunt.registerTask('build', ['uglify']);
  grunt.registerTask('test', ['jslint', 'connect:server', 'mocha']);
  grunt.registerTask('serve', ['connect:server', 'watch']);
  grunt.registerTask('default', ['build', 'test']);

};
