const Geo = require('node-geocoder');

module.exports = {
  name: 'location',
  extend: 'apostrophe-pieces',
  label: 'Location',
  pluralLabel: 'Locations',
  contextual: true,
  addFields: [
    {
      name: 'address',
      label: 'Address',
      type: 'string',
      required: true
    },
    {
      name: 'stateCode',
      label: 'stateCode',
      contextual: true,
      type: 'string'
    },
    {
      name: 'zipCode',
      label: 'zipCode',
      contextual: true,
      type: 'string'
    },
    {
      name: 'streetName',
      label: 'streetName',
      contextual: true,
      type: 'string'
    },
    {
      name: 'city',
      label: 'city',
      contextual: true,
      type: 'string'
    }
  ],
  arrangeFields: [
    {
      name: 'details',
      label: 'Details',
      fields: ['address']
    }
  ],
  afterConstruct: function (self) {
    self.enableGeo();
  },
  construct: function (self, options) {
    self.enableGeo = function () {
      if (self.options.mapQuest) {
        self.geo = Geo({
          provider: 'mapquest',
          apiKey: self.options.mapQuest.key
        });
      } else {
        console.warn('WARNING: No MapQuest API credentials found, expected as part of the `locations` piece type\'s options. See the README for information about where to put these options and see https://developer.mapquest.com/documentation/open/ for generating a MapQuest key/secret');
      }
    };
    self.beforeSave = function (req, piece, options, callback) {
      if (!self.geo) {
        console.warn('WARNING: Can\'t geocode `location` piece\'s address field, maps will not be rendered');
        return callback(null);
      }
      return self.geo.geocode(piece.address, function (err, res) {
        if (err) {
          return callback(err);
        }
        let l = res[0];

        piece.latlng = [l.latitude, l.longitude];
        piece.stateCode = l.stateCode;
        piece.city = l.city;
        piece.streetName = l.streetName;
        piece.zipCode = l.zipcode;
        return callback(null);
      });
    };
  }
};
