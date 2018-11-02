const areas = require('../helpers/lib/areas.js');
const _ = require('lodash');

module.exports = {        
  label: 'Two Panel',
  skipInitialModal: true,
  addFields: [
    {
      name: 'config',
      label: 'Configuration',
      type: 'select',
      choices: [
        { label: 'Content Left / Media Right', value: 'c-two-panel--content-left' },
        { label: 'Content Right / Media Left', value: 'c-two-panel--content-right' }
      ]
    },
    {
      name: 'image',
      label: 'Image',
      contextual: true,
      type: 'singleton',
      widgetType: 'apostrophe-images',
      options: {
        limit: 1,
        template: 'background'
      }
    },
    {
      name: 'body',
      label: 'Body',
      contextual: true,
      type: 'area',
      options: {
        widgets: {
          'apostrophe-rich-text': {
            toolbar: _.clone(areas.baseToolbar),
            styles: _.clone(areas.baseStyles)
          },
          'link': {}
        }
      }
    }
  ]
};