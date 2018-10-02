const li = require('lorem-ipsum');
const liConfig = {

}

module.exports = {
  extend: 'apostrophe-custom-pages',
  name: 'styleguide',
  alias: 'styleguide',

  construct: function(self, options) {
    self.dispatch('/', function (req, callback) {
      req.template = self.renderer('styleguide', {
        nav: [
          { label: 'Colors', anchor: 'colors' },
          { label: 'Typography', anchor: 'type' },
          { label: 'UI', anchor: 'ui' },
          { label: 'Forms', anchor: 'forms' }
        ],
        colors: [
          { label: 'Dark', class: 'o-background-dark' },
          { label: 'Medium', class: 'o-background-med' },
          { label: 'Light', class: 'o-background-light' },
          { label: 'White', class: 'o-background-white' },
          { label: 'Brand Primary', class: 'o-background-brand-primary' },
          { label: 'Brand Secondary', class: 'o-background-brand-secondary' }
        ],
        type: [
          { label: 'This is a Title', class: "o-title", content: li({sentenceUpperBound: 5 })},
          { label: 'This is a Section Header', class: "o-section-header", content: li({sentenceUpperBound: 5 }) },
          { label: 'This is a Headline', class: "o-headline", content: li({sentenceUpperBound: 5 }) },
          { label: 'This is a Subheadline', class: "o-subheadline", content: li({sentenceUpperBound: 5 }) },
          { label: 'This is Meta Information', class: "o-meta", content: li({sentenceUpperBound: 10 }) },
          { label: 'This is a Lede', class: "o-lede", content: li({sentenceUpperBound: 10, count: 2 }) },
          { label: 'This is Body Copy', class: "o-body", content: li({count: 2, units: 'paragraphs' }) },
        ]
      });
      return callback(null);
    });

    self.apos.pages.park({
      title: 'Styleguide',
      type: 'styleguide',
      slug: '/styleguide',
      published: true,
      orphan: true
    });
  },

  afterConstruct: function(self) {
    self.pushAsset('stylesheet', 'styleguide', { when: 'always' });
  }
};
