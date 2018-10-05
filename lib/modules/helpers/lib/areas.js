const _ = require('lodash');
let baseToolbar = [ 'Styles', 'Bold', 'Italic', 'Link', 'Anchor', 'Unlink', 'NumberedList', 'BulletedList', 'Split' ];
let baseStyles = [
  { name: 'Body Copy (P)', element: 'p', attributes: { class: 'o-body' } },
  { name: 'Section Header (H2)', element: 'h2', attributes: { class: 'o-section-header' } },
  { name: 'Headline (H3)', element: 'h3', attributes: { class: 'o-headline' } },
  { name: 'SuhHeadline (H4)', element: 'h4', attributes: { class: 'o-subheadline' } },
];

let baseWidgets = {
  'apostrophe-rich-text': {
    toolbar: baseToolbar,
    styles: baseStyles
  },
  'image': {},
  'slideshow': {},
  'logo-mask': {},
  'marquee': {},
  'link': {},
  'columns': {},
  'feature': {},
}

module.exports = {
  baseToolbar: baseToolbar,
  baseStyles: baseStyles,
  baseWidgets: baseWidgets
};
