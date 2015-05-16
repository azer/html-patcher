## html-patcher

Virtual DOM Diff & Patch with HTML Templates. Based on [the virtual-dom on NPM](http://npmjs.org/virtual-dom)

## Install

```bash
$ npm install html-patch
```

## Usage

A simple app to show epoch time every second:

```js
var patcher = require('html-patcher')

var patch = patcher(document.body, render());

setInterval(function () {
  patch(render())
}, 1000);

function render () {
  return '<h1>' + Date.now() +  '</h1>';
}
```

See `test.js` for more info.
