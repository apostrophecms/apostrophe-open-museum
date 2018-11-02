const _ = require('lodash');

module.exports = {
  // These are the types that appear as search results. Since we
  // specified this option, no others do.
  //
  // Also use this to power the grouping order later on
  types: [
    'artwork',
    'artist',
    'event',
    'article'
  ],
  perPage: 30,
  construct: function(self, options) {
    self.beforeIndex = function(req, callback) {
      if (_.isEmpty(req.query)) {
        req.template = self.renderer('empty');
      }
      req.data.docs = _.groupBy(req.data.docs, 'type');
      return callback(null);
    }
  }
};
