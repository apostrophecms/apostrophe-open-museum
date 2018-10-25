const _ = require('lodash');
const areas = require('../helpers/lib/areas.js');

module.exports = {        
  extend: 'apostrophe-widgets',
  label: 'Columns',
  skipInitialModal: true,
  addFields: [
    {
      name: 'config',
      label: 'Column Configuration',
      type: 'select',
      choices: [
        { label: 'Three Columns (3 / 3 / 2)', value: 'three' },
        { label: 'Two Columns (5 / 3)', value: 'two' },
        { label: 'Two Columns (3 / 5)', value: 'two-reverse' }
      ]
    },
    {
      name: 'background',
      label: 'Background',
      type: 'select',
      choices: [
        { label: 'None', value: 'none' },
        { label: 'Cream', value: 'o-background-brand-secondary' },
        { label: 'Light Purple', value: 'o-background-light' },
      ]
    },
    {
      name: 'column1',
      label: 'Column One',
      contextual: true,
      type: 'area',
      options: {
        widgets: _.cloneDeep(areas.baseWidgets)
      }
    },
    {
      name: 'column2',
      label: 'Column Two',
      contextual: true,
      type: 'area',
      options: {
        widgets: _.cloneDeep(areas.baseWidgets)
      }
    },
    {
      name: 'column3',
      label: 'Column Three',
      contextual: true,
      type: 'area',
      options: {
        widgets: _.cloneDeep(areas.baseWidgets)
      }
    }
  ]
};