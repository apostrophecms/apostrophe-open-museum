var joinr = require('../index.js');
var assert = require("assert");
var extend = require('extend');
var _ = require('lodash');

// Test data. We don't need actual Mongo to thoroughly test this, we
// just need Mongo-like data and getters for it
var places = [
  {
    _id: 'south-street'
  },
  {
    _id: 'two-street'
  },
  {
    _id: 'punk-avenue'
  },
  {
    _id: 'broad-street'
  }
];

var events = [
  {
    _id: 'mummers-strut',
    placeId: 'broad-street'
  },
  {
    _id: 'mummers-afterparty',
    placeId: 'two-street'
  },
  {
    _id: 'broad-street-run',
    placeId: 'broad-street'
  },
  {
    _id: 'junto',
    placeId: 'punk-avenue'
  }
];

var groups = [
  {
    _id: 'admins'
  },
  {
    _id: 'marketing'
  },
  {
    _id: 'editors'
  }
];

var users = [
  {
    _id: 'jane',
    groupIds: [ 'admins' ],
    groupRelationships: {
      admins: {
        jobTitle: 'Computer Vizier'
      }
    }
  },
  {
    _id: 'joe',
    groupIds: [ 'marketing', 'editors' ],
    groupRelationships: {
      marketing: {
        jobTitle: 'Seller of the Things'
      },
      editors: {
        jobTitle: 'Prince of Documentia'
      }
    }
  },
  {
    _id: 'jack',
    groupIds: [ 'editors' ]
    // groupRelationships being missing should not cause a crash
  },
  {
    _id: 'jherek'
  }
];

var dotNotationUsers = [
  {
    _id: 'jane',
    settings: {
      groupIds: [ 'admins' ]
    }
  },
  {
    _id: 'joe',
    settings: {
      groupIds: [ 'marketing', 'editors' ]
    }
  },
  {
    _id: 'jack',
    settings: {
      groupIds: [ 'editors' ]
    }
  },
  {
    _id: 'jherek',
    settings: {
    }
  }
];

