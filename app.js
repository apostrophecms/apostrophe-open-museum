var path = require('path');

var apos = require('apostrophe')({
  shortName: 'apostrophe-demo-2018',

  // See lib/modules for basic project-level configuration of our modules
  // responsible for serving static assets, managing page templates and
  // configuring user accounts.

  modules: {

    // Apostrophe module configuration

    // Note: most configuration occurs in the respective
    // modules' directories. See lib/apostrophe-assets/index.js for an example.
    
    // However any modules that are not present by default in Apostrophe must at
    // least have a minimal configuration here: `moduleName: {}`

    // If a template is not found somewhere else, serve it from the top-level
    // `views/` folder of the project

    // Setup
    'apostrophe-templates': { viewsFolderFallback: path.join(__dirname, 'views') },
    'helpers': {},
    'styleguide': {},

    // Pages
    'default-pages': {},

    // Catagorical Piece Types
    'categories': { instantiate: false },
    'category-object-types': { extend: 'categories' },

    // Pieces
    'artists': {},
    'artists-pages': {},
    'artists-widgets': {},

    'locations': {},
    'locations-pages': {},
    'locations-widgets': {},

    'artworks': {},
    'artworks-pages': {},
    'artworks-widgets': {},

    'articles': { extend: 'apostrophe-blog' },
    'articles-pages': {},
    'articles-widgets': {},

    'events': { extend: 'apostrophe-events' },
    'events-pages': {},
    'events-widgets': {},

    'people': {},
    'people-pages': {},

    // Content Widgets
    'image-widgets': {},
    'slideshow-widgets': {},
    'logo-mask-widgets': {},
    'link-widgets': {},
    'marquee-widgets': {},
    'feature-widgets': { extend: 'marquee-widgets' },
    'two-panel-widgets': {},
    'content-widgets': {},

    // Layout Widgets
    'columns-widgets': {}

  }
});
