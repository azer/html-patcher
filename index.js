var createRootNode = require('virtual-dom/create-element');
var diff = require('virtual-dom/diff');
var applyPatches = require('virtual-dom/patch');
var virtualHTML = require("virtual-html");

module.exports = newPatch;

function newPatch (parentNode, html) {
  var tree;
  var rootNode;

  patch(html);

  return patch;

  function patch (newHtml) {
    var vdom = virtualHTML(newHtml || html);

    if (!tree) {
      tree = vdom;
      rootNode = createRootNode(vdom);
      parentNode.appendChild(rootNode);
      return patch;
    }

    var patches = diff(tree, vdom);
    applyPatches(rootNode, patches);
    tree = vdom;

    return patch;
  }
}
