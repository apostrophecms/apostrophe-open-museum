const _ = require('lodash');

module.exports = {
  label: 'Feature',
  modifier: 'c-marquee--feature',
  alterFields: function(schema) {
    let image = _.find(schema, { name: 'image' })
    image.options = {
      aspectRatio: [1, 0.25],
      minSize: [1400, 400],
      limit: 1,
      template: 'single'
    }
  }
};