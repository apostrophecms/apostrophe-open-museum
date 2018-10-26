// This configures the apostrophe-pages module to add a "home" page type to the
// pages menu

module.exports = {
  filters: {
    // Grab our ancestor pages, with two levels of subpages
    ancestors: {
      children: {
        depth: 2
      }
    },
    // We usually want children of the current page, too
    children: true
  },
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
      label: 'People Index',
      name: 'people-pages'
    },
    {
      label: 'Location Index',
      name: 'location-pages'
    },
    {
      label: 'Article Index',
      name: 'article-pages'
    },
    {
      label: 'Event Index',
      name: 'event-pages'
    }

    // Add more page types here, but make sure you create a corresponding
    // template in lib/modules/apostrophe-pages/views/pages!
  ]
};
