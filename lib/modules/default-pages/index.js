module.exports = {
  extend: 'apostrophe-custom-pages',
  label: 'Default Page',
  name: 'default',

  addFields: [
    {
      name: 'masthead',
      label: 'Display Masthead?',
      help: 'This is the purple title band that appears above page content',
      type: 'boolean',
      choices: [
        { label: 'Yes', value: true },
        { label: 'No', value: false }
      ]
    },
    {
      name: 'peerNav',
      label: 'Display Peer Navigation?',
      help: 'This is the left hand navigation list',
      type: 'boolean',
      choices: [
        { label: 'Yes', value: true },
        { label: 'No', value: false }
      ]
    }
  ]
};