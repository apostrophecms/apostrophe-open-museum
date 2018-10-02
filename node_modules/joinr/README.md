# joinr

<a href="http://apostrophenow.org/"><img src="https://raw.github.com/punkave/joinr/master/logos/logo-box-madefor.png" align="right" /></a>

`joinr` makes it easy to fetch related documents when working with MongoDB collections, or documents in a similar database.

`joinr` allows joins to be performed via IDs stored in a regular property (`byOne`) or in an array property (`byArray`). Joins can be performed when the ID of the related document is in the document you already have (`byOne` or `byArray`) and also when the related documents contain the IDs of documents you already have (`byOneReverse` and `byArrayReverse`).

`joinr` can also fetch information about the relationship between two objects. For instance, if each person can work for several departments and must have a separate job title in each department, `joinr` can handle that without the need for a third MongoDB collection.

`joinr` emphasizes performance. Fetch the relevant documents first; that gives you a chance to `limit` the results. Then use `joinr` to fetch related documents with a single MongoDB query. If the same object is related to several other objects, they will all refer to the same copy to save memory.

## Installation

    npm install joinr

Tip: we recommend `--save` so that `joinr` is automatically added to your `package.json`.

## Quick Example

    var joinr = require('joinr');

    // Fetch events, then join them with places
    eventsCollection.find({ ... }, function(err, events) {
      joinr.byOne(events, 'placeId', '_place', function(ids, callback) {
        return eventsCollection.find({ _id: { $in: ids } }).toArray(callback);
      }, function(err) {
        // Do something with your events now that they have their
        // related place in a ._place property
      }
    });

## Requirements

Technically, none. Typically you'll want to use it with MongoDB. `joinr` assumes that objects have an `_id` property.

## API

### joinr.byOne

Performs a one-to-one join with related documents, based on an ID stored in the documents you already have.

If you have events and wish to bring a place object into a `._place` property
of each event based on a `.placeId` property of each event, this is what you want.

The first argument should be an array of documents already fetched.

The second argument is the property in each of those documents that identifies
a related document (for instance, `placeId`).

The third argument is the property name in which to store the related
document after fetching it (for instance, `_place`).

The fourth argument is the function to call to fetch the related documents.
This function will receive an array of IDs and a callback.

The fifth argument is the callback, which will receive an error if any.
The related documents will be attached directly to `items` under the
property name `objectField`, so there is no need to return values.

#### Example

    joinr.byOne(events, 'placeId', '_place', function(ids, callback) {
      return placesCollection.find({ _id: { $in: ids } }, callback);
    }, callback);

### joinr.byOneReverse

Join with related documents where the id of documents in your collection
is stored in a property of the related documents. Since more than one related
document might refer to each of your documents, the results will be stored in
an array property of each of your documents.

If you have places and wish to retrieve all the events which have a
`placeId` property referring to those places, this is what you want.

The first argument should be an array of documents already fetched.

The second argument is the property in each of the related documents
that identifies documents in your original collection (for instance, `placeId`).

The third argument is the array property name in which to store the related
documents after fetching them (for instance, `_events`).

The fourth argument is the function to call to fetch the related documents.
This function will receive an array of IDs and a callback. These IDs refer
to documents in your original collection.

The fifth argument is the callback, which will receive an error if any.
The related documents will be attached directly to `items` under the
property name `objectField`, so there is no need to return values.

#### Example

    joinr.byOneReverse(places, 'placeId', '_place', function(ids, callback) {
      return eventsCollection.find({ placeId: { $in: ids } }).toArray(callback);
    }, callback);

### joinr.byArray

Perform a one-to-many join with related documents via an array property
of your documents.

If you have users and wish to bring all associated groups into a
`._groups` property based on a `.groupIds` array property, this is what
you want.

The first argument should be an array of documents already fetched.

The second argument is the array property in each of those documents that
identifies related documents (for instance, `groupIds`).

The optional third argument is the name of an object property in each of
those documents that describes the relationship between the document and each
of the related documents. This object is expected to be structured like this:

    personRelationships: {
      idOfPerson1: {
        jobTitle: 'Chief Cook'
      },
      idOfPerson2: {
        jobTitle: 'Chief Bottle Washer'
      }
    }

The fourth argument is the array property name in which to store the related
documents after fetching them (for instance, `_groups`).

The fifth argument is the function to call to fetch the related documents.
This function will receive an array of IDs and a callback. This function should invoke its callback with an error, if any, and if no error, an array of retrieved documents.

The final argument is the main callback, which will receive an error if any.
The related documents will be attached directly to the items under the
property name specified by objectsField, so there is no need to return values.

*If the relationshipsField argument is present*, then the related documents are
not attached directly in the array property. Instead each entry of the array
is an object with two properties, `item` and `relationship`. The `item`
property points to the actual object, and the `relationship` property points
to the relationship data for that object. For instance:

person._groups[0].item.name <-- Group's name
person._groups[0].relationship.jobTitle <-- Person's job title in
  this specific department; they may have other titles in other departments

The main callback receives an error object if any.

#### Example

    joinr.byArray(users, 'groupIds', '_groups', function(ids, callback) {
      return groupsCollection.find({ _id: { $in: ids } }).toArray(callback);
    }, callback);

Or:

    joinr.byArray(users, 'groupIds', 'groupRelationships', '_groups', function(ids, callback) {
      return groupsCollection.find({ _id: { $in: ids } }).toArray(callback);
    }, callback);

### joinr.byArrayReverse

Performs a one-to-many join with related documents via an array property
of the related documents.

If you have groups and wish to bring all associated users into a
`._users` property based on a `.groupIds` array property of those users,
this is what you want.

The first argument should be an array of documents already fetched.

The second argument is the array property in each of the related documents
that identifies documents in your original collection (for instance,
`groupIds`).

The optional third argument is the name of an object property in each of
those documents that describes the relationship between the document and each
of the related documents. This object is expected to be structured like this:

    personRelationships: {
      idOfPerson1: {
        jobTitle: 'Chief Cook'
      },
      idOfPerson2: {
        jobTitle: 'Chief Bottle Washer'
      }
    }

The fourth argument is the array property name in which to store the related
documents after fetching them (for instance, `_users`).

The fifth argument is the function to call to fetch the related documents.
This function will receive an array of IDs referring to documents in
your original collection, and a callback. This function should invoke its callback with an error if any, and if no error, an array of retrieved documents.

The sixth argument is the main callback, which will receive an error if any.
The related documents will be attached directly to the items under the
property name specified by objectsField, so there is no need to return values.

The main callback receives an error, if any.

#### Example

    joinr.byArrayReverse(groups, 'groupIds', '_users', function(ids, callback) {
      return usersCollection.find({ placeIds: { $in: ids } }).toArray(callback);
    }, callback);

## Accessing Nested Properties With Dot Notation

If you have departments and the IDs of the people are stored in a nested property, like this:

    {
      name: 'Chemistry',
      settings: {
        personIds: [ 5, 7, 9 ]
      }
    }

Then you may use that property with joinr by writing this:

    joinr.byArray(departments, 'settings.personIds', 'people', function(ids, callback) {
      return peopleCollection.find({ _id: { $in: ids } }).toArray(callback);
    }, callback);

Note the use of `settings.personIds`.

You may nest properties as deeply as desired.

You may also pass a function that returns the desired property of any object passed to it.

This feature is available for the `idField`, `idsField` and `relationshipsField` options only. It is not currently possible to store the results in a nested property. Of course you could easily move them there after using `joinr`.

This syntax is identical to that supported by MongoDB for the same purpose.

## Changelog

Version 1.0.2 updates `lodash` to version 4 and `mocha` to version 5 to satisfy `npm audit`.

Version 1.0.1 corrects an error in the documentation examples. No code changes.

Version 1.0.0 has no feature changes; it's been stable a long time, so we declared it so. Examples in the documentation now correctly invoke toArray().

Versions 0.1.4 through 0.1.6 switched over from underscore to lodash.

Version 0.1.3 throws a meaningful error rather than a confusing one if `undefined` is passed for `idField` or `idsField` (most likely to happen because that property was left out when configuring an Apostrophe site).

Version 0.1.2 of `joinr` added support for relationship properties via the `relationshipsField` option to `joinByArray` and `joinByArrayReverse`. This allows, for instance, employees to have separate job titles in each of the departments they are associated with.
Version 0.1.1 of `joinr` added support for dot notation when specifying `idField` and `idsField`.

## About P'unk Avenue and Apostrophe

`joinr` was created at [P'unk Avenue](http://punkave.com) for use in Apostrophe, an open-source content management system built on node.js. If you like `joinr` you should definitely [check out apostrophenow.org](http://apostrophenow.org). Also be sure to visit us on [github](http://github.com/punkave).

## Support

Feel free to open issues on [github](http://github.com/punkave/joinr).

<a href="http://punkave.com/"><img src="https://raw.github.com/punkave/joinr/master/logos/logo-box-builtby.png" /></a>

