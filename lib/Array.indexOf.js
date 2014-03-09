/*jslint indent:2*/
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf

if (!Array.prototype.indexOf) {
  Array.prototype.indexOf = function (searchElement, fromIndex) {
    'use strict';
    if (this === undefined || this === null) {
      throw new TypeError('"this" is null or not defined');
    }

    /*jslint bitwise:true*/ // necessary
    var length = this.length >>> 0; // Hack to convert object.length to a UInt32
    /*jslint bitwise:false*/

    fromIndex = +fromIndex || 0;

    if (Math.abs(fromIndex) === Infinity) {
      fromIndex = 0;
    }

    if (fromIndex < 0) {
      fromIndex += length;
      if (fromIndex < 0) {
        fromIndex = 0;
      }
    }

    for (''; fromIndex < length; fromIndex += 1) {
      if (this[fromIndex] === searchElement) {
        return fromIndex;
      }
    }

    return -1;
  };
}
