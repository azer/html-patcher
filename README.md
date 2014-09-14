## html-patcher

Virtual DOM Diff & Patch with HTML Templates. Based on [virtual-dom](http://npmjs.org/virtual-dom)

## Install

```bash
$ npm install html-patch
```

## Usage

```js
var patcher = require('html-patcher')

var patch = patcher(document.body, render())

setInterval(function () {
  patch(render())
}, 1000);

function render () {
  return '<h1>' + Date.now() +  '</h1>';
}
```

See `test.js` for more info.

## Links

- [JSFiddle Benchmark](http://jsfiddle.net/gr4rehhg/)
