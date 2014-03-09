/*jslint browser:true, indent:2*/
/*global mocha, suite, test, suiteSetup, suiteTeardown, setup, teardown*/ // Mocha

/*global noscript*/ // code under test

// basic assert function, because Chai won't work in old browsers
function assert(condition, message) {
  'use strict';
  if (!condition) {
    throw message || "Assertion failed";
  }
}

mocha.setup('tdd');

suite('noscript.js', function () {
  'use strict';

  suite('vs Require.JS', function () {

    var iframe;

    suiteSetup(function (done) {
      iframe = document.getElementById('iframe');
      iframe.onload = function () {
        done();
      };
      iframe.src = 'require/iframe.html';
    });

    test('Require.JS could not require module', function () {
      assert(!iframe.contentWindow.hasOwnProperty('result'));
    });

  });

  suite('vs jQuery', function () {

    var iframe;

    suiteSetup(function (done) {
      iframe = document.getElementById('iframe');
      iframe.onload = function () {
        done();
      };
      iframe.src = 'jquery/iframe.html';
    });

    test('noscript elements are gone', function () {
      var html = iframe.contentDocument.body.innerHTML;
      assert(html.indexOf('<noscript>') === -1);
    });

    test('noscript content is present', function () {
      var html = iframe.contentDocument.body.innerHTML;
      assert(html.indexOf('JavaScript is disabled!') > -1);
    });

    test('jQuery and $ are not defined', function () {
      assert(!iframe.contentWindow.$);
      assert(!iframe.contentWindow.jQuery);
    });

  });

  suite('vs Angular.JS', function () {

    var iframe;

    suiteSetup(function (done) {
      iframe = document.getElementById('iframe');
      iframe.onload = function () {
        done();
      };
      iframe.src = 'angular/iframe.html';
    });

    test('Angular.JS could not compile content', function () {
      var html = iframe.contentDocument.body.innerHTML;
      assert(html.indexOf('JavaScript is disabled!') === -1);
    });

  });

});

if (navigator.userAgent.indexOf('PhantomJS') < 0) {
  mocha.run();
}
