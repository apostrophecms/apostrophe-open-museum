broadband
=========

<a href="https://apostrophecms.org/"><img src="https://raw.githubusercontent.com/boutell/broadband/master/logos/logo-box-madefor.png" align="right" /></a>

Given a MongoDB query cursor, process the results in parallel, up to the specified limit.

```javascript
var broadband = require('broadband');
var cursor = mongoCollection.find({});

return broadband(cursor, 8, function(doc, callback) {
  // Up to 8 of these will be invoked simultaneously
  // Do something with doc, then...
  return callback(null);
}, function(err) {
  // All done
});
```

## Why?

We wanted to work with MongoDB queries the way we work with [async.eachLimit](https://github.com/caolan/async#eachLimit), but without yanking everything into memory at once with `toArray`.

Specifically, we wanted to resize some images in parallel, rather than waiting to do them one at a time. We have a MongoDB collection with information about all of the images. But there are a lot of them, so we don't want to yank all of that information into memory up front.

`broadband` wraps MongoDB's `Cursor.nextObject` with a queueing mechanism that allows several results to be processed at once, but only up to the limit you specify. You don't run out of memory due to too many image processes, you don't wait too long, and you don't have to load the entire array into memory at once. Everybody gets a medal.

## What about errors?

If an error occurs, `broadband` will:

1. Stop starting new iterator callbacks.
2. Wait for any outstanding iterator callbacks to finish.
3. Invoke the final callback (its third argument) with the first error it received.

## Using broadband without mongodb

You can pass any object with a `nextObject` method as the "cursor." That method should invoke its callback with `(err, object)`. If there is no error, `object` should be the next object retrieved from your data source. If there are no more objects, pass `null` as `object`.

## About P'unk Avenue and Apostrophe

`broadband` was created at [P'unk Avenue](http://punkave.com) for use in many projects built with Apostrophe, an open-source content management system built on node.js. If you like `broadband` you should definitely [check out apostrophenow.org](http://apostrophenow.org).

## Support

Feel free to open issues on [github](http://github.com/punkave/broadband).

<a href="http://punkave.com/"><img src="https://raw.githubusercontent.com/boutell/broadband/master/logos/logo-box-builtby.png" /></a>

## Changelog

### CHANGES IN 1.0.0

Declared 1.0.0 stable as this has long been a component of Apostrophe. Updated lodash dependency to satisfy `npm audit`.

### CHANGES IN 0.1.1

Fixed a rare race condition which caused `broadband` to invoke its final callback more than once.

### CHANGES IN 0.1.0

Initial release. With shiny unit tests, of course.
