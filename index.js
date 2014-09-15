var createRootNode = require('virtual-dom/create-element');
var diff = require('virtual-dom/diff');
var applyPatches = require('virtual-dom/patch');
var virtualHTML = require("virtual-html");

module.exports = newPatch;

function newPatch (parentNode, html, callback) {
  var tree;
  var rootNode;

  patch(html, callback);

  return patch;

  function patch (newHtml, callback) {
    virtualHTML(newHtml || html, function (error, vdom) {
      if (error) return callback && callback(error, patch);

      if (!tree) {
        tree = vdom;
        rootNode = createRootNode(vdom);
        parentNode.appendChild(rootNode);
        return callback && callback(undefined, patch);
      }

      var patches = diff(tree, vdom);
      applyPatches(rootNode, patches);
      tree = vdom;

      callback && callback(undefined, patch);
    });
  }
}
