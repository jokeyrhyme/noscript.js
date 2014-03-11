/*jslint browser:true, indent:2*/
/*global mocha, suite, test, suiteSetup, suiteTeardown, setup, teardown*/ // Mocha

/*global noscript*/ // code under test
/*jslint nomen:true*/ // Karma's global __karma__

// add Mocha's div if it is missing
(function () {
  'use strict';
  var div;
  div = document.getElementById('mocha');
  if (!div) {
    document.body.insertAdjacentHTML('afterbegin', '<div id="mocha"></div>');
  }
}());

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
    if (window.__karma__) {
      src = '/base/tests/' + src;
    }
    iframe.src = src;
    return iframe;
  }

  function getIframeHTML(iframe) {
    return (iframe.contentDocument || iframe.contentWindow.document).body.innerHTML;
  }

  suiteSetup(function () {
    document.body.insertAdjacentHTML('beforeend', '<iframe id="iframe" src="" height="300" width="300"></iframe>');
  });

  suite('noscript elements', function () {
    var iframe;

    suiteSetup(function (done) {
      iframe = loadIframe('noscript/iframe.html', done);
    });

    test('noscript elements are initially present', function () {
      var html = getIframeHTML(iframe).toLowerCase();
      assert(html.indexOf('<noscript>') !== -1);
    });

    test('noscript.show() kills noscript elements', function () {
      var html;
      iframe.contentWindow.noscript.show();
      html = getIframeHTML(iframe);
      assert(html.indexOf('<noscript>') === -1);
    });

    test('noscript.show() displays noscript contents', function () {
      var html = getIframeHTML(iframe);
      assert(html.indexOf('JavaScript is disabled!') > -1);
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
