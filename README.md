# noscript.js

stop other JavaScript (as best as can be done) and show `noscript` elements

## Installation

You can just grab the `noscript.min.js` file from this repository, or you can
use Bower:

- `bower install noscript`


## Usage

Include `noscript.js` on your web page. This installs a global `noscript`
object. You may want the poly-fills in the `lib` directory if you plan on using
this with older browsers.

**TODO**: provide a concatenated version so that there is just one file

### noscript.show()

This will find all `noscript` elements on the page, and make their contents
visible, just as though the browser had JavaScript disabled.

**Caution**: this will only work on elements that were on the page _before_
`noscript.show()` was called. That means that you'll likely want to do this
after all other HTML elements have been declared (e.g. at the bottom of the
`body` element.

### noscript.lockdown()

There doesn't seem to be a way to disable JavaScript via JavaScript. So, this
method hunts down various APIs that govern side-effects (e.g. HTML DOM, AJAX,
etc) and tampers with them to the point where they hopefully become useless.

**Caution**: you need to call this _after_ calling `noscript.show()`, because
that method will not work at all after `.lockdown()`. If you have no
`noscript` elements on the page, then feel free to call this as early as
possible. You'll want to call this _before_ any JavaScript to be blocked.


## Example

```
<!DOCTYPE html>
<html>
  <head>...</head>
  <body>
    <noscript>Error: bad device or web browser</noscript>
    ...
    <script src="noscript.js"></script>
    <script>
    if (!window.JSON) {
      noscript.show();
      noscript.lockdown();
    }
    </script>
  </body>
</html>
```
