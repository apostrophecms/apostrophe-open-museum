// var areas = require('./lib/areas.js');
var _ = require('lodash');

module.exports = {
  extend: 'apostrophe-module',
  alias: 'helpers',
  label: 'Helpers',
  construct: function (self, options) {
    self.addHelpers({
      getImagePath: function () {
        return (new Date()).getFullYear();
      },
      // baseToolbar: areas.baseToolbar,
      // baseStyles: areas.baseStyles,
      // baseWidgets: areas.baseWidgets,
      // narrowWidgets: areas.narrowWidgets
    });
  }
};