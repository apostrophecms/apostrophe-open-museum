const areas = require('../helpers/lib/areas.js')

module.exports = {
  label: 'Marquee',
  skipInitialModal: true,
  addFields: [
    {
      contextual: true,
      name: 'image',
      label: 'Banner Image',
      type: 'singleton',
      widgetType: 'apostrophe-images',
      controls: {
        position: 'top-right'
      },
      options: {
        aspectRatio: [ 1, 0.55 ],
        minSize: [ 1400, 770 ],
        limit: 1,
        template: 'single',
      }
    },
    {
      contextual: true,
      name: 'content',
      label: 'Content',
      type: 'area',
      options: {
        widgets: {
          'apostrophe-rich-text': {
            toolbar: areas.baseToolbar,
            styles: areas.baseStyles
          },
          'link': {}
        }
      }
    },
    {
      name: 'screen',
      label: 'Screen Overlay Transparency',
      help: 'This darkens or lightens over the image, creating more or less contrast for content',
      type: 'select',
      choices: [
        { label: '0% (Fully Transparent)', value: '0' },
        { label: '20%', value: '0.2' },
        { label: '40%', value: '0.4' },
        { label: '60%', value: '0.6' },
        { label: '80%', value: '0.8' },
        { label: '100% (Fully opaque)', value: '1' }
      ]
    }
  ]
};