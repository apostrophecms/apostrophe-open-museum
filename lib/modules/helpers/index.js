const _ = require('lodash');
const typy = require('typy');
const areas = require('./lib/areas.js');

module.exports = {
  alias: 'helpers',
  label: 'Helpers',
  construct: function (self, options) {

    // Have to wait for all modules to be initialized so we can reach into `locations` options
    self.modulesReady = function() {
      let req = self.apos.tasks.getReq();
      const locationModule = self.apos.docs.getManager('location').find(req, {}).options.module;
      let mq = locationModule.options.mapQuest;

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
      
      _find: (haystack, needle) => _.find(haystack, needle),

      _isObject: (data) => _.isObject(data),

      _isArray: (data) => _.isArray(data),

      _isString: (data) => _.isString(data),

      _shuffle: (array) => _.shuffle(array),

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
        return typy(obj, path).safeString;
      },

      isJoin: function(str) {
        if (str.charAt(0) === '_') {
          return true;
        } else {
          return false;
        }
      },

      areas: _.clone(areas.baseToolbar),
      baseStyles: _.clone(areas.baseStyles),
      baseWidgets: _.clone(areas.baseWidgets),
      baseToolbar: _.clone(areas.baseToolbar),
      narrowWidgets: _.clone(areas.narrowWidgets),
    });
  }
};
