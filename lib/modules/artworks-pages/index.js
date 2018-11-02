const _ = require('lodash');

module.exports = {          
   extend: 'apostrophe-pieces-pages',
   name: 'artwork-pages',
   label: 'Artwork Page',
   addFields: [],
   perPage: 15,
   piecesFilters: [
    { name: 'objectType' },
    { name: 'location' },
    { name: 'artist' },
   ],
  construct: function(self, options) {
    self.beforeShow = async function (req, callback) {
      // Take advantage of the reverse join from artists back to their
      // artworks to sample some related work
      const related = req.data.piece._artist && req.data.piece._artist._artworks;
      if (related) {
        req.data.related = related.slice(0, 3);
      }
      return callback(null);
    };
  }
};  