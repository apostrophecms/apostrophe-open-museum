const _ = require('lodash');

module.exports = {
  name: 'artwork-pages',
  label: 'Artwork Page',
  addFields: [],
  perPage: 15,
  piecesFilters: [
    { name: 'objectType' },
    { name: 'location' },
    { name: 'artist' }
  ],
  construct: function (self, options) {
    self.beforeShow = async function (req, callback) {
      // Take advantage of the reverse join from artists back to their
      // artworks to sample some related work
      const artworks = req.data.piece._artist && req.data.piece._artist._artworks;
      if (!artworks) {
        return callback(null);
      }
      const other = _.filter(artworks, function (artwork) {
        return !(artwork._id === req.data.piece._id);
      });
      // Random sample
      req.data.related = _.sampleSize(other, 3);
      return callback(null);
    };
  }
};
