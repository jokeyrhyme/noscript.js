/*jslint browser:true, indent:2*/
/*global HTMLDocument, Document, HTMLElement, Element*/ // DOM API

/**
 * This file sends JavaScript libraries off in totally wrong directions,
 * hopefully to their doom.
 */

var noscript = window.noscript || {};

noscript.noop = function () {
  'use strict';
  throw 'synthetic error is used to disable JavaScript';
};

noscript.redHerrings = function () {
  'use strict';

  var noop = noscript.noop;

  Object.keys = noop;
  Object.create = noop;

  if (window.JSON) {
    JSON.stringify = noop;
    JSON.parse = noop;
  }

  Math.random = noop;
  Math.min = noop;
  Math.max = noop;
  Math.floor = noop;
  Math.ceiling = noop;

  Date.parse = noop;

  window.define = noop;
  window.define.amd = true;

  // Internet Explorer 8 DOM doesn't have 'hasOwnProperty', so we
  // need to explicitly eliminate DOM side-effects one-by-one here

  window.Node = window.Node || window.Element;
  if (window.Node && window.Node.prototype) {
    window.Node.prototype.appendChild = noop;
    window.Node.prototype.insertBefore = noop;
    window.Node.prototype.normalize = noop;
    window.Node.prototype.removeChild = noop;
    window.Node.prototype.replaceChild = noop;
  }

  if (window.Element && window.Element.prototype) {
    window.Element.prototype.insertAdjacentElement = noop;
    window.Element.prototype.insertAdjacentHTML = noop;
    window.Element.prototype.insertAdjacentText = noop;
    window.Element.prototype.querySelector = noop;
    window.Element.prototype.querySelectorAll = noop;
    window.Element.prototype.remove = noop;
    window.Element.prototype.removeAttribute = noop;
    window.Element.prototype.removeAttributeNS = noop;
    window.Element.prototype.removeAttributeNode = noop;
    window.Element.prototype.scrollIntoView = noop;
    window.Element.prototype.setAttribute = noop;
    window.Element.prototype.setAttributeNS = noop;
    window.Element.prototype.setAttributeNode = noop;
  }

};
