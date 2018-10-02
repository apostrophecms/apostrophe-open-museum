[![Build Status](https://travis-ci.org/punkave/launder.svg?branch=master)](https://travis-ci.org/punkave/launder)

<a href="https://apostrophecms.org/"><img src="https://raw.github.com/punkave/launder/master/logos/logo-box-madefor.png" align="right" /></a>

A sanitization module for the people. Built for use in the [Apostrophe CMS](https://apostrophecms.org), useful for many other things.

## Purpose

Launder can be used to sanitize strings, integers, floats, urls, and more. It's best for cases where you've already used front-end validation to encourage smart input, and now you want to make sure your inputs are reasonable.

Launder does not always assume your data is a string, which makes it highly compatible with the use of JSON to deliver data from browser to server. For instance, `launder.boolean` accepts the actual JavaScript values `true` and `false` as well as various string representations.

Launder's support for dates and times permits users to enter both in colloquial formats like `8/25` or `3pm` and "just does the right thing," converting to `2015-08-25` and `15:00:00` respectively.

In addition to sanitization methods, Launder does contain a few other tools, such as `formatDate` and `formatTime` which simply output a Date object in the `2015-08-25` and `15:00:00` formats.

## Usage

```javascript
var launder = require('launder')();

app.post('/form', function(req, res) {
  var units = launder.integer(req.body.units, 0, 0, 100);
  var birthdate = launder.date(req.body.birthdate);
});
```

You can also specify global options:

```javascript
var launder = require('launder')({
  filterTag: function(tag) { return tag.toLowerCase(); }
});
```

## Frequently used methods

### `launder.string(s, def)`

Converts `s` to a string. `s` is coerced to a string, then leading and trailing whitespace is trimmed. If `def` is provided, it is returned when the string is empty or the value passed is not a string. If `def` is undefined, empty strings are left alone, and values that are not strings become empty strings.

### `launder.strings(arr)`

If `arr` is an array, each element is sanitized with `launder.string`, and a new array containing the result is returned. If `arr` is not an array, an empty array is returned.

### `launder.integer(i, def, min, max)`

Converts `i` to an integer. `i` is first coerced to an integer, if needed; if it is an empty string, undefined or otherwise not convertible, `def` is returned. If `min` is provided, and the result would be less than `min`, `min` is returned. If `max` is provided, and the result would be greater than `max`, `max` is returned. If `def` is not provided, the default is `0`. If a number has a fractional part it is discarded, not rounded.

### `launder.float(f, def, min, max)`

Converts `f` to a floating-point number. `f` is first coerced to a floating-point number, if needed; if it is an empty string, undefined or otherwise not convertible, `def` is returned. If `min` is provided, and the result would be less than `min`, `min` is returned. If `max` is provided, and the result would be greater than `max`, `max` is returned. If `def` is not provided, the default is `0`.

### `launder.url(s, def)`

Attempts to ensure that `s` is a valid URL. This method allows only the `http:`, `https:`, `ftp:` and `mailto:` URL schemes, but does allow relative URLs, and attempts to automatically fix common user mistakes such as typing:

```
www.mycompany.com
```

Or:

```
www.mycompany.com/my/page.html
```

... Without supplying the `http:`.

`s` is first sanitized with `launder.string()`.

`def` is returned if the input is an empty string, not convertible to a URL, or suspicious (such as a `javascript:` URL). Spaces are removed as they are ignored by browsers in a surprising number of situations.

### `launder.select(choice, choices, def)`

Sanitize a choice made via a `select` element. If `choice` is one of the `choices`, it is returned, otherwise `def` is returned. If `choices` is an array of objects, then `choice` is compared to the `value` property of each object to find a match.

### `launder.boolean(b, def)`

Sanitize a boolean value.

If the value is any of the following, `true` is returned:

`true`
`'true'`
`'True'`
`'t'`
`'yes'`
`'Yes'`
`'y'`
`'1'`
*Any other string starting with `t`, `y`, `T`, `Y`, or `1`)*
`1`

Note that both the string `'1'` and the number `1` are accepted.

If `b` is not `true` or `false`, and `launder.string(b)` returns the empty string, then `false` is returned unless `def` is defined, in which case `def` is returned.

### `launder.date(d, def, now)`

Converts `d` to a date string in `YYYY-MM-DD` format, such as `2015-02-20`.

`d` must be either a string or a `Date` object, otherwise `def` is returned. *If `def` is undefined, the current date is returned.*

`now` can be the current date object for resolving ambiguous dates. If it is not provided, a new `Date` object is created.

The following date string formats are supported:

`YYYY-MM-DD`
`MM/DD/YYYY`
`MM/DD/YY` (*)
`MM/DD` (implies current year)

(*) Implies the current century, unless the result would be more than 50 years in the future, in which case it implies the previous century. This works well for the popular usage of two-digit years. If it bothers you, use four-digit years!

### `launder.time(t, def)`

Converts `t` to a time string in `HH:MM:SS` format, such as `16:30:00`.

The following formats are accepted:

`16:30:00`
`16:30`
`16`
`1pm`
`2:37am`
`2:37:12am`
`2PM` (case insensitive, in general)
`2p` (`m` is optional)
`2 pm` (spaces don't matter)
`4:30a`

If `launder.string(t)` returns the empty string, `def` is returned. *If `def` is not provided, the current time is returned.*

### `launder.tags(arr, filter)`

Sanitize an array of tags. All strings and numbers in the supplied array are passed through `launder.string`, then through `filter`. If `filter` is not passed, the `filterTag` function provided as an option when configuring `launder` is used. If that option is not passed, the default `filterTag` function is used.

The default `filterTag` function trims whitespace and converts to lowercase.

Any elements which have been laundered to the empty string are discarded.

### `launder.id(s, def)`

Sanitize an ID. For our purposes an ID is made up of the characters `A-Z`, `a-z`, `0-9` and `_`. An ID may begin with any of these characters. An ID must contain at least one character. `launder.string` is first used to coerce `s` to a string.

If any of these criteria are not met, `def` is returned.

### `launder.ids(ids)`

Sanitize an array of IDs. Each element is passed through `launder.id`. Any IDs that do not meet the criteria are omitted from the returned array.

## Miscellaneous methods

We use these a lot in Apostrophe, but they might not feel as relevant for other applications. Use them if you wish!

### `launder.addBooleanFilterCriteria(options, name, criteria, def)`

Use a tri-state filter value such as `'true'`, `'false'`, or `'any'` to build a MongoDB-style query criteria object.

`options[name]` should be a string such as `'true'`, `'false'` or `'any'`.

`criteria[name]` will then be set to `true`, `{ $ne: true }`, or left entirely unset.

Any value accepted by `launder.boolean` is acceptable to specify `true` and `false`. Also, `null` is accepted as a synonym for `'any'`.

If `def` is not specified, the default behavior is `any`.

### `launder.formatDate(date)`

Output the given `Date` object in `YYYY-MM-DD` format. This is the canonical date format for Apostrophe.

### `launder.formatTime(date)`

Output the given `Date` object in `HH:mm:ss` format. This is the canonical time format for Apostrophe.

### `launder.padInteger(i, places)`

Pads the specified integer with leading zeroes to ensure it has at least `places` digits and returns the resulting string.

## Changelog

1.0.1: `launder.time` will now also accept a `.` (dot) as the separator (until now only `:` colon was recognized). Thanks to Lars Houmark.

1.0.0: switched to a maintained, secure fork of lodash 3, declared 1.0.0 as this has been a stable part of Apostrophe for years.

0.1.3: `launder.booleanOrNull` broken out from `launder.addBooleanFilterCriteria` so that you can get the tri-state value without modifying a criteria object.

0.1.2: `launder.tags` also accepts a comma-separated string.

0.1.1: removed never-used and undocumented `parseTime` method.

0.1.0: initial release. Based on stable code recently refactored from Apostrophe 0.5.x.

## About P'unk Avenue and Apostrophe

`launder` was created at [P'unk Avenue](http://punkave.com) for use in Apostrophe, an open-source content management system built on node.js. If you like `launder` you should definitely [check out apostrophenow.org](http://apostrophenow.org). Also be sure to visit us on [github](http://github.com/punkave).

## Support

Feel free to open issues on [github](http://github.com/punkave/launder).

<a href="http://punkave.com/"><img src="https://raw.github.com/punkave/launder/master/logos/logo-box-builtby.png" /></a>
