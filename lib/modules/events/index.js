const areas = require('../helpers/lib/areas.js');

module.exports = {
  name: 'event',
  label: 'Event',
  pluralLabel: 'Events',
  contextual: true,
  addFields: [
    {
      name: 'thumbnail',
      label: 'Thumnail',
      type: 'singleton',
      widgetType: 'apostrophe-images',
      options: {
        aspectRatio: [ 3, 2 ],
        limit: 1
      }
    },
    {
      name: '_location',
      label: 'Location of Object',
      type: 'joinByOne',
      withType: 'location'
    },
    {
      name: 'body',
      label: 'Body',
      contextual: true,
      type: 'area',
      options: {
        widgets: areas.narrowWidgets
      }
    }
  ]
};
