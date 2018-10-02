var assert = require('assert');

describe('moog', function() {
  it('should exist', function(done) {
    var moog = require('../index.js')({ });

    assert(moog);
    return done();
  });

  it('should be initialized without arguments', function(done) {
    var moog = require('../index.js')();
    assert(moog);
    return done();
  });

  describe('methods', function() {
    it('should have a `define` method', function(done) {
      var moog = require('../index.js')({});
      assert(moog.define);
      return done();
    });

    it('should have a `redefine` method', function(done) {
      var moog = require('../index.js')({});
      assert(moog.redefine);
      return done();
    });

    it('should have a `create` method', function(done) {
      var moog = require('../index.js')({});
      assert(moog.create);
      return done();
    });

    it('should have a `createAll` method', function(done) {
      var moog = require('../index.js')({});
      assert(moog.createAll);
      return done();
    });

    it('should have a `bridge` method', function(done) {
      var moog = require('../index.js')({});
      assert(moog.bridge);
      return done();
    });

    it('should have a `isDefined` method', function(done) {
      var moog = require('../index.js')({});
      assert(moog.isDefined);
      return done();
    });
  });

  describe('defining and creating', function() {
    it('should be able to `define` an instance', function() {
      var moog = require('../index.js')({});

      moog.define('myObject', {
        construct: function() {}
      });
    });

    it('should be able to `define` and then `create` an instance', function(done) {
      var moog = require('../index.js')({});

      moog.define('myObject', {
        color: 'blue',
        construct: function(self, options) {
          self._options = options;
        }
      });

      moog.create('myObject', {}, function(err, myObject) {
        assert(!err);
        assert(myObject);
        assert(myObject._options.color === 'blue');
        return done();
      });
    });

    it('should be able to `define` multiple types using an object', function(done) {
      var moog = require('../index.js')({});

      moog.define({
        'myObjectOne': {
          construct: function(self, options) {}
        },
        'myObjectTwo': {
          construct: function(self, options) {}
        }
      });

      moog.create('myObjectOne', {}, function(err, myObject) {
        if (err) {
          console.error(err);
        }
        assert(!err);
        assert(myObject);
        return done();
      });
    });

    it('should create multiple modules using `createAll`', function(done) {
      var moog = require('../index.js')({});

      moog.define('objectOne', {
        construct: function(self, options) { }
      });

      moog.define('objectTwo', {
        construct: function(self, options) { }
      });

      moog.createAll({}, {}, function(err, modules) {
        if (err) {
          console.error(err);
        }
        assert(!err);
        assert(modules);
        assert(modules.objectOne);
        assert(modules.objectTwo);
        return done();
      });
    });

    it('should create multiple modules using `createAll` synchronously', function() {
      var moog = require('../index.js')({});

      moog.define('objectOne', {
        construct: function(self, options) { }
      });

      moog.define('objectTwo', {
        construct: function(self, options) { }
      });

      var modules = moog.createAll({}, {});

      assert(modules);
      assert(modules.objectOne);
      assert(modules.objectTwo);
    });

  });

  describe('`create` and `createAll` syntax', function() {
    it('should `create` without options or a callback', function() {
      var moog = require('../index.js')();

      moog.define('myClass', {
        construct: function(self, options) { }
      });

      var myClass = moog.create('myClass');
      assert(myClass);
    });

    it('should `create` without options', function(done) {
      var moog = require('../index.js')();

      moog.define('myClass', {
        construct: function(self, options) { }
      });

      moog.create('myClass', function(err, myClass) {
        assert(!err);
        assert(myClass);
        return done();
      });
    });

    it('should `create` without a callback', function() {
      var moog = require('../index.js')();

      moog.define('myClass', {
        construct: function(self, options) { }
      });

      var myClass = moog.create('myClass', {});
      assert(myClass);
    });
  });

  describe('explicit subclassing behavior', function() {

    it('should be able to override a default option value at create time', function(done) {
      var moog = require('../index.js')({});

      moog.define('myObject', {
        color: 'blue',
        construct: function(self, options) {
          self._options = options;
        }
      });

      moog.create('myObject', { color: 'purple' }, function(err, myObject) {
        assert(!err);
        assert(myObject);
        assert(myObject._options.color === 'purple');
        return done();
      });
    });

    it('should be able to create a subclass with expected default option behavior (async)', function(done) {
      var moog = require('../index.js')({});

      moog.define('baseClass', {
        color: 'blue',
        construct: function(self, options) {
          self._options = options;
        }
      });

      moog.define('subClass', {
        color: 'red',
        extend: 'baseClass'
      });

      moog.create('subClass', {}, function(err, myObject) {
        if (err) {
          console.error(err);
        }
        assert(!err);
        assert(myObject);
        assert(myObject._options.color === 'red');
        return done();
      });
    });

    it('should be able to create a subclass with expected default option behavior (sync)', function() {
      var moog = require('../index.js')({});

      moog.define('baseClass', {
        color: 'blue',
        construct: function(self, options) {
          self._options = options;
        }
      });

      moog.define('subClass', {
        color: 'red',
        extend: 'baseClass'
      });

      var myObject = moog.create('subClass', {});
      assert(myObject);
      assert(myObject._options.color === 'red');
    });

    it('should report an error gracefully if subclass to be extended does not exist (async)', function(done) {
      var moog = require('../index.js')({});

      // base class does not actually exist
      moog.define('subClass', {
        color: 'red',
        extend: 'baseClass'
      });

      moog.create('subClass', {}, function(err, myObject) {
        assert(err);
        return done();
      });
    });

    it('should throw an exception gracefully if subclass to be extended does not exist (sync)', function() {
      var moog = require('../index.js')({});

      // base class does not actually exist
      moog.define('subClass', {
        color: 'red',
        extend: 'baseClass'
      });

      var exception;
      try {
        moog.create('subClass', {});
      } catch (e) {
        exception = e;
      }
      assert(exception);
      assert(exception.toString().match(/baseClass/));
    });

    it('should be able to `extend` a subclass into yet another subclass', function(done) {
      var moog = require('../index.js')({});

      moog.define('baseClass', {
        color: 'blue',
        construct: function(self, options) {
          self._options = options;
        }
      });

      moog.define('subClassOne', {
        color: 'red',
        extend: 'baseClass'
      });

      moog.define('subClassTwo', {
        color: 'green',
        extend: 'subClassOne'
      });

      moog.create('subClassTwo', {}, function(err, myObject) {
        if (err) {
          console.error(err);
        }
        assert(!err);
        assert(myObject);
        assert(myObject._options.color === 'green');
        return done();
      });
    });

    it('default base class should take effect if configured', function(done) {
      var moog = require('../index.js')({ defaultBaseClass: 'baseClass' });

      moog.define('baseClass', {
        construct: function(self, options) {
          // Moving these asserts here tests that meta is available
          // in its entirety even in base class constructor. -Tom
          assert(self.__meta);
          assert(self.__meta.chain);
          assert(self.__meta.chain[0]);
          assert(self.__meta.chain[0].name === 'baseClass');
          assert(self.__meta.chain[1].name === 'subClass');
          assert(self.__meta.name === 'subClass');
          self._options = options;
        }
      });

      moog.define('subClass', {
        color: 'red'
      });

      moog.create('subClass', {}, function(err, myObject) {
        if (err) {
          console.error(err);
        }
        assert(!err);
        assert(myObject);
        // What we are testing is that _options got set at all
        // (see construct for baseClass)
        assert(myObject._options.color === 'red');
        return done();
      });
    });

    it('default base class should not take effect if extend is explicitly set to false', function(done) {
      var moog = require('../index.js')({ defaultBaseClass: 'baseClass' });

      moog.define('baseClass', {
        construct: function(self, options) {
          self._options = options;
        }
      });

      moog.define('subClass', {
        color: 'red',
        extend: false
      });

      moog.create('subClass', {}, function(err, myObject) {
        if (err) {
          console.error(err);
        }
        assert(!err);
        assert(myObject);
        assert(!myObject._options);
        return done();
      });
    });

    it('should allow modules to reference each other using `bridge`', function(done) {
      var moog = require('../index.js')({});

      moog.define('objectOne', {
        construct: function(self, options) {
          self._options = options;
          self.setBridge = function(modules) {
            self._otherModule = modules.objectOne;
          };
        }
      });

      moog.define('objectTwo', {
        color: 'red',
        construct: function(self, options) {
          self._options = options;
          self.setBridge = function(modules) {
            self._otherModule = modules.objectTwo;
          };
        }
      });

      moog.createAll({}, {}, function(err, modules) {
        if (err) {
          console.error(err);
        }
        assert(!err);
        moog.bridge(modules);
        assert(modules.objectOne._otherModule);
        assert(modules.objectTwo._otherModule);
        return done();
      });
    });

    // ==================================================
    // `redefine` AND `isDefined`
    // ==================================================

    it('should allow a module to be redefined', function(done) {
      var moog = require('../index.js')({});

      moog.define('myObject', {
        construct: function(self, options) {
          self._oldProperty = true;
        }
      });

      moog.redefine('myObject', {
        construct: function(self, options) {
          self._newProperty = true;
        }
      });

      moog.create('myObject', {}, function(err, myObject) {
        assert(!err);
        assert(myObject);
        assert(!myObject._oldProperty);
        assert(myObject._newProperty);
        return done();
      });
    });

    it('should find a module definition using `isDefined`', function() {
      var moog = require('../index.js')({});

      moog.define('myObject', {
        construct: function(self, options) {
          self._oldProperty = true;
        }
      });

      assert(moog.isDefined('myObject'));
    });

    it('should NOT find a non-existant module definition using `isDefined`', function() {
      var moog = require('../index.js')({});

      assert(!moog.isDefined('myObject'));
    });

  });

  describe('implicit subclassing behavior', function() {
    it('should allow a class defined twice to be implicitly subclassed', function(done) {
      var moog = require('../index.js')({});

      moog.define('myObject', {
        construct: function(self, options) {
          self._order = (self._order || []).concat('first');
        }
      });

      moog.define('myObject', {
        construct: function(self, options) {
          self._order = (self._order || []).concat('second');
        }
      });

      moog.create('myObject', {}, function(err, myObject) {
        assert(!err);
        assert(myObject);

        assert(myObject._order[0] === 'first');
        assert(myObject._order[1] === 'second');
        return done();
      });
    });

    it('extendIfFirst property is honored if there is no existing definition for the type to implicitly subclass', function(done) {
      var moog = require('../index.js')({});

      moog.define('fallback', {
        construct: function(self, options) {
          self._order = (self._order || []).concat('interloper');
        }
      });

      moog.define('myObject', {
        construct: function(self, options) {
          self._order = (self._order || []).concat('second');
        },
        extendIfFirst: 'fallback'
      });

      moog.create('myObject', {}, function(err, myObject) {
        assert(!err);
        assert(myObject);
        assert(myObject._order.length === 2);
        assert(myObject._order[0] === 'interloper');
        assert(myObject._order[1] === 'second');
        return done();
      });
    });

    it('extendIfFirst property is ignored if there is an existing definition for the type', function(done) {
      var moog = require('../index.js')({});

      moog.define('fallback', {
        construct: function(self, options) {
          self._order = (self._order || []).concat('interloper');
        }
      });

      moog.define('myObject', {
        construct: function(self, options) {
          self._order = (self._order || []).concat('first');
        }
      });

      moog.define('myObject', {
        construct: function(self, options) {
          self._order = (self._order || []).concat('second');
        },
        extendIfFirst: 'fallback'
      });

      moog.create('myObject', {}, function(err, myObject) {
        assert(!err);
        assert(myObject);
        assert(myObject._order.length === 2);
        assert(myObject._order[0] === 'first');
        assert(myObject._order[1] === 'second');
        return done();
      });
    });

  });

  describe('order of operations', function() {

    // ==================================================
    // ORDERING
    // ==================================================

    it('should call `construct` methods baseClass-first', function(done) {
      var moog = require('../index.js')({});

      moog.define('baseClass', {
        construct: function(self, options) {
          self._order = (self._order || []).concat('first');
        }
      });

      moog.define('subClassOne', {
        extend: 'baseClass',
        construct: function(self, options) {
          self._order = (self._order || []).concat('second');
        }
      });

      moog.define('subClassTwo', {
        extend: 'subClassOne',
        construct: function(self, options) {
          self._order = (self._order || []).concat('third');
        }
      });

      moog.create('subClassTwo', {}, function(err, subClassTwo) {
        assert(!err);
        assert(subClassTwo._order[0] === 'first');
        assert(subClassTwo._order[1] === 'second');
        assert(subClassTwo._order[2] === 'third');
        return done();
      });
    });

    it('should call `beforeConstruct` methods subClass-first', function(done) {
      var moog = require('../index.js')({});

      moog.define('baseClass', {
        beforeConstruct: function(self, options) {
          self._order = (self._order || []).concat('third');
        }
      });

      moog.define('subClassOne', {
        extend: 'baseClass',
        beforeConstruct: function(self, options) {
          self._order = (self._order || []).concat('second');
        }
      });

      moog.define('subClassTwo', {
        extend: 'subClassOne',
        beforeConstruct: function(self, options) {
          self._order = (self._order || []).concat('first');
        }
      });

      moog.create('subClassTwo', {}, function(err, subClassTwo) {
        assert(!err);
        assert(subClassTwo._order[0] === 'first');
        assert(subClassTwo._order[1] === 'second');
        assert(subClassTwo._order[2] === 'third');
        return done();
      });
    });

    // ==================================================
    // SYNC AND ASYNC PLAYING NICELY
    // ==================================================

    it('should extend an async `construct` method with a sync version', function(done) {
      var moog = require('../index.js')({});

      moog.define('baseClass', {
        construct: function(self, options, callback) {
          // Base class constructor can see complete metadata in an
          // async environment. -Tom
          assert(self.__meta.chain);
          assert(self.__meta.chain[0]);
          assert(self.__meta.chain[0].name === 'baseClass');
          assert(self.__meta.chain[1].name === 'subClass');
          assert(self.__meta.name === 'subClass');

          self._order = (self._order || []).concat('first');
          return setImmediate(callback);
        }
      });

      moog.define('subClass', {
        extend: 'baseClass',
        construct: function(self, options) {
          self._order = (self._order || []).concat('second');
        }
      });

      moog.create('subClass', {}, function(err, subClass) {
        assert(!err);
        assert(subClass);
        assert(subClass._order[0] === 'first');
        assert(subClass._order[1] === 'second');
        return done();
      });
    });

    it('should extend a sync `construct` method with an async version', function(done) {
      var moog = require('../index.js')({});

      moog.define('baseClass', {
        construct: function(self, options) {
          self._order = (self._order || []).concat('first');
        }
      });

      moog.define('subClass', {
        extend: 'baseClass',
        construct: function(self, options, callback) {
          self._order = (self._order || []).concat('second');
          return setImmediate(callback);
        }
      });

      moog.create('subClass', {}, function(err, subClass) {
        assert(!err);
        assert(subClass);
        assert(subClass._order[0] === 'first');
        assert(subClass._order[1] === 'second');
        return done();
      });
    });

    it('should extend an async `beforeConstruct` method with a sync version', function(done) {
      var moog = require('../index.js')({});

      moog.define('baseClass', {
        beforeConstruct: function(self, options, callback) {
          self._order = (self._order || []).concat('second');
          return setImmediate(callback);
        }
      });

      moog.define('subClass', {
        extend: 'baseClass',
        beforeConstruct: function(self, options) {
          self._order = (self._order || []).concat('first');
        }
      });

      moog.create('subClass', {}, function(err, subClass) {
        assert(!err);
        assert(subClass);
        assert(subClass._order[0] === 'first');
        assert(subClass._order[1] === 'second');
        return done();
      });
    });

    it('should extend a sync `beforeConstruct` method with an async version', function(done) {
      var moog = require('../index.js')({});

      moog.define('baseClass', {
        beforeConstruct: function(self, options) {
          self._order = (self._order || []).concat('second');
        }
      });

      moog.define('subClass', {
        extend: 'baseClass',
        beforeConstruct: function(self, options, callback) {
          self._order = (self._order || []).concat('first');
          return setImmediate(callback);
        }
      });

      moog.create('subClass', {}, function(err, subClass) {
        assert(!err);
        assert(subClass);
        assert(subClass._order[0] === 'first');
        assert(subClass._order[1] === 'second');
        return done();
      });
    });
  });

  describe('error handling', function() {

    // construct

    it('should handle an async error in `construct`', function(done) {
      var moog = require('../index.js')({});

      moog.define('failingClass', {
        construct: function(self, options, callback) {
          return callback(new Error('fail'));
        }
      });

      moog.create('failingClass', {}, function(err, failingClass) {
        assert(err);
        assert(err.message === 'fail');
        assert(!failingClass);
        return done();
      });
    });

    it('should handle a sync error in `construct`', function(done) {
      var moog = require('../index.js')({});

      moog.define('failingClass', {
        construct: function(self, options) {
          throw new Error('fail');
        }
      });

      moog.create('failingClass', {}, function(err, failingClass) {
        assert(err);
        assert(err.message === 'fail');
        assert(!failingClass);
        return done();
      });
    });

    // beforeConstruct

    it('should handle an async error in `beforeConstruct`', function(done) {
      var moog = require('../index.js')({});

      moog.define('failingClass', {
        beforeConstruct: function(self, options, callback) {
          return callback(new Error('fail'));
        }
      });

      moog.create('failingClass', {}, function(err, failingClass) {
        assert(err);
        assert(err.message === 'fail');
        assert(!failingClass);
        return done();
      });
    });

    it('should handle a sync error in `construct`', function(done) {
      var moog = require('../index.js')({});

      moog.define('failingClass', {
        beforeConstruct: function(self, options) {
          throw new Error('fail');
        }
      });

      moog.create('failingClass', {}, function(err, failingClass) {
        assert(err);
        assert(err.message === 'fail');
        assert(!failingClass);
        return done();
      });
    });

    // beforeConstruct

    it('should invoke afterConstruct with a mixture of sync and async', function(done) {
      var moog = require('../index.js')({});

      moog.define('baseClass', {
        construct: function(self, options) {
          self.monkeys = 3;
        },
        afterConstruct: function(self, callback) {
          self.monkeys = 5;
          return callback(null);
        }
      });

      moog.define('subClass', {
        extend: 'baseClass',
        construct: function(self, options) {
          self.monkeys = 4;
        },
        afterConstruct: function(self) {
          self.monkeys = 7;
        }
      });

      moog.create('subClass', {}, function(err, item) {
        assert(!err);
        assert(item);
        assert(item.monkeys === 7);
        return done();
      });
    });

    it('should invoke afterConstruct with sync only', function() {
      var moog = require('../index.js')({});

      moog.define('baseClass', {
        construct: function(self, options) {
          self.monkeys = 3;
        },
        afterConstruct: function(self) {
          self.monkeys = 5;
        }
      });

      moog.define('subClass', {
        extend: 'baseClass',
        construct: function(self, options) {
          self.monkeys = 4;
        },
        afterConstruct: function(self) {
          self.monkeys = 7;
        }
      });

      var item = moog.create('subClass', {});
      assert(item);
      assert(item.monkeys === 7);
    });

    it('should handle a sync error in `construct`', function(done) {
      var moog = require('../index.js')({});

      moog.define('failingClass', {
        beforeConstruct: function(self, options) {
          throw new Error('fail');
        }
      });

      moog.create('failingClass', {}, function(err, failingClass) {
        assert(err);
        assert(err.message === 'fail');
        assert(!failingClass);
        return done();
      });
    });

    // cyclical references

    it('should report an error on a cyclical reference (extend in a loop)', function(done) {
      var moog = require('../index.js')({});

      moog.define('classOne', {
        extend: 'classTwo'
      });

      moog.define('classTwo', {
        extend: 'classOne'
      });

      moog.create('classOne', {}, function(err, classOne) {
        assert(err);
        assert(!classOne);
        return done();
      });
    });

    // cyclical references

    it('should report an error synchronously on a cyclical reference (extend in a loop) when creating synchronously', function() {
      var moog = require('../index.js')({});

      moog.define('classOne', {
        extend: 'classTwo'
      });

      moog.define('classTwo', {
        extend: 'classOne'
      });

      var e;
      var classOne;
      try {
        classOne = moog.create('classOne', {});
      } catch (_e) {
        e = _e;
      }
      assert(e);
      assert(!classOne);
    });

    it('should allow synchronous creation of a class with no asynchronous beforeConstruct or construct methods', function() {
      var moog = require('../index.js')({});

      moog.define('baseclass', {
        color: 'blue',
        construct: function(self, options) {
          self._options = options;
        }
      });

      moog.define('subclass', {
        color: 'red',
        beforeConstruct: function(self, options) {
          options.color = 'purple';
        },
        extend: 'baseclass'
      });

      var obj = moog.create('subclass', {});
      assert(obj._options.color === 'purple');
    });

    it('should not allow synchronous creation of a class with asynchronous construct methods', function() {
      var moog = require('../index.js')({});

      moog.define('baseclass', {
        color: 'blue',
        construct: function(self, options, callback) {
          self._options = options;
          return setImmediate(callback);
        }
      });

      moog.define('subclass', {
        color: 'red',
        beforeConstruct: function(self, options) {
          options.color = 'purple';
        },
        extend: 'baseclass'
      });

      var errorReported = false;
      try {
        moog.create('subclass', {});
      } catch (e) {
        errorReported = true;
      }
      assert(errorReported);
    });

    it('should not allow synchronous creation of a class with asynchronous beforeConstruct methods', function() {
      var moog = require('../index.js')({});

      moog.define('baseclass', {
        color: 'blue',
        construct: function(self, options) {
          self._options = options;
        }
      });

      moog.define('subclass', {
        color: 'red',
        beforeConstruct: function(self, options, callback) {
          options.color = 'purple';
          return setImmediate(callback);
        },
        extend: 'baseclass'
      });

      var errorReported = false;
      try {
        moog.create('subclass', {});
      } catch (e) {
        errorReported = true;
      }
      assert(errorReported);
    });

    it('should not allow synchronous creation of a class with asynchronous afterConstruct methods', function() {
      var moog = require('../index.js')({});

      moog.define('baseclass', {
        color: 'blue',
        construct: function(self, options) {
          self._options = options;
        }
      });

      moog.define('subclass', {
        color: 'red',
        afterConstruct: function(self, callback) {
          return setImmediate(callback);
        },
        extend: 'baseclass'
      });

      var errorReported = false;
      try {
        moog.create('subclass', {});
      } catch (e) {
        errorReported = true;
      }
      assert(errorReported);
    });

    it('should report an error synchronously when creating a nonexistent type synchronously', function() {
      var moog = require('../index.js')({});
      var e;
      var result;
      try {
        result = moog.create('nonesuch');
      } catch (_e) {
        e = _e;
      }
      assert(e);
      assert(!result);
    });

    it('should report an error asynchronously when creating a nonexistent type asynchronously', function(done) {
      var moog = require('../index.js')({});
      moog.create('nonesuch', function(err, result) {
        assert(err);
        assert(!result);
        done();
      });
    });

    it('should allow the mirroring of a type hierarchy in a new instance of moog', function() {
      var moog1 = require('../index.js')({});
      var moog2 = require('../index.js')({});
      moog1.define('pieces', {});
      moog1.define('blog', { extend: 'pieces' });
      moog1.define('nifty-blog', { extend: 'blog' });
      var niftyBlog1 = moog1.create('nifty-blog');
      moog2.mirror(niftyBlog1.__meta);
      // now provide some actual code for the grandfather type
      // via implicit subclassing
      moog2.define('pieces', {
        age: 50,
        construct: function(self, options) {
          self.options = options;
        }
      });
      var niftyBlog2 = moog2.create('nifty-blog');
      assert(niftyBlog2.options);
      assert(niftyBlog2.options.age === 50);
    });

    it('should allow the suffixed mirroring of a type hierarchy in a new instance of moog', function() {
      var moog1 = require('../index.js')({});
      var moog2 = require('../index.js')({});
      moog1.define('pieces', {});
      moog1.define('blog', { extend: 'pieces' });
      moog1.define('nifty-blog', { extend: 'blog' });
      var niftyBlog1 = moog1.create('nifty-blog');
      moog2.mirror(niftyBlog1.__meta, '-manager');
      moog2.define('pieces-manager', {
        age: 50,
        construct: function(self, options) {
          self.options = options;
        }
      });
      var niftyBlogManager2 = moog2.create('nifty-blog-manager');
      assert(niftyBlogManager2.options);
      assert(niftyBlogManager2.options.age === 50);
    });

    it('mirror does not crush existing definitions', function() {
      var moog1 = require('../index.js')({});
      var moog2 = require('../index.js')({});
      moog1.define('pieces', {});
      moog1.define('blog', { extend: 'pieces' });
      moog1.define('nifty-blog', { extend: 'blog' });
      var niftyBlog1 = moog1.create('nifty-blog');

      // now provide some actual code for the father type
      // before calling mirror
      moog2.define('blog', {
        age: 50,
        construct: function(self, options) {
          self.options = options;
        }
      });

      moog2.mirror(niftyBlog1.__meta);
      var niftyBlog2 = moog2.create('nifty-blog');
      assert(niftyBlog2.options);
      assert(niftyBlog2.options.age === 50);
    });

    it('instanceOf should yield correct results', function() {
      var moog = require('../index.js')({});

      moog.define('classOne', {});

      moog.define('classTwo', {
        extend: 'classOne'
      });

      moog.define('classThree', {});

      moog.define('classFour', {
        extend: 'classTwo'
      });

      var one = moog.create('classOne');
      var two = moog.create('classTwo');
      var three = moog.create('classThree');
      var four = moog.create('classFour');
      var rando = { strange: 'object' };

      assert(moog.instanceOf(one, 'classOne'));
      assert(moog.instanceOf(two, 'classOne'));
      assert(!moog.instanceOf(three, 'classOne'));
      assert(moog.instanceOf(four, 'classOne'));
      assert(!moog.instanceOf(rando));
    });
  });
});
