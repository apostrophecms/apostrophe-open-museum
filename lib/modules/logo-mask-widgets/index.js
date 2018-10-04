module.exports = {        
  extend: 'apostrophe-widgets',        
  label: 'Logo Mask',        
  addFields: [
    {
      name: 'image',
      label: 'Image',
      type: 'singleton',
      widgetType: 'apostrophe-images',
      options: {
        limit: [ 1 ]
      }
    }
  ]        
};