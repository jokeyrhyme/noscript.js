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

  if (window.EventTarget && window.EventTarget.prototype) {
    window.EventTarget.prototype.addEventListener = noop;
    window.EventTarget.prototype.dispatchEvent = noop;
    window.EventTarget.prototype.removeEventListener = noop;
  }

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
    window.Element.prototype.attachEvent = noop;
    window.Element.prototype.getElementsByClassName = noop;
    window.Element.prototype.getElementsByName = noop;
    window.Element.prototype.getElementsByTagName = noop;
    window.Element.prototype.getElementsByTagNameNS = noop;
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

  window.Document.prototype.createAttribute = noop;
  window.Document.prototype.createCDATASection = noop;
  window.Document.prototype.createComment = noop;
  window.Document.prototype.createDocumentFragment = noop;
  window.Document.prototype.createElement = noop;
  window.Document.prototype.createElementNS = noop;
  window.Document.prototype.createEvent = noop;
  window.Document.prototype.createTextNode = noop;
  window.Document.prototype.getElementById = noop;
  window.Document.prototype.getElementsByName = noop;
  window.Document.prototype.getElementsByTagName = noop;
  window.Document.prototype.getElementsByTagNameNS = noop;
  window.Document.prototype.registerElement = noop;
  window.Document.prototype.evaluate = noop;

  window.HTMLDocument.prototype.close = noop;
  window.HTMLDocument.prototype.open = noop;
  window.HTMLDocument.prototype.write = noop;
  window.HTMLDocument.prototype.writeln = noop;
};
