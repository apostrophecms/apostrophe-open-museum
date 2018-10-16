const ll = require('latlng');
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
       type: 'string'
     },
     {
       name: 'latlng',
       contextual: true,
       label: 'Latitude / Longitude',
       type: 'array'
     }
   ],
   construct: function(self, options) {

    let geo = Geo({
      provider: 'mapquest',
      apiKey: options.mapQuest.key
      })

    self.beforeSave = function(req, piece, options, callback) {

      geo.geocode(piece.address, function (err, res) {
        if (err) {
          return callback(err)
        }
        piece.latlng = [ res[0].latitude, res[0].longitude ]
        console.log(piece.latlng);
        return callback();
      });
    }
   }
};