var _ = require('lodash');
var areas = require('./lib/areas.js');

module.exports = {
  extend: 'apostrophe-module',
  alias: 'helpers',
  label: 'Helpers',
  construct: function (self, options) {
    self.addHelpers({ 
      
      _find: function(haystack, needle) {
        return _.find(haystack, needle);
      },

      _isObject: function(data) {
        return _.isObject(data)
      },

      _isArray: function(data) {
        return _.isArray(data)
      },

      _isString: function(data) {
        return _.isString(data)
      },

      _shuffle: function(array) {
        return _.shuffle(array)
      },

      dig: function(object, arr) {
        let current;
        arr.forEach(function(item) {
          current = object[item]
        })
        return current
      },

      areas: areas.baseToolbar,
      baseStyles: areas.baseStyles,
      baseWidgets: areas.baseWidgets,
      baseToolbar: areas.baseToolbar,
      narrowWidgets: areas.narrowWidgets,
    });
  }
};