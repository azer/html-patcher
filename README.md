## html-patcher

Virtual DOM Diff & Patch with HTML Templates. Based on [the virtual-dom on NPM](http://npmjs.org/virtual-dom)

## Install

```bash
$ npm install html-patch
```

## Usage

```js
var patcher = require('html-patcher')

patcher(document.body, render(), function (error, patch) {
  if (error) throw error;

  setInterval(function () {
    patch(render())
  }, 1000);
})

function render () {
  return '<h1>' + Date.now() +  '</h1>';
}
```

See `test.js` for more info.

## Links

- [JSFiddle Benchmark](http://jsfiddle.net/gr4rehhg/)
