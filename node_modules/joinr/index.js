var _ = require('lodash');

var joinr = module.exports = {
  // Perform a one-to-one join with related documents.
  //
  // If you have events and wish to bring a place object into a ._place property
  // of each event based on a .placeId property, this is what you want.
  //
  // The first argument should be an array of documents already fetched.
  //
  // The second argument is the property in each of those documents that identifies
  // a related document (for instance, placeId).
  //
  // The third argument is the property name in which to store the related
  // document after fetching it (for instance, _place).
  //
  // The fourth argument is the function to call to fetch the related documents.
  // This function will receive an array of IDs and a callback.
  //
  // The fifth argument is the callback, which will receive an error if any.
  // The related documents will be attached directly to `items` under the
  // property name `objectField`, so there is no need to return values.
  //
  // Example:
  //
  // joinr.oneToOne(items, 'placeId', '_place', function(ids, callback) {
  //   return myCollection.find({ _id: { $in: ids } }, callback);
  // }, callback);

  byOne: function(items, idField, objectField, getter, callback) {
    var otherIds = [];
    var othersById = {};
    _.each(items, function(item) {
      if (joinr._has(item, idField)) {
        otherIds.push(joinr._get(item, idField));
      }
    });
    if (otherIds.length) {
      return getter(otherIds, function(err, others) {
        if (err) {
          return callback(err);
        }
        // Make a lookup table of the others by id
        _.each(others, function(other) {
          othersById[other._id] = other;
        });
        // Attach the others to the items
        _.each(items, function(item) {
          var id = joinr._get(item, idField);
          if (id && othersById[id]) {
            item[objectField] = othersById[id];
          }
        });
        return callback(null);
      });
    } else {
      return callback(null);
    }
  },

  // Join with related documents where the id of documents in your collection
  // is stored in a property on the related side. Since more than one related
  // document might refer to each of your documents, the result is stored in
  // an array property of each document.
  //
  // If you have places and wish to retrieve all the events which have a
  // placeId property referring to those places, this is what you want.
  //
  // The first argument should be an array of documents already fetched.
  //
  // The second argument is the property in each of the related documents
  // that identifies documents in your original collection (for instance, placeId).
  //
  // The third argument is the array property name in which to store the related
  // documents after fetching them (for instance, _events).
  //
  // The fourth argument is the function to call to fetch the related documents.
  // This function will receive an array of IDs and a callback. These IDs refer
  // to documents in your original collection.
  //
  // The fifth argument is the callback, which will receive an error if any.
  // The related documents will be attached directly to `items` under the
  // property name `objectField`, so there is no need to return values.
  //
  // Example:
  //
  // joinr.byOneReverse(items, 'placeId', '_place', function(ids, callback) {
  //   return myCollection.find({ placeId: { $in: ids } }, callback);
  // }, callback);

  byOneReverse: function(items, idField, objectsField, getter, callback) {
    var itemIds = _.map(items, '_id');
    if (itemIds.length) {
      return getter(itemIds, function(err, others) {
        if (err) {
          return callback(err);
        }

        var itemsById = {};
        _.each(items, function (item) {
          itemsById[item._id] = item;
        });
        // Attach the others to the items
        _.each(others, function(other) {
          if (joinr._has(other, idField)) {
            var id = joinr._get(other, idField);
            if (itemsById[id]) {
              var item = itemsById[id];
              if (!item[objectsField]) {
                item[objectsField] = [];
              }
              item[objectsField].push(other);
            }
          }
        });
        return callback(null);
      });
    } else {
      return callback(null);
    }
  },

  // Perform a one-to-many join with related documents via an array property
  // of your documents.
  //
  // If you have users and wish to bring all associated groups into a
  // ._groups property based on a .groupIds array property, this is what
  // you want.
  //
  // The first argument should be an array of documents already fetched.
  //
  // The second argument is the name of an array property in each of those documents
  // that identifies related documents by id (for instance, groupIds).
  //
  // The optional third argument is the name of an object property in each of
  // those documents that describes the relationship between the document and each
  // of the related documents. This object is expected to be structured like this:
  //
  // personRelationships: {
  //   idOfPerson1: {
  //     jobTitle: 'Chief Cook'
  //   },
  //   idOfPerson2: {
  //     jobTitle: 'Chief Bottle Washer'
  //   }
  // }
  //
  // The fourth argument is the array property name in which to store the related
  // documents after fetching them (for instance, _groups).
  //
  // The fifth argument is the function to call to fetch the related documents.
  // This function will receive an array of IDs and a callback.
  //
  // The sixth argument is the callback, which will receive an error if any.
  // The related documents will be attached directly to the items under the
  // array property name specified by objectsField, so there is no need to return
  // values.
  //
  // *If the relationshipsField argument is present*, then the related documents are
  // not attached directly in the array property. Instead each entry of the array
  // is an object with two properties, `item` and `relationship`. The `item`
  // property points to the actual object, and the `relationship` property points
  // to the relationship data for that object. For instance:
  //
  // group._people[0].item.name <-- Person's name
  // group._people[0].relationship.jobTitle <-- Person's job title in
  //   this specific department; they may have other titles in other departments
  //
  // The callback receives an error object if any.
  //
  // Example:
  //
  // joinr.byArray(users, 'groupIds', '_groups', function(ids, callback) {
  //   return groupsCollection.find({ groupIds: { $in: ids } }, callback);
  // }, callback);

  byArray: function(items, idsField, relationshipsField, objectsField, getter, callback) {
    if (arguments.length === 5) {
      // Allow relationshipsField to be skipped
      callback = getter;
      getter = objectsField;
      objectsField = relationshipsField;
      relationshipsField = undefined;
    }
    var otherIds = [];
    var othersById = {};
    _.each(items, function(item) {
      if (joinr._has(item, idsField)) {
        otherIds = otherIds.concat(joinr._get(item, idsField));
      }
    });
    if (otherIds.length) {
      return getter(otherIds, function(err, others) {
        if (err) {
          return callback(err);
        }
        // Make a lookup table of the others by id
        _.each(others, function(other) {
          othersById[other._id] = other;
        });
        // Attach the others to the items
        _.each(items, function(item) {
          _.each(joinr._get(item, idsField) || [], function(id) {
            if (othersById[id]) {
              if (!item[objectsField]) {
                item[objectsField] = [];
              }
              if (relationshipsField) {
                var relationships = joinr._get(item, relationshipsField) || {};
                item[objectsField].push({
                  item: othersById[id],
                  relationship: relationships[id] || {}
                });
              } else {
                item[objectsField].push(othersById[id]);
              }
            }
          });
        });
        return callback(null);
      });
    } else {
      return callback(null);
    }
  },

  // Perform a one-to-many join with related documents via an array property
  // of the related documents.
  //
  // If you have groups and wish to bring all associated users into a
  // ._users property based on a .groupIds array property of those users,
  // this is what you want.
  //
  // The first argument should be an array of documents already fetched.
  //
  // The second argument is the array property in each of the related documents
  // that identifies documents in your original collection (for instance,
  // groupIds).
  //
  // The optional third argument is the name of an object property in each of
  // thoe related documents that describes the relationship between the related
  // document and each of your documents. This object is expected to be structured
  // like this:
  //
  // personRelationships: {
  //   idOfPerson1: {
  //     jobTitle: 'Chief Cook'
  //   },
  //   idOfPerson2: {
  //     jobTitle: 'Chief Bottle Washer'
  //   }
  // }
  //
  // The fourth argument is the array property name in which to store the related
  // documents after fetching them (for instance, _users).
  //
  // The fifth argument is the function to call to fetch the related documents.
  // This function will receive an array of IDs referring to documents in
  // your original collection, and a callback.
  //
  // The sixth argument is the callback, which will receive an error if any.
  // The related documents will be attached directly to the items under the
  // property name specified by objectsField, so there is no need to return values.
  //
  // *If the relationshipsField argument is present*, then the related documents are
  // not attached directly in the array property. Instead each entry of the array
  // is an object with two properties, `item` and `relationship`. The `item`
  // property points to the actual object, and the `relationship` property points
  // to the relationship data for that object. For instance:
  //
  // group._people[0].item.name <-- Person's name
  // group._people[0].relationship.jobTitle <-- Person's job title in
  //   this specific department; they may have other titles in other departments
  //
  // The callback receives an error object if any.
  //
  // Example:
  //
  // joinr.byArrayReverse(groups, 'groupIds', '_users', function(ids, callback) {
  //   return usersCollection.find({ placeIds: { $in: ids } }, callback);
  // }, callback);

  byArrayReverse: function(items, idsField, relationshipsField, objectsField, getter, callback) {
    if (arguments.length === 5) {
      // Allow relationshipsField to be skipped
      callback = getter;
      getter = objectsField;
      objectsField = relationshipsField;
      relationshipsField = undefined;
    }
    var itemIds = _.map(items, '_id');
    if (itemIds.length) {
      return getter(itemIds, function(err, others) {
        if (err) {
          return callback(err);
        }

        var itemsById = {};
        _.each(items, function (item) {
          itemsById[item._id] = item;
        });
        // Attach the others to the items
        _.each(others, function(other) {
          _.each(joinr._get(other, idsField) || [], function(id) {
            if (itemsById[id]) {
              var item = itemsById[id];
              if (!item[objectsField]) {
                item[objectsField] = [];
              }
              if (relationshipsField) {
                var relationships = joinr._get(other, relationshipsField) || {};
                item[objectsField].push({
                  item: other,
                  relationship: relationships[item._id] || {}
                });
              } else {
                item[objectsField].push(other);
              }
            }
          });
        });
        return callback(null);
      });
    } else {
      return callback(null);
    }
  },

  _has: function(o, accessor) {
    if (accessor === undefined) {
      throw new Error('I think you forgot to set idField or idsField, or you set the wrong one (use idField for byOne, idsField for byArray)');
    }
    return !!joinr._get(o, accessor);
  },

  // This supports: foo, foo.bar, foo.bar.baz (dot notation,
  // like mongodb) and also passing in a custom accessor function

  _get: function(o, accessor) {
    if (accessor === undefined) {
      throw new Error('I think you forgot to set idField or idsField, or you set the wrong one (use idField for byOne, idsField for byArray)');
    }
    var fn = accessor;
    if (typeof(accessor) === 'string') {
      fn = function(o) {
        var keys = accessor.split(/\./);
        _.each(keys, function(key) {
          o = o[key];
        });
        return o;
      };
    }
    return fn(o);
  }
};

