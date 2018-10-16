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
    self.beforeShow = function (req, callback) {
      if (!req.data.piece._artist) {
        return callback(null)
      }
      
      const artistId = req.data.piece._artist._id;
      self.pieces.find(req, {}).toArray(function (err, docs) {
        let matches = [];
        docs.forEach(function (doc) {
          if (doc._artist && doc._artist._id === artistId) {
            matches.push(doc)
          }
        })
        matches = matches.slice(0,3)

        req.data._related = matches
        return callback(null)
      })
    }
  }
};  