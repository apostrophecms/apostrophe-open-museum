const _ = require('lodash');
const typy = require('typy');
const areas = require('./lib/areas.js');

module.exports = {
  alias: 'helpers',
  label: 'Helpers',
  construct: function (self, options) {
    // Have to wait for all modules to be initialized so we can reach into `locations` options
    self.modulesReady = () => {
      const locationModule = self.apos.modules.locations;
      let mq = locationModule.options.mapQuest;

      self.addHelpers({
        getMapquestKey: () => {
          if (mq) {
            return mq.key;
          } else {

          }
        }
      });
    };

    self.addHelpers({

      _find: (haystack, needle) => _.find(haystack, needle),

      _isObject: (data) => _.isObject(data),

      _isArray: (data) => _.isArray(data),

      _isString: (data) => _.isString(data),

      _shuffle: (array) => _.shuffle(array),

      getPaths: (array) => {
        let paths = [];
        array.forEach(function (imageObj) {
          paths.push(self.apos.attachments.url(imageObj.item.attachment, {size: 'full', crop: imageObj.relationship}));
        });
        return paths;
      },

      split: (str, sep) => str.split(sep),

      typy: (obj, path) => typy(obj, path).safeString,

      isJoin: (str) => {
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
      narrowWidgets: _.clone(areas.narrowWidgets)
    });
  }
};
