apos.define('locations-widgets', {
  extend: 'apostrophe-widgets',
  construct: function (self, options) {
    self.play = function ($widget, data, options) {
      
      let points = [];

      addResources()

      function init() {

        L.mapquest.key = self.options.mapQuestKey;
        var map = L.mapquest.map($widget.find('[data-location-widget]')[0], {
          layers: L.mapquest.tileLayer('map'),
          center: [0, 0],
          zoom: 6
        });

        data._locations.forEach(function(loc) {
          points.push(loc.latlng);
          addPin(loc, map);
        });

        let bounds = new L.LatLngBounds(points);
        map.fitBounds(bounds, { padding: [50,50] })

      }

      function addPin(piece, map) {
        
        L.marker(piece.latlng, {
          icon: L.mapquest.icons.marker(),
          draggable: false
        }).bindPopup(piece.title).addTo(map);
      }

      function addResources() {
        var s = document.createElement('script');
        s.setAttribute('src', 'https://api.mqcdn.com/sdk/mapquest-js/v1.3.2/mapquest.js');
        s.onload = function () {
          init();
        }
        
        document.body.appendChild(s);

        var l = document.createElement('link');
        l.setAttribute('type', 'text/css');
        l.setAttribute('rel', 'stylesheet');
        l.setAttribute('href', 'https://api.mqcdn.com/sdk/mapquest-js/v1.3.2/mapquest.css');
        document.body.appendChild(l);

      }
    };
  }
});