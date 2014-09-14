var htmltree = require("htmltree");
var createVNode = require('virtual-dom/h');
var createRootNode = require('virtual-dom/create-element');
var diff = require('virtual-dom/diff');
var applyPatches = require('virtual-dom/patch');

module.exports = newPatch;

function newPatch (parentNode, html, callback) {
  var tree;
  var rootNode;

  patch(html, callback);

  return patch;

  function patch (newHtml, callback) {
    vtree(newHtml || html, function (error, vdom) {
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

function vtree (html, callback) {
  if (typeof html == 'function') html = html();

  htmltree(html, function (err, dom) {
    if (err) return callback(err);
    callback(undefined, vnode(dom.root[0]));
  });
}

function vnode (parent) {
  if (parent.type == "text") return parent.data;
  if (parent.type != "tag") return;

  var children;
  var child;
  var len;
  var i;

  if (parent.children.length) {
    children = [];
    len = parent.children.length;
    i = -1;

    while (++i < len) {
      child = vnode(parent.children[i]);
      if (!child) continue;
      children.push(child);
    }
  }

  if (parent.attributes.style) parent.attributes.style = style(parent.attributes.style);

  return createVNode(parent.name, parent.attributes, children);
}

function style (raw) {
  if (!raw) return {};

  var result = {};
  var fields = raw.split(/;\s?/);
  var len = fields.length;
  var i = -1;
  var kv;

  while (++i < len) {
    kv = fields[i].split(/:\s?/);
    result[kv[0]] = kv[1];
  }

  return result;
}
