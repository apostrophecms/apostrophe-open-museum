const _ = require('lodash');

module.exports = {
  // Also use this to power the grouping order later on
  types: [
    'artwork',
    'artist',
    'event',
    'article'
  ],
  perPage: 999,
  construct: function(self, options) {
    self.beforeIndex = function(req, callback) {
      if (JSON.stringify(req.query) === '{}') {
        req.template = self.renderer('empty');
      }
      req.data.docs = _.groupBy(req.data.docs, 'type')
      return callback(null)
    }
  }
};
