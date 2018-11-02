// Loads up maps that just waiting on the page, not ones powered by widgets

/* global L */

$(function () {
  var $maps = $('[data-map]');

  if ($maps.length > 0) {
    addResources();
  }

  function init ($map) {
    var key = $map.attr('data-mq-key');

    if (key === '') {
      console.warn('DEVELOPER: No MapQuest key/secret set, see the repo\'s README');
      return;
    }

    var latlng = JSON.parse($map.attr('data-map'));

    L.mapquest.key = key;
    var map = L.mapquest.map($map[0], {
      layers: L.mapquest.tileLayer('map'),
      center: latlng,
      zoom: 13
    });

    L.marker(latlng, {
      icon: L.mapquest.icons.marker(),
      draggable: false
    }).addTo(map);
  }

  function addResources () {
    var s = document.createElement('script');
    s.setAttribute('src', 'https://api.mqcdn.com/sdk/mapquest-js/v1.3.2/mapquest.js');
    s.onload = function () {
      $maps.each(function () {
        init($(this));
      });
    };

    document.body.appendChild(s);

    var l = document.createElement('link');
    l.setAttribute('type', 'text/css');
    l.setAttribute('rel', 'stylesheet');
    l.setAttribute('href', 'https://api.mqcdn.com/sdk/mapquest-js/v1.3.2/mapquest.css');

    document.body.appendChild(l);
  }
});
