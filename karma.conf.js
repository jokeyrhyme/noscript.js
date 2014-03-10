/*jslint indent:2, node:true*/
'use strict';

// karma.conf.js
module.exports = function (config) {
  config.set({
    files: [
      'bower_components/mocha/mocha.css', // Karma loads mocha.js
      'src/*.js',
      'lib/*.js',
      'noscript.js',
      'tests/tests.js',
      /* make iframe assets, don't autoload them */
      {
        pattern: 'bower_components/**/*.js',
        watched: true,
        included: false,
        served: true
      },
      {
        pattern: 'bower_components/**/*.css',
        watched: true,
        included: false,
        served: true
      },
      {
        pattern: 'tests/*/*.html',
        watched: true,
        included: false,
        served: true
      },
      {
        pattern: 'tests/*/*.js',
        watched: true,
        included: false,
        served: true
      },
      {
        pattern: 'noscript.min.js',
        watched: true,
        included: false,
        served: true
      }
    ],
    preprocessors: {
      /* the iframe HTML is left as-is */
      '**/*.html': []
    },
    browsers: [
      'PhantomJS',
      'Chrome',
      'Firefox',
      'Safari',
      'iOS',
      'IE6 - WinXP',
      'IE7 - WinXP',
      'IE8 - WinXP',
      'IE9 - Win7',
      'IE10 - Win7',
      'IE11 - Win7'
    ],
    frameworks: ['mocha'],
    client: {
      mocha: {
        ui: 'tdd'
      }
    },
    singleRun: false
  });
};
