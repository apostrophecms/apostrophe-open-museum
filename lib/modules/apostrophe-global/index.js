module.exports = {
  addFields: [
    {
      name: 'logoImages',
      label: 'Masked Logo Images',
      help: 'On page load, choose one randomly and mask it with the logomark',
      type: 'singleton',
      widgetType: 'apostrophe-images',
    }
  ],
  arrangeFields: [
    {
      name: 'navigation',
      label: 'Navigation',
      fields: [
        'logoImages'
      ]
    },
  ]
};
