const _ = require('lodash');
const {baseWidgets} = require('../helpers/lib/areas.js');

const columnWidgets = _.cloneDeep(baseWidgets);
delete columnWidgets.columns;

module.exports = {
  label: 'Columns',
  skipInitialModal: true,
  addFields: [
    {
      name: 'config',
      label: 'Column Configuration',
      type: 'select',
      def: 'two',
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
      def: 'none',
      choices: [
        { label: 'None', value: 'none' },
        { label: 'Cream', value: 'o-background-brand-secondary' },
        { label: 'Light Purple', value: 'o-background-light' }
      ]
    },
    {
      name: 'column1',
      label: 'Column One',
      contextual: true,
      type: 'area',
      options: {
        widgets: columnWidgets
      }
    },
    {
      name: 'column2',
      label: 'Column Two',
      contextual: true,
      type: 'area',
      options: {
        widgets: columnWidgets
      }
    },
    {
      name: 'column3',
      label: 'Column Three',
      contextual: true,
      type: 'area',
      options: {
        widgets: columnWidgets
      }
    }
  ]
};
