# deep-get-set

Set and get values on objects via dot-notation strings.

[![testling badge](https://ci.testling.com/acstll/deep-get-set.png)](https://ci.testling.com/acstll/deep-get-set)

## Example

```js
var deep = require('deep-get-set');

var obj = {
  foo: {
    bar: 'baz'
  }
};

// Get
console.log(deep(obj, 'foo.bar'));
  // => "baz"

// Set
deep(obj, 'foo.bar', 'hello');
console.log(obj.foo.bar);
  // => "hello"
```

## API

### deep(object, path[, value])

Where `path` is a dot-notation string `foo.bar`.

- If `value` is passed it will be set on the path.
- Set `deep.p = true` if you want non-existent paths to be initialized.
- If you want to unset (or delete), pass `undefined` as the `value`.

## Installation

With [npm](https://npmjs.org) do:

```bash
npm install deep-get-set
```

## Note

There's a dozen modules like this on [npm](https://npmjs.org).
This is a fork from [@juliangruber's](https://github.com/juliangruber) [deep-access](https://github.com/juliangruber/deep-access) module, with a big portion of code directly copied from here: https://github.com/substack/js-traverse/blob/master/index.js#L11-L18.

Similar modules:

- https://github.com/deoxxa/dotty (this one I like because it uses recursion)
- https://github.com/Ntran013/dot-access (pretty much the same as this)
- https://github.com/substack/js-traverse (much more complex and useful)

## License

MIT