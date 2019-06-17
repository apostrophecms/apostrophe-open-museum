module.exports = {
  addFields: [
    {
      name: 'logoImages',
      label: 'Masked Logo Images',
      help: 'On page load, choose one randomly and mask it with the logomark',
      type: 'singleton',
      widgetType: 'apostrophe-images'
    },
    {
      name: 'demoMode',
      label: 'Enable Demo Mode?',
      help: 'This will turn on introductory modal windows when a user first arrives, introducing them to ApostrpoheCMS',
      type: 'boolean',
      choices: [
        { label: 'No', value: false },
        { label: 'Yes', value: true }
      ]
    },
    {
      name: 'trackingID',
      label: 'Google Analytics Tracking ID',
      help: 'If present, traffic will be tracked to this Google Analytics property.',
      type: 'string'
    },
    {
      name: 'specialNav',
      label: 'Special Nav',
      type: 'singleton',
      widgetType: 'anchor-menu'
    }
  ],
  arrangeFields: [
    {
      name: 'navigation',
      label: 'Navigation',
      fields: [
        'logoImages'
      ]
    }
  ]
};
