const linkSchema = require('../link-widgets/lib/schema.js');
const linkTab = require('../link-widgets/lib/tab.js');

module.exports = {         
  label: 'Article Widget',          
  addFields: linkSchema.concat([
    {
      name: 'headline',
      label: 'Headline',
      type: 'string',
      required: true
    }
  ]),
  arrangeFields: [
    {
      name: 'main',
      label: 'Main',
      fields: ['headline', '_pieces', 'by', 'limitByAll', 'tags', 'limitByTag']
    },
    {
      name: 'link',
      label: 'Link',
      fields: linkTab
    }
  ]
};