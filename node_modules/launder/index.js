var _ = require('@sailshq/lodash');
var moment = require('moment');

function Launder(options) {
  var self = this;
  self.options = options || {};

  self.filterTag = self.options.filterTag || function(tag) {
    tag = tag.trim();
    return tag.toLowerCase();
  };

  self.string = function(s, def) {
    if (typeof(s) !== 'string') {
      if ((typeof(s) === 'number') || (typeof(s) === 'boolean')) {
        s += '';
      } else {
        s = '';
      }
    }
    s = s.trim();
    if (def !== undefined) {
      if (s === '') {
        s = def;
      }
    }
    return s;
  };

  self.strings = function(strings) {
    if (!Array.isArray(strings)) {
      return [];
    }
    return _.map(strings, function(s) {
      return self.string(s);
    });
  };

  self.integer = function(i, def, min, max) {
    if (def === undefined) {
      def = 0;
    }
    if (typeof(i) === 'number') {
      i = Math.floor(i);
    }
    else
    {
      try {
        i = parseInt(i, 10);
        if (isNaN(i)) {
          i = def;
        }
      } catch (e) {
        i = def;
      }
    }
    if ((typeof(min) === 'number') && (i < min)) {
      i = min;
    }
    if ((typeof(max) === 'number') && (i > max)) {
      i = max;
    }
    return i;
  };

  self.padInteger = function(i, places) {
    var s = i + '';
    while (s.length < places) {
      s = '0' + s;
    }
    return s;
  };

  self.float = function(i, def, min, max) {
    if (def === undefined) {
      def = 0;
    }
    if (!(typeof(i) === 'number')) {
      try {
        i = parseFloat(i, 10);
        if (isNaN(i)) {
          i = def;
        }
      } catch (e) {
        i = def;
      }
    }
    if ((typeof(min) === 'number') && (i < min)) {
      i = min;
    }
    if ((typeof(max) === 'number') && (i > max)) {
      i = max;
    }
    return i;
  };


  self.url = function(s, def) {
    s = self.string(s, def);
    // Allow the default to be undefined, null, false, etc.
    if (s === def) {
      return s;
    }
    s = fixUrl(s);
    if (s === null) {
      return def;
    }
    s = naughtyHref(s);
    if (s === true) {
      return def;
    }
    return s;


    function fixUrl(href) {
      if (href.match(/^(((https?|ftp)\:\/\/)|mailto\:|\#|([^\/\.]+)?\/|[^\/\.]+$)/)) {
        // All good - no change required
        return href;
      } else if (href.match(/^[^\/\.]+\.[^\/\.]+/)) {
        // Smells like a domain name. Educated guess: they left off http://
        return 'http://' + href;
      } else {
        return null;
      }
    };

    function naughtyHref(href) {
      // Browsers ignore character codes of 32 (space) and below in a surprising
      // number of situations. Start reading here:
      // https://www.owasp.org/index.php/XSS_Filter_Evasion_Cheat_Sheet#Embedded_tab
      href = href.replace(/[\x00-\x20]+/g, '');
      // Clobber any comments in URLs, which the browser might
      // interpret inside an XML data island, allowing
      // a javascript: URL to be snuck through
      href = href.replace(/<\!\-\-.*?\-\-\>/g, '');
      // Case insensitive so we don't get faked out by JAVASCRIPT #1
      var matches = href.match(/^([a-zA-Z]+)\:/);
      if (!matches) {
        // No scheme = no way to inject js (right?)
        return href;
      }
      var scheme = matches[1].toLowerCase();
      return (!_.contains([ 'http', 'https', 'ftp', 'mailto' ], scheme)) ? true : href;
    }
  };

  self.select = function(s, choices, def) {
    s = self.string(s);
    if (!choices || !choices.length) {
      return def;
    }
    if (typeof(choices[0]) === 'object') {
      if (_.find(choices, function(choice) {
        return choice.value === s;
      }) !== undefined) {
        return s;
      }
      return def;
    }
    if (!_.contains(choices, s)) {
      return def;
    }
    return s;
  };

  self.boolean = function(b, def) {
    if (b === true) {
      return true;
    }
    if (b === false) {
      return false;
    }
    b = self.string(b, def);
    if (b === def) {
      if (b === undefined) {
        return false;
      }
      return b;
    }
    b = b.toLowerCase().charAt(0);
    if ((b === '') || (b === 'n') || (b === '0') || (b === 'f')) {
      return false;
    }
    if ((b === 't') || (b === 'y') || (b === '1')) {
      return true;
    }
    return false;
  };

  // Given an `options` object in which options[name] is a string
  // set to '0', '1', or 'any', this method adds mongodb criteria
  // to the `criteria` object.
  //
  // false, true and null are accepted as synonyms for '0', '1' and 'any' (or default).
  //
  // '0' or false means "the property must be false or absent," '1' or true
  // means "the property must be true," and 'any' or null means "we don't care
  // what the property is."
  //
  // An empty string is considered equivalent to '0'.
  //
  // This is not the same as apos.sanitizeBoolean which is concerned only with
  // true or false and does not address "any."
  //
  // `def` defaults to `any`.
  //
  // This method is most often used with REST API parameters and forms.

  self.addBooleanFilterToCriteria = function(options, name, criteria, def) {
    // if any or null, we aren't changing criteria
    if (def === undefined) {
      def = null;
    }

    // allow object or boolean
    var value = (typeof(options) === 'object' && options !== null) ? options[name] : options;
    value = (value === undefined) ? def : value;
    value = self.booleanOrNull(value);

    if (value === null) {
      // Don't care, show all
    } else if (!value) {
      // Must be absent or false. Hooray for $ne
      criteria[name] = { $ne: true };
    } else {
      // Must be true
      criteria[name] = true;
    }
  };

  // Accept true, false, or null and return them exactly
  // as such; if the parameter is none of those, return def.
  // Also accept '0', '1' and 'any' as synonyms.
  //
  // This is useful for tristate filters ("published,"
  // "unpublished", "don't care").

  self.booleanOrNull = function(b, def) {
    if (b === true) {
      return b;
    }
    if (b === false) {
      return b;
    }
    if (b === null) {
      return b;
    }

    b = self.string(b, def);
    if (b === def) {
      if (def === undefined) {
        return null;
      }
      return b;
    }
    b = b.toLowerCase().charAt(0);

    if ((b === '') || (b === 'n') || (b === '0') || (b === 'f')) {
      return false;
    }

    if ((b === 't') || (b === 'y') || (b === '1')) {
      return true;
    }

    if ((b === 'a')) {
      return null;
    }

    return def;
  };

  // Accept a user-entered string in YYYY-MM-DD, MM/DD, MM/DD/YY, or MM/DD/YYYY format
  // (tolerates missing leading zeroes on MM and DD). Also accepts a Date object.
  // Returns YYYY-MM-DD.
  //
  // The current year is assumed when MM/DD is used. If there is no explicit default
  // any unparseable date is returned as today's date.

  self.date = function(date, def, now) {
    var components;

    function returnDefault() {
      if (def === undefined) {
        def = moment().format('YYYY-MM-DD');
      }
      return def;
    }

    if (typeof(date) === 'string') {
      if (date.match(/\//)) {
        components = date.split('/');
        if (components.length === 2) {
          // Convert mm/dd to yyyy-mm-dd
          return (now || new Date()).getFullYear() + '-' + self.padInteger(components[0], 2) + '-' + self.padInteger(components[1], 2);
        } else if (components.length === 3) {
          // Convert mm/dd/yy to mm/dd/yyyy
          if (components[2] < 100) {
            // Add the current century. If the result is more than
            // 50 years in the future, assume they meant the
            // previous century. Thus in 2015, we find that
            // we get the intuitive result for both 1/1/75,
            // 1/1/99 and 1/1/25. It's a nasty habit among
            // us imprecise humans. -Tom
            var d = (now || new Date());
            var nowYear = d.getFullYear() % 100;
            var nowCentury = d.getFullYear() - nowYear;
            var theirYear = parseInt(components[2]) + nowCentury;
            if (theirYear - d.getFullYear() > 50) {
              theirYear -= 100;
            }
            components[2] = theirYear;
          }
          // Convert mm/dd/yyyy to yyyy-mm-dd
          return self.padInteger(components[2], 4) + '-' + self.padInteger(components[0], 2) + '-' + self.padInteger(components[1], 2);
        } else {
          return returnDefault();
        }
      } else if (date.match(/\-/)) {
        components = date.split('-');
        if (components.length === 2) {
          // Convert mm-dd to yyyy-mm-dd
          return (now || new Date()).getFullYear() + '-' + self.padInteger(components[0], 2) + '-' + self.padInteger(components[1], 2);
        } else if (components.length === 3) {
          // Convert yyyy-mm-dd (with questionable padding) to yyyy-mm-dd
          return self.padInteger(components[0], 4) + '-' + self.padInteger(components[1], 2) + '-' + self.padInteger(components[2], 2);
        } else {
          return returnDefault();
        }
      }
    }
    try {
      date = (now || new Date(date));
      if (isNaN(date.getTime())) {
        return returnDefault();
      }
      return date.getFullYear() + '-' + self.padInteger(date.getMonth() + 1, 2) + '-' + self.padInteger(date.getDate(), 2);
    } catch (e) {
      return returnDefault();
    }
  };

  // This is likely not relevent to you unless you're using Apostrophe
  // Given a date object, return a date string in Apostrophe's preferred sortable, comparable, JSON-able format,
  // which is YYYY-MM-DD. If `date` is undefined the current date is used.
  self.formatDate = function(date) {
    return moment(date).format('YYYY-MM-DD');
  };

  // Accepts a user-entered string in 12-hour or 24-hour time and returns a string
  // in 24-hour time. This method is tolerant of syntax such as `4pm`; minutes and
  // seconds are optional.
  //
  // If `def` is not set the default is the current time.

  self.time = function(time, def) {
    time = self.string(time).toLowerCase();
    time = time.trim();
    var components = time.match(/^(\d+)([:|.](\d+))?([:|.](\d+))?\s*(am|pm|AM|PM|a|p|A|M)?$/);
    if (components) {
      var hours = parseInt(components[1], 10);
      var minutes = (components[3] !== undefined) ? parseInt(components[3], 10) : 0;
      var seconds = (components[5] !== undefined) ? parseInt(components[5], 10) : 0;
      var ampm = (components[6]) ? components[6].toLowerCase() : components[6];
      ampm = ampm && ampm.charAt(0);
      if ((hours === 12) && (ampm === 'a')) {
        hours -= 12;
      } else if ((hours === 12) && (ampm === 'p')) {
        // Leave it be
      } else if (ampm === 'p') {
        hours += 12;
      }
      if ((hours === 24) || (hours === '24')) {
        hours = 0;
      }
      return self.padInteger(hours, 2) + ':' + self.padInteger(minutes, 2) + ':' + self.padInteger(seconds, 2);
    } else {
      if (def !== undefined) {
        return def;
      }
      return moment().format('HH:mm');
    }
  };

  // This is likely not relevent to you unless you're using Apostrophe
  // Given a JavaScript Date object, return a time string in
  // Apostrophe's preferred sortable, comparable, JSON-able format:
  // 24-hour time, with seconds.
  //
  // If `date` is missing the current time is used.

  self.formatTime = function(date) {
    return moment(date).format('HH:mm:ss');
  };

  // Sanitize tags. Tags should be submitted as an array of strings,
  // or a comma-separated string.
  //
  // This method ensures the input is an array or string and, if
  // an array, that the elements of the array are strings.
  //
  // If a filterTag function is passed as an option when initializing
  // Launder, then all tags are passed through it (as individual
  // strings, one per call) and the return value is used instead. You
  // may also pass a filterTag when calling this function

  self.tags = function(tags, filter) {
    if (typeof(tags) === 'string') {
      tags = tags.split(/,\s*/);
    }
    if (!Array.isArray(tags)) {
      return [];
    }
    return _.filter(
      _.map(
        _.map(tags, function(t) {
          return self.string(t);
        }),
        filter || self.filterTag
      ), function(tag) {
      return !!tag.length;
    });
  };


  // Sanitize an id. IDs must consist solely of upper and lower case
  // letters and numbers, digits, and underscores. 
  self.id = function(s, def) {
    var id = self.string(s, def);
    if (id === def) {
      return id;
    }
    if (!id.match(/^[A-Za-z0-9\_]+$/)) {
      return def;
    }
    return id;
  };

  // Sanitize an array of IDs. IDs must consist solely of upper and lower case
  // letters and numbers, digits, and underscores. Any elements that are not
  // IDs are omitted from the final array.
  self.ids = function(ids) {
    if (!Array.isArray(ids)) {
      return [];
    }
    result = _.filter(ids, function(id) {
      return (self.id(id) !== undefined);
    });
    return result;
  };
}


module.exports = function(options) {
  return new Launder(options);
};
