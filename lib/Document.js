// allow us to work with the Document constructor in Internet Explorer 8
window.Document = window.Document || window.HTMLDocument;

// allow us to work with the Document constructor in Internet Explorer 7
window.Document = window.Document || {
  prototype: window.document
};

// allow us to work with the HTMLDocument constructor in Internet Explorer 7
window.HTMLDocument = window.HTMLDocument || window.Document;
