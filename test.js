var test = require("prova");
var patcher = require('./');

var fruits = ['apple', 'grape', 'orange'];
var moreFruits = ['apple', 'grape', 'cherry', 'melon', 'orange'];

test('Basic DOM diffing and patching', function (t) {
  t.plan(5);
  clear();

  patcher(document.body, basic('hi'), function (err, patch) {
    t.error(err);
    t.equal(document.body.innerHTML.trim(), '<h1>hi</h1>');

    var root = document.querySelector('basic');

    patch(basic('yo'), function (err) {
      t.error(err);
      t.equal(document.body.innerHTML.trim(), '<h1>yo</h1>');
      t.equal(document.querySelector('basic'), document.querySelector('basic'));
    });

  });
});

test('Lists', function (t) {
  t.plan(11);
  clear();

  patcher(document.body, list(fruits), function (err, patch) {
    t.error(err);

    t.equal(document.body.innerHTML.trim(), list(fruits));

    Array.prototype.forEach.call(document.querySelectorAll('li'), function (el) {
      el.style.color = 'purple';
      t.equal(el.style.color, 'purple');
    });

    patch(list(moreFruits), function (err) {
      t.error(err);

      Array.prototype.forEach.call(document.querySelectorAll('li'), function (el, ind) {
        if (ind > 2) { // cherry, melon or orange
          t.notOk(el.style.color);
          return;
        };

        t.equal(el.style.color, 'purple');
      });
    });
  });
});

test('Countback example', function (t) {
  t.plan(2);

  clear();

  var n = 3;
  var patch = patcher(document.body, render);
  var timer = setInterval(patch, 1000);

  function render () {
    if (n == 1) {
      clearInterval(timer);
    }

    if (n < 3) {
      t.equal(document.body.innerHTML.trim(), countback(n + 1));
    }

    return countback(n--);
  }

});

function basic (content) {
  return '<h1>' + content + '</h1>';
}

function list (content) {
  var html = '<ul class="foo">';

  html += content.map(function (el) {
    return '<li class="bar">' + el + '</li>';
  }).join('\n');

  html += '</ul>';

  return html;
}

function countback (n) {
  var size = 48 - (n * 5);
  var colors = ['red', 'blue', 'green'];
  return '<h1 data-n="' + n + '" style="font-size: ' + size + 'px; color: ' + colors[n - 1] + ';">' + n + ' </h1>';
}

function clear () {
  document.body.innerHTML = '';
}