describe('joinr', function() {
  describe('byOne()', function() {
    var testEvents = [];
    // Copy the test data so we don't permanently modify it
    extend(true, testEvents, events);
    it('replies without error', function(callback) {
      return joinr.byOne(testEvents, 'placeId', '_place', function(ids, callback) {
        return setImmediate(function() {
          return callback(null, _.filter(places, function(place) {
            return _.includes(ids, place._id);
          }));
        });
      }, function(err) {
        assert(!err);
        return callback(null);
      });
    });
    it('returns the correct places for events', function() {
      var mummersStrut = _.find(testEvents, function(event) {
        return event._id === 'mummers-strut';
      });
      assert(mummersStrut);
      assert(mummersStrut._place._id === 'broad-street');
    });
  });
  describe('byOneReverse()', function() {
    var testPlaces = [];
    // Copy the test data so we don't permanently modify it
    extend(true, testPlaces, places);
    it('replies without error', function(callback) {
      return joinr.byOneReverse(testPlaces, 'placeId', '_events', function(ids, callback) {
        return setImmediate(function() {
          return callback(null, _.filter(events, function(event) {
            return _.includes(ids, event.placeId);
          }));
        });
      }, function(err) {
        assert(!err);
        return callback(null);
      });
    });
    it('returns the correct events for places', function() {
      var broadStreet = _.find(testPlaces, function(place) {
        return place._id === 'broad-street';
      });
      assert(broadStreet);
      assert(broadStreet._events);
      assert(broadStreet._events.length === 2);
      assert(_.find(broadStreet._events, function(event) {
        return event._id === 'broad-street-run';
      }));
      assert(_.find(broadStreet._events, function(event) {
        return event._id === 'mummers-strut';
      }));
    });
  });
  describe('byArray()', function() {
    var testUsers = [];
    // Copy the test data so we don't permanently modify it
    extend(true, testUsers, users);
    it('replies without error', function(callback) {
      return joinr.byArray(testUsers, 'groupIds', '_groups', function(ids, callback) {
        return setImmediate(function() {
          return callback(null, _.filter(groups, function(group) {
            return _.includes(ids, group._id);
          }));
        });
      }, function(err) {
        assert(!err);
        return callback(null);
      });
    });
    it('returns the correct groups for users', function() {
      var joe = _.find(testUsers, function(user) {
        return user._id === 'joe';
      });
      assert(joe);
      assert(joe._groups);
      assert(joe._groups.length === 2);
      assert(_.find(joe._groups, function(group) {
        return group._id === 'marketing';
      }));
      assert(_.find(joe._groups, function(group) {
        return group._id === 'editors';
      }));
    });
    it('replies without error when invoked with a relationshipsField', function(callback) {
      // Clean up from previous test
      _.each(testUsers, function(user) {
        delete user._groups;
      });
      return joinr.byArray(testUsers, 'groupIds', 'groupRelationships', '_groups', function(ids, callback) {
        return setImmediate(function() {
          return callback(null, _.filter(groups, function(group) {
            return _.includes(ids, group._id);
          }));
        });
      }, function(err) {
        assert(!err);
        return callback(null);
      });
    });
    it('returns the correct job titles per group for users', function() {
      var joe = _.find(testUsers, function(user) {
        return user._id === 'joe';
      });
      assert(joe);
      assert(joe._groups);
      assert(joe._groups.length === 2);
      assert(_.find(joe._groups, function(group) {
        return group.item._id === 'marketing';
      }));
      assert(_.find(joe._groups, function(group) {
        return group.item._id === 'editors';
      }));
      assert(_.find(joe._groups, function(group) {
        return group.relationship.jobTitle === 'Seller of the Things';
      }));
      assert(_.find(joe._groups, function(group) {
        return group.relationship.jobTitle === 'Prince of Documentia';
      }));
    });
  });
  describe('byArrayReverse()', function() {
    var testGroups = [];
    // Copy the test data so we don't permanently modify it
    extend(true, testGroups, groups);
    it('replies without error', function(callback) {
      return joinr.byArrayReverse(testGroups, 'groupIds', '_users', function(ids, callback) {
        return setImmediate(function() {
          return callback(null, _.filter(users, function(user) {
            return !!_.intersection(user.groupIds, ids).length;
          }));
        });
      }, function(err) {
        assert(!err);
        return callback(null);
      });
    });
    it('returns the correct users for groups', function() {
      var editors = _.find(testGroups, function(group) {
        return group._id === 'editors';
      });
      assert(editors);
      assert(editors._users);
      assert(editors._users.length === 2);
      assert(_.find(editors._users, function(user) {
        return user._id === 'joe';
      }));
      assert(_.find(editors._users, function(user) {
        return user._id === 'jack';
      }));
    });
    it('replies without error when invoked with a relationships field', function(callback) {
      // Clean up from previous test
      _.each(testGroups, function(group) {
        delete group._users;
      });
      return joinr.byArrayReverse(testGroups, 'groupIds', 'groupRelationships', '_users', function(ids, callback) {
        return setImmediate(function() {
          return callback(null, _.filter(users, function(user) {
            return !!_.intersection(user.groupIds, ids).length;
          }));
        });
      }, function(err) {
        assert(!err);
        return callback(null);
      });
    });
    it('returns the correct job titles per user for a group', function() {
      var editors = _.find(testGroups, function(group) {
        return group._id === 'editors';
      });
      assert(editors);
      assert(editors._users);
      assert(editors._users.length === 2);
      assert(_.find(editors._users, function(user) {
        return user.item._id === 'joe';
      }));
      assert(_.find(editors._users, function(user) {
        return user.item._id === 'jack';
      }));
      assert(_.find(editors._users, function(user) {
        return (user.item._id === 'joe') && (user.relationship.jobTitle === 'Prince of Documentia');
      }));
      assert(_.find(editors._users, function(user) {
        // This should not crash, because an empty relationship object should
        // always be supplied if the group does not appear in groupRelationships
        return user.relationship.jobTitle === undefined;
      }));
    });
  });
  describe('byArrayReverse() with dot notation', function() {
    var testGroups = [];
    // Copy the test data so we don't permanently modify it
    extend(true, testGroups, groups);
    it('replies without error', function(callback) {
      return joinr.byArrayReverse(testGroups, 'settings.groupIds', '_users', function(ids, callback) {
        return setImmediate(function() {
          return callback(null, _.filter(dotNotationUsers, function(user) {
            return !!_.intersection(user.settings.groupIds, ids).length;
          }));
        });
      }, function(err) {
        assert(!err);
        return callback(null);
      });
    });
    it('returns the correct users for groups', function() {
      var editors = _.find(testGroups, function(group) {
        return group._id === 'editors';
      });
      assert(editors);
      assert(editors._users);
      assert(editors._users.length === 2);
      assert(_.find(editors._users, function(user) {
        return user._id === 'joe';
      }));
      assert(_.find(editors._users, function(user) {
        return user._id === 'jack';
      }));
    });
  });
});
