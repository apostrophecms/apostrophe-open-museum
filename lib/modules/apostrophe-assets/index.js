// This configures the apostrophe-assets module to push a 'site.less'
// stylesheet by default, and to use jQuery 3.x

module.exports = {
  jQuery: 3,
  stylesheets: [
    {
      name: 'site'
    },
    {
      name: 'vendor/_multirange',
      // import: { inline: true }
    }
  ],
  scripts: [
    { name: 'vendor/multirange' },
    { name: 'utils' },
    { name: 'popups/base' },
    { name: 'popups/tags' },
    { name: 'popups/multirange' },
    { name: 'popups/checkboxes' },
    { name: 'modules/map' },
    { name: 'modules/bio-box' },
    { name: 'modules/mobile-menu' },
    { name: 'site' },
  ]
};
