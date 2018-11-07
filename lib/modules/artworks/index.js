const lorem = require('lorem-ipsum');

module.exports = {
  name: 'artwork',
  label: 'Artwork',
  pluralLabel: 'Artworks',
  contextual: true,
  import: true,
  addFields: [
    {
      name: '_objectType',
      label: 'Type of Object',
      type: 'joinByOne',
      withType: 'category-object-type',
      filters: {
        projection: {
          _url: 1,
          slug: 1,
          title: 1,
          type: 1
        }
      }
    },
    {
      name: '_location',
      label: 'Location of Object',
      type: 'joinByOne',
      withType: 'location',
      filters: {
        projection: {
          _url: 1,
          slug: 1,
          title: 1,
          type: 1
        }
      }
    },
    {
      name: '_artist',
      label: 'Artist',
      idField: 'artistId',
      type: 'joinByOne',
      withType: 'artist',
      withJoins: [ '_artworks' ],
      filters: {
        projection: {
          _url: 1,
          title: 1,
          description: 1,
          thumbnail: 1
        }
      }
    },
    {
      name: 'medium',
      label: 'Medium',
      type: 'string'
    },
    {
      name: 'dimensions',
      label: 'Dimensions',
      type: 'string'
    },
    {
      name: 'year',
      label: 'Year',
      type: 'integer'
    },
    {
      name: 'thumbnail',
      label: 'Thumbnail',
      type: 'singleton',
      widgetType: 'apostrophe-images',
      options: {
        limit: 1
      }
    },
    {
      name: 'description',
      label: 'Description',
      type: 'string',
      textarea: true
    }
  ],
  construct: function (self, options) {
    self.importBeforeInsert = function (job, record, piece, callback) {
      // Have to force in joined Ids
      if (record.objectTypeId) {
        piece.objectTypeId = record.objectTypeId;
      }

      if (record.locationId) {
        piece.locationId = record.locationId;
      }

      if (record.artistId) {
        piece.artistId = record.artistId;
      }

      piece.openGraphTitle = record.title + ' | OpenMuseum on ApostropheCMS';
      piece.seoTitle = record.title + ' | OpenMuseum on ApostropheCMS';
      piece.seoDescription = 'OpenMuseum is an ApostropheCMS demo website, more at http://apostrophecms.org';
      piece.openGraphDescription = 'OpenMuseum is an ApostropheCMS demo website, more at http://apostrophecms.org';

      for (let key in record) {
        if (record.hasOwnProperty(key)) {
          if (record[key] === '%LORUM%') {
            piece[key] = lorem({
              sentenceUpperBound: 10,
              count: 2,
              units: 'paragraphs'
            });
          }
        }
      }
      return callback(null);
    };
  }
};
