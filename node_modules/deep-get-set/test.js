var test = require('tape');
var deep = require('./');

test('deep gets', function (t) {
  var obj = {
    foo: 'bar',
    bar: {
      baz: {
        beep: 'boop'
      }
    }
  };

  t.equal(deep(obj, 'foo'), 'bar');
  t.equal(deep(obj, 'bar.baz.beep'), 'boop');
  t.equal(deep(obj, 'bar.baz.beep.yep.nope'), undefined);
  t.end();
});

test('deep sets', function (t) {
  var obj = {
    foo: 'bar',
    bar: {
      baz: {
        beep: 'boop'
      }
    }
  };

  function p () {
    deep(obj, 'yep.nope', 'p');
  }
  
  t.equal(deep(obj, 'foo', 'yep'), 'yep');
  t.equal(obj.foo, 'yep');
  t.equal(deep(obj, 'bar.baz.beep', 'nope'), 'nope');
  t.equal(obj.bar.baz.beep, 'nope');
  t.throws(p);

  deep.p = true;

  t.equal(deep(obj, 'yep.nope', 'p'), 'p');
  t.equal(obj.yep.nope, 'p');

  t.end();
});

test('deep deletes', function (t) {
  var obj = {
    foo: 'bar',
    bar: {
      baz: {
        beep: 'boop'
      }
    }
  };

  t.equal(deep(obj, 'foo', undefined), undefined);
  t.notOk(obj.foo);
  t.equal(deep(obj, 'bar.baz', undefined), undefined);
  t.notOk(obj.bar.baz);
  t.equal(deep(obj, 'bar.baz.beep'), undefined);
  t.end();
});