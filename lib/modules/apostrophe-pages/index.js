// This configures the apostrophe-pages module to add a "home" page type to the
// pages menu

module.exports = {
  park: [{
    title: 'Search',
    slug: '/search',
    type: 'apostrophe-search',
    label: 'Search',
    published: true
  }],
  types: [
    {
      name: 'home',
      label: 'Home'
    },
    {
      name: 'default',
      label: 'Default'
    },
    {
      name: 'styleguide',
      label: 'Styleguide'
    },
    {
      label: 'Artworks Index',
      name: 'artwork-pages'
    },
    {
      label: 'Artist Index',
      name: 'artist-pages'
    },
    {
      label: 'Location Index',
      name: 'location-pages'
    },
    {
      label: 'Article Index',
      name: 'article-pages'
    }

    // Add more page types here, but make sure you create a corresponding
    // template in lib/modules/apostrophe-pages/views/pages!
  ]
};
