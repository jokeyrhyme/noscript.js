/*jslint browser:true, indent:2*/
/*global mocha, suite, test, suiteSetup, suiteTeardown, setup, teardown*/ // Mocha

/*global noscript*/ // code under test

mocha.setup('tdd');

suite('noscript.js', function () {
  'use strict';

  // basic assert function, because Chai won't work in old browsers
  function assert(condition, message) {
    if (!condition) {
      throw message || "Assertion failed";
    }
  }

  function loadIframe(src, done) {
    var iframe;
    iframe = document.getElementById('iframe');
    iframe.onload = function () {
      done();
    };
    if (iframe.attachEvent) {
      iframe.attachEvent('onload', iframe.onload, false);
    }
    iframe.src = src;
    return iframe;
  }

  function getIframeHTML(iframe) {
    return (iframe.contentDocument || iframe.contentWindow.document).body.innerHTML;
  }

  suite('noscript elements', function () {
    var html;

    suiteSetup(function () {
      html = document.body.innerHTML;
    });

    test('noscript elements are gone', function () {
      assert(html.indexOf('<noscript>') === -1);
    });

    test('noscript content is present', function () {
      assert(html.indexOf('JavaScript might be disabled!') > -1);
    });

  });

  suite('vs Require.JS', function () {

    var iframe;

    suiteSetup(function (done) {
      iframe = loadIframe('require/iframe.html', done);
    });

    test('define() doesn\'t work', function () {
      try {
        iframe.contentWindow.define('mod', function () { return true; });
        assert(false);
      } catch (err) {
        assert(err);
      }
    });

    test('Require.JS could not require module', function () {
      assert(!iframe.contentWindow.result);
    });

  });

  suite('vs jQuery', function () {

    var iframe;

    suiteSetup(function (done) {
      iframe = loadIframe('jquery/iframe.html', done);
    });

    test('jQuery and $ are not defined', function () {
      assert(!iframe.contentWindow.$);
      assert(!iframe.contentWindow.jQuery);
    });

  });

  suite('vs Angular.JS', function () {

    var iframe;

    suiteSetup(function (done) {
      iframe = loadIframe('angular/iframe.html', done);
    });

    test('Angular.JS could not compile content', function () {
      var html = getIframeHTML(iframe);
      assert(html.indexOf('{{ message }}') > -1);
    });

  });

});

if (navigator.userAgent.indexOf('PhantomJS') < 0) {
  mocha.run();
}
