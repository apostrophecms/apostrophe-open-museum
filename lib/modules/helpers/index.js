var _ = require('lodash');
var typy = require('typy');
var areas = require('./lib/areas.js');

module.exports = {
  extend: 'apostrophe-module',
  alias: 'helpers',
  label: 'Helpers',
  construct: function (self, options) {

    // Have to wait for all modules to be initialized so we can reach into `locations` options
    self.modulesReady = function() {
      let req = self.apos.tasks.getReq();
      const locationModule = self.apos.docs.getManager('location').find(req, {}).options.module;
      let mq = locationModule.options.mapQuest

      self.addHelpers({
        getMapquestKey: function () {
          if (mq) {
            return mq.key
          } else {
            return 
          }
        },
      })
    }

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

      getPaths: function(array) {
        let paths = [];
        array.forEach(function(imageObj) {
          paths.push(self.apos.attachments.url(imageObj.item.attachment, {size: 'full', crop: imageObj.relationship}))
        })
        return paths
      },

      split: function(str, sep) {
        return str.split(sep);
      },
      
      typy: function (obj, path) {
        return typy(obj, path).safeString
      },

      isJoin: function(str) {
        if (str.charAt(0) === '_') {
          return true;
        } else {
          return false;
        }
      },

      areas: areas.baseToolbar,
      baseStyles: areas.baseStyles,
      baseWidgets: areas.baseWidgets,
      baseToolbar: areas.baseToolbar,
      narrowWidgets: areas.narrowWidgets,
    });
  }
};
