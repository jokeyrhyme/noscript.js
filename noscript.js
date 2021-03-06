/*jslint indent:2, browser:true*/

/*global ActiveXObject*/ // Internet Explorer 6
/*global HTMLDocument, HTMLElement, Element, Node*/

var noscript = window.noscript || {};

noscript.show = (function () {
  'use strict';

  var isNoscriptContentAvailable, noscripts;

  isNoscriptContentAvailable = (function () {
    var el = document.createElement('p');
    el.innerHTML = 'test<noscript><br /></noscript>';
    switch (el.innerHTML.toLowerCase()) {
    case '':
    case 'test':
    case 'test<noscript></noscript>':
      return false;
    }
    return true;
  }());

  function refetchNoscripts() {
    var matches, m, elements, noscript, tagMatches, xhr;
    if (window.XMLHttpRequest) {
      xhr = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
      xhr = new ActiveXObject('Microsoft.XMLHTTP');
    } else {
      throw 'unable to fetch original HTML';
    }
    // yes, this is an evil synchronous XHR
    xhr.open('GET', document.location.href, false);
    xhr.send(null);
    /*jslint regexp:true*/ // intentionally grabby expressions
    if (xhr.readyState === 4 && xhr.status < 300 && xhr.responseText) {
      matches = xhr.responseText.match(/<\s*noscript[^>]*>([\s\S]*?)<\/\s*noscript\s*>/ig);
      elements = document.getElementsByTagName('noscript');
      if (matches && elements && matches.length === elements.length) {
        m = matches.length;
        while (m > 0) {
          m -= 1;
          noscript = elements[m];
          tagMatches = matches[m].match(/<\s*noscript[^>]*>([\s\S]*?)<\/\s*noscript\s*>/i);
          noscript.insertAdjacentHTML('beforebegin', tagMatches[1]);
          noscript.parentNode.removeChild(noscript);
        }
      }
    }
    /*jslint regexp:false*/
  }

  function unwrapElements(elements) {
    var i, j, el, child, text;
    elements = document.getElementsByTagName('noscript');
    i = elements.length;
    while (i > 0) {
      i -= 1;
      el = elements[i];
      j = el.childNodes.length;
      if (j === 0 && el.innerHTML) {
        el.insertAdjacentHTML('beforebegin', el.innerHTML);
      }
      while (j > 0) {
        j -= 1;
        child = el.childNodes[j];
        // note: textContent / innerText may trim the contents
        text = child.textContent || child.innerText || child.innerHTML;
        el.insertAdjacentHTML('beforebegin', text);
      }
      el.parentNode.removeChild(el);
    }
  }

  return function () {
    noscripts = document.getElementsByTagName('noscript');
    if (isNoscriptContentAvailable) {
      // unwrap all noscript elements
      // noscript tags shouldn't be nested, but we'll cover this case anyway
      while (noscripts.length) {
        unwrapElements(noscripts);
        noscripts = document.getElementsByTagName('noscript');
      }
    } else {
      // browser is broken, and page is damaged
      // we need to now refetch the page to get the intended contents :S
      if (noscripts.length) {
        refetchNoscripts();
      }
    }
  };

}());

noscript.lockdown = (function () {
  'use strict';

  var noop, trashees;

  noop = noscript.noop;

  function trashObject(obj) {
    var prop, type;
    if (obj && typeof obj === 'object' && obj.hasOwnProperty) {
      for (prop in obj) {
        // check, and don't bother with inherited properties
        if (obj.hasOwnProperty(prop)) {
          // check, and don't bother with certain magic properties
          if (!trashObject.SPECIAL_OBJECTS[obj] ||
              trashObject.SPECIAL_OBJECTS[obj].indexOf(prop) === -1) {
            // check, and don't bother with certain types
            try {
              type = typeof obj[prop];
              if (trashObject.AVOID_TYPES.indexOf(type) === -1) {
                if (type !== 'function') {
                  obj[prop] = null;
                  delete obj[prop];
                }
                if (obj[prop]) {
                  obj[prop] = noop;
                }
              }
            } catch (ignore) {}
          }
        }
      }
    }
  }
  trashObject.AVOID_TYPES = ['number', 'string', 'boolean', 'array'];

  trashObject.SPECIAL_OBJECTS = {};
  // messing with the 'location' property causes browser navigation
  trashObject.SPECIAL_OBJECTS[window] = ['location'];
  trashObject.SPECIAL_OBJECTS[document] = ['location'];

  // clumsily implement a blacklist of JavaScript objects

  trashees = [
    window.console || window.debug,
    window,
    window.Element && Element.prototype,
    window.Node && Node.prototype,
    window.XMLHttpRequest && XMLHttpRequest.prototype,
    window.Storage && Storage.prototype
  ];

  window.onerror = function () { return true; };

  return function () {
    var t;
    t = trashees.length;
    while (t > 0) {
      t -= 1;
      trashObject(trashees[t]);
    }
    noscript.redHerrings();
  };
}());
