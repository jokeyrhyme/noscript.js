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
          '!lib/insertAdjacentHTML.js'
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

    watch: {
      files: [
        '**/*.html',
        '<%= jslint.all.src %>'
      ],
      tasks: ['jslint', 'mocha'],
      options: {
        interrupt: true
      }
    }

  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-jslint');
  grunt.loadNpmTasks('grunt-mocha');

  grunt.registerTask('test', ['jslint', 'connect:server', 'mocha']);
  grunt.registerTask('serve', ['connect:server', 'watch']);
  grunt.registerTask('default', ['test']);

};
