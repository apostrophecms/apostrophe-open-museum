const schema = require('./lib/schema.js');

module.exports = {
  label: 'Link',
  addFields: [
    {
      name: 'links',
      label: 'Links',
      type: 'array',
      titleField: 'linkText',
      schema: schema
    }
  ]
};