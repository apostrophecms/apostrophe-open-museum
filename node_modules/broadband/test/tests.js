var assert = require('assert');
var broadband = require('../index.js');

// Mock mongodb

var data = [];
var i;
var errors = 0;
var maxI = 0;
for (i = 0; (i < 100); i++) {
  data[i] = { _id: i };
}

function Cursor() {
  var self = this;
  self.i = 0;
  self.nextObjectActive = false;
  self.nextObject = function(callback) {
    if (self.nextObjectActive) {
      throw 'nextObject called concurrently!';
    }
    self.nextObjectActive = true;
    if (self.i === self.failOn) {
      self.nextObjectActive = false;
      return setImmediate(function() {
        return callback('simulated error');
      });
    }
    if (self.i >= data.length) {
      return setImmediate(function() {
        self.nextObjectActive = false;
        return callback(null);
      });
    }
    var result = data[self.i++];
    // var err;
    // if ((i > (data.length / 2)) && (Math.random() < 0.01)) {
    //   err = 'error';
    //   errors++;
    // }
    return setTimeout(function() {
      self.nextObjectActive = false;
      return callback(null, result);
    }, Math.random() * 5);
  };
}

var collection = {
  find: function(criteria) {
    return new Cursor();
  }
};

describe('broadband', function() {
  var completions = 0;
  it('receives all results only once with random timing, never runs nextObject concurrently', function(done) {
    var seen = {};
    this.timeout(7000);

    var cursor = collection.find({});
    return broadband(cursor, 4, function(page, callback) {
      assert(page);
      assert(!seen[page._id]);
      seen[page._id] = true;
      return setTimeout(function() {
        return callback(null);
      }, Math.random() * 50);
    }, function(err) {
      completions++;
      assert(completions === 1);
      assert(!err);
      assert(Object.keys(seen).length === data.length);
      return done();
    });
  });
  it('handles an error on the 80th result gracefully', function(done) {
    var completions = 0;
    var limit = 4;
    var received = 0;
    var completed = 0;
    this.timeout(7000);

    var cursor = collection.find({});
    cursor.failOn = 80;
    var running = 0;
    var maxRunning = 0;
    return broadband(cursor, limit, function(page, callback) {
      received++;
      running++;
      if (running > maxRunning) {
        maxRunning = running;
      }
      return setTimeout(function() {
        running--;
        completed++;
        return callback(null);
      }, Math.random() * 50);
    }, function(err) {
      completions++;
      assert(completions === 1);
      assert(err);
      assert(received === cursor.failOn);
      assert((completed >= cursor.failOn) && (completed < cursor.failOn + limit));
      assert(maxRunning === limit);
      return done();
    });
  });
});
