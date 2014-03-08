// poly-fill for insertAdjacentHTML
// https://gist.github.com/eligrey/1276030
if (document &&
    !("insertAdjacentHTML" in document.createElementNS("http://www.w3.org/1999/xhtml", "_"))) {

  HTMLElement.prototype.insertAdjacentHTML = function(position, html) {
      "use strict";

    var ref, container, ref_parent, node, first_child, next_sibling;

    ref = this;
    container = ref.ownerDocument.createElementNS("http://www.w3.org/1999/xhtml", "_");
    ref_parent = ref.parentNode;
    container.innerHTML = html;

    switch (position.toLowerCase()) {
        case "beforebegin":
            while ((node = container.firstChild)) {
                ref_parent.insertBefore(node, ref);
            }
            break;
        case "afterbegin":
            first_child = ref.firstChild;
            while ((node = container.lastChild)) {
                first_child = ref.insertBefore(node, first_child);
            }
            break;
        case "beforeend":
            while ((node = container.firstChild)) {
                ref.appendChild(node);
            }
            break;
        case "afterend":
            next_sibling = ref.nextSibling;
            while ((node = container.lastChild)) {
                next_sibling = ref_parent.insertBefore(node, next_sibling);
            }
            break;
      }
  };

}
