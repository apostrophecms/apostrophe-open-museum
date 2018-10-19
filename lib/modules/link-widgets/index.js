const schema = require('./lib/schema.js');

module.exports = {        
  extend: 'apostrophe-widgets',        
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