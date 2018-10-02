# moog

[![Build Status](https://travis-ci.org/punkave/moog.svg?branch=master)](https://travis-ci.org/punkave/moog)

Moog creates objects, with rich support for subclassing and "implicit subclassing" (like "categories" in Objective C). Moog implements the "self pattern," so you never have to worry about using `.call`, `.apply` or `.bind`.

```javascript
var moog = require('moog')();

moog.define('baseclass', {
  color: 'blue',
  // sync constructor
  construct: function(self, options) {
    self._options = options;

    self.jump = function(howHigh) {
      return 'I jumped ' + howHigh + ' pixels high';
    };
  }
});

moog.define('subclass', {
  color: 'red',
  // async constructor
  construct: function(self, options, callback) {
    return goGetTheCandy(function(err, results) {
      if (err) {
       return callback(err);
      }
      self.candy = results;
      return callback(null);
    });
  }
});

moog.create('subclass', { age: 20 }, function(err, obj) {
  assert(obj._options.color === 'red');
  assert(obj.jump(5) === 'I jumped 5 pixels high');
});
```

`moog` synthesizes objects with full support for inheritance. You can define them with any combination of synchronous and asynchronous constructors, specify default options easily, and modify options before they are seen by base classes.

### Factory function

To create an instance of `moog`:

```javascript
var moog = require('moog')();
```

You may also pass options:

```javascript
var moog = require('moog')({
  defaultBaseClass: 'superclass'
});
```

### moog.define(type, definition)

Defines a new type. `type` is a string. 

```javascript
moog.define('baseclass', {
  // Set the default value of an option
  color: 'red',
  // Simple synchronous constructor
  construct: function(self, options) {
    self._options = options;
  }
});
```

The `definition` object can contain the properties `construct`, `beforeConstruct`, and `afterConstruct`, which are functions invoked by `moog.create`, as described below. The `extend` property allows for subclassing. All other properties are treated as defaults for the `options` object provided when constructing an instance of the type.

To subclass another type, just `extend` it by name in the definition of your subclass:

```javascript
moog.define('subclass', {
  // Change the default value of an option
  color: 'blue',
  extend: 'baseclass'
});
```

#### Default base class

**If you set the `defaultBaseClass` option of `moog`** and do not explicitly `extend` anything for a particular type, then that type will extend the `defaultBaseClass`. If you wish to override this behavior for a specific type, just set `extend` to `false`.

#### Implicit subclassing

**If you define the same class twice** without setting `extend` the second time, an *implicit subclass* is created.

The new version subclasses the old one, effectively "patching" it with new options and behavior without having to redefine everything. All other types that subclass that name now subclass the new version.

### Fallback base classes

If you are not sure if there is an existing definition for the type, you can use `extendIfFirst` to specify a fallback base class. This is helpful when encouraging third-party developers to optionally define a type themselves.

#### Defining many types at once

For convenience, you may pass an object containing properties that define many different types:

```javascript
moog.define({
  // This is equivalent to calling moog.define for each of these types
  'baseclass': {
    // See above for example of a definition
  },
  'subclass': {
    // See above for example of a definition
  }
});
```

### moog.redefine(type, definition)

Explicitly replaces any previous definition of `type` with a new one. Does *not* subclass the old type. If there was no old definition, this method is equivalent to `moog.define`.

### moog.isDefined(type, options)

Returns true if the type is defined, whether explicitly or via the autoloader option. That is, `moog.create` will succeed for `type`, provided that the constructor does not signal an error. If the type is available via the autoloader, this method returns true but does not leave the definition in place.

The `options` argument may be omitted entirely. If `options.autoload` is explicitly set to `false`, no attempt to test for the ability to load the type via the autoloader is made.

### moog.create(type, options, /* callback */)

Creates an object of the specified `type`, passing `options` to override any default options set in `moog.define`.

```javascript
moog.define('myObject', {
  color: 'blue',
  construct: function(self, options) {
    self.color = options.color;
  }
});

var myObject = moog.create('myObject', { color: 'purple' });
alert("My object is " + myObject.color); // "My object is purple"
```

When `create` is called, `moog` will first call `beforeConstruct`, starting with the deepest subclass first. Then the `construct` methods are called, if present, starting with the base class and ending with the final subclass. Finally the `afterConstruct` methods are called, if present, starting with the base class and ending with the final subclass.

In the above example, `moog.create` is called synchronously, but could be called asynchronously as follows:

```javascript
moog.create('myObject', { color: 'purple' }, function(err, myObject) {
  alert("My object is " + myObject.color); // "My object is purple"
});
```

If it's called asynchronously, the callback receives the arguments `err, obj` where `obj` is the object created. If it's called synchronously, an exception is thrown in the event of an error, otherwise the object is returned. **If you call `moog.create` synchronously but have asynchronous `beforeConstruct`, `construct`, or `afterConstruct` methods, `moog` will throw an exception.** You may, however, call `moog.create` asynchronously, even if your constructor functions are synchronous.

`obj` will always have a `__meta` property, which contains an array of metadata objects describing each module in the inheritance chain, starting with the base class. The metadata objects will always have a `name` property. [moog-require](https://github.com/punkave/moog-require) also provides `dirname` and `filename`. This is useful to implement template overrides, or push browser-side javascript and styles defined by each level.

### moog.createAll(globalOptions, specificOptions, /* callback */)

Creates one object of each type that has been defined via `moog.define` or via the `definitions` option given when configuring `moog`. Only types explicitly defined in this way are created, but they may extend types available via the `autoloader` option given when configuring `moog`.

The options passed for each object consist of `globalOptions` extended by `specificOptions[type]`.

If you pass a callback, it will receive an error and, if no error, an object with a property for each type name. If you do not pass a callback, such an object is returned directly. **If you do not pass a callback, then you must not define any types that have asynchronous `construct` and `beforeConstruct` methods.**

## Using moog in the browser

`moog` works in the browser, provided that `async` and `lodash` are already global in the browser. `moog` defines itself as `window.moog`. Currently it is not set up for use with browserify but this would be trivial to arrange.

### moog.mirror(meta, suffix)

Often, it is useful for the same type hierarchy to exist in two separate instances of `moog` — for instance, on the server side and the browser side. It is also often useful to recreate the same type hierarchy, but with a suffix appended to each type name.

If your server-side application has a "nifty-blog" type that inherits from "blog" which inherits from "pieces", you may want to ensure that the same types are defined on the browser side, and then take advantage of implicit subclassing to supply actual code for some or all of the types in the hierarchy.

To pull this off, invoke `moog.mirror` with the `__meta` property of an instance of any type:

`moog.mirror(niftyBlog.__meta);`

If any of the types in the hierarchy already exist, they are left alone. This allows you to safely use `moog.mirror` to patch any gaps in the type hierarchy, making sure any types that were not explicitly defined are filled in implicitly.

You may also optionally pass a `suffix` as the second argument. This is helpful if you wish to define types like this:

`nifty-blog-editor : blog-editor : pieces-editor`
`nifty-blog-manager : blog-manager : pieces-manager`

That code looks like:

`moog.mirror(niftyBlog.__meta, '-editor')`

If you are using [moog-require](https://github.com/punkave/moog-require), the `__meta` property can contain information about where your types are defined in the filesystem. You might not want to disclose that information to the web browser. To avoid that, you may filter the `__meta` object:

```javascript
var meta = {
  chain: []
};
_.each(object.__meta.chain, function(entry) {
  meta.chain.push({ name: entry.name });
});
```

Before making it available to the browser as JSON for use in a `moog.mirror` call.

## Changelog

All tests passing.

1.0.3: nudging past npm not making 1.0.2 available for some reason; no code changes.

1.0.2: in addition to the shallow top-level clone, we must also clone the `__meta` property and its `__meta.chain` subproperty to ensure they are not reused between instances of `moog`. No other properties of the definition are objects subject to modification.

1.0.1: shallowly clone each definition to avoid numerous problems when multiple instances of `moog` intended to be separate worlds wind up sharing the same definition objects due to the `require` cache. A shallow clone gives us independent `__meta` properties, which are all we need to solve the problem. Definitions are few, instances are many and the clone is shallow, so this is not a significant performance hit.

Also, use the apostrophe eslint test configuration. This required various syntax updates and flushed out a few oddities although no bugs.

1.0.0: updated `lodash` and `mocha` to satisfy `npm audit`. Code is still compatible with lodash 3.x as well, for those using the `@sailshq/lodash` fork for bc, and for Apostrophe's frontend which uses that version and shouldn't push multiple versions.

0.3.1: new `instanceOf` method. Given an object and a type name, this method returns true if the object is of the given type or a type that extends it.

0.3.0: new `options` argument to `isDefined`, which may contain an `autoloader: false` property to prevent `isDefined` from attempting to test whether the type can be defined by the autoloader.

0.2.4: throw the proper exception when synchronously creating a type that extends an undefined type. (Previously an exception was thrown, but it wasn't informative. It was an accidental benefit of trying to invoke a nonexistent callback.)

0.2.3: exceptions thrown for attempts to synchronously create types with asynchronous beforeConstruct/construct/afterConstruct methods now include the correct name of the type or ancestor type that requires the call to be asynchronous.

0.2.2: if `afterConstruct` expects a callback, calling `create` synchronously should throw an error. This is a bug fix, so no minor version bump is required.

0.2.1: `__meta` property is available in `beforeConstruct`. I regard this as a bug fix as the idea was always to have this information be available as early as possible.

0.2.0: added support for `mirror`, which allows browser-side type hierarchies to match those used on the server side. To add actual code for those types, take advantage of the implicit subclassing feature of `moog.define`.

0.1.5: added support for `extendIfFirst`, useful when you don't know if there is an existing definition of the type. report certain errors synchronously when creating objects synchronously.

0.1.4: allow setting `extend` to `false` to explicitly turn off `defaultBaseClass` for a particular type. Also corrected the unit test for `defaultBaseClass` (the feature worked, but the test was wrong).

0.1.3: never pass `options` to `afterConstruct`. We formerly were correctly leaving it off in the async case, but passing it in the sync case.

0.1.2: Updated some documentation.

0.1.1: added `afterConstruct`, another optional method which is invoked after `construct`. Like `beforeConstruct` and `construct` it can be sync or async. Unlike those methods it DOES NOT take the `options` parameter.

0.1.0: bc break: `__meta` is now an object with `chain` and `name` properties. `chain` is the array of subclass metadata objects as before. `name` is the class name being instantiated. Also, `__meta` is fully populated before any constructors are called.
