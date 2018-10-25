var _ = require('@sailshq/lodash');
module.exports = {        
  extend: 'apostrophe-widgets',
  label: 'Single Image',
  addFields: [
    {
      name: 'image',
      label: 'Image',
      type: 'singleton',
      widgetType: 'apostrophe-images',
      options: {
        limit: [ 1 ]
      }
    },
    {
      name: 'caption',
      label: 'Caption',
      type: 'string'
    }
  ]
};