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

      areas: areas.baseToolbar,
      baseStyles: areas.baseStyles,
      baseWidgets: areas.baseWidgets,
      baseToolbar: areas.baseToolbar
    });
  }
};