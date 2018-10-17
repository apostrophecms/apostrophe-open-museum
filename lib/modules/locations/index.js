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
     // these are all apos-use-only fields
     {
       name: 'latlng',
       contextual: true,
       label: 'Latitude / Longitude',
       type: 'array'
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
        let l = res[0];
        
        piece.latlng = [ l.latitude, l.longitude ]
        piece.stateCode = l.stateCode
        piece.city = l.city
        piece.streetName = l.streetName
        piece.zipCode = l.zipcode
        return callback();
      });
      
    }
   }
};