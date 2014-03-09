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

  (HTMLDocument || Document).prototype.querySelector = noop;
  (HTMLDocument || Document).prototype.querySelectorAll = noop;

};
