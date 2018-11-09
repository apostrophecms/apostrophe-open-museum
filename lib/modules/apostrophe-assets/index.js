// This configures the apostrophe-assets module to push two stylesheets,
// a number of JavaScript libraries, and jQuery 3.x rather than an
// older release. See `public/css` and `public/js` of this module.

module.exports = {
  jQuery: 3,
  stylesheets: [
    {
      name: 'site'
    },
    {
      name: 'vendor/_multirange'
      // import: { inline: true }
    }
  ],
  scripts: [
    { name: 'vendor/multirange' },
    { name: 'vendor/swiper.4.4.1' },
    { name: 'utils' },
    { name: 'popups/base' },
    { name: 'popups/tags' },
    { name: 'popups/multirange' },
    { name: 'popups/checkboxes' },
    { name: 'modules/map' },
    { name: 'modules/bio-box' },
    { name: 'modules/mobile-menu' },
    { name: 'modules/logo-mask' },
    { name: 'site' }
  ]
};
