/*jslint indent:2, browser:true*/

/*global HTMLDocument, HTMLElement, Element, Node*/

var noscript = (function (window) {
  'use strict';

  var noscripts, trashees, t;

  function unwrapElements(elements) {
    var i, j, el, child, text;
    elements = document.getElementsByTagName('noscript');
    i = elements.length;
    while (i > 0) {
      i -= 1;
      el = elements[i];
      j = el.childNodes.length;
      while (j > 0) {
        j -= 1;
        child = el.childNodes[j];
        // note: textContent / innerText may trim the contents
        text = child.textContent || child.innerText;
        el.insertAdjacentHTML('beforebegin', text);
      }
      el.parentNode.removeChild(el);
    }
  }

  function noop() {
    throw 'synthetic error is used to disable JavaScript';
  }

  function trashObject(obj) {
    var prop;
    if (obj && typeof obj === 'object') {
      for (prop in obj) {
        // check, and don't bother with inherited properties
        if (obj.hasOwnProperty(prop)) {
          // check, and don't bother with certain magic properties
          if (!trashObject.SPECIAL_OBJECTS[obj] ||
              trashObject.SPECIAL_OBJECTS[obj].indexOf(prop) === -1) {
            // check, and don't bother with certain types
            try {
              if (trashObject.AVOID_TYPES.indexOf(typeof obj[prop]) === -1) {
                obj[prop] = null;
                delete obj[prop];
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
    document,
    HTMLDocument && HTMLDocument.prototype,
    HTMLElement && HTMLElement.prototype,
    Element && Element.prototype,
    Node && Node.prototype,
    XMLHttpRequest && XMLHttpRequest.prototype,
    Storage && Storage.prototype
  ];

  return {
    show: function () {
      // unwrap all noscript elements
      // noscript tags shouldn't be nested, but we'll cover this case anyway
      noscripts = document.getElementsByTagName('noscript');
      while (noscripts.length) {
        unwrapElements(noscripts);
        noscripts = document.getElementsByTagName('noscript');
      }
    },
    lockdown: function () {
      t = trashees.length;
      while (t > 0) {
        t -= 1;
        trashObject(trashees[t]);
      }
    }
  };

}(this));
