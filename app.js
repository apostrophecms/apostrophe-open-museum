const path = require('path');

const apos = require('apostrophe')({
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

    // Setup

    // Instantiate apostrophe-templates module and give is a fallback directory to better separate
    // apostrophe customization from totally project-specific templates
    // this module will first try to serve templates from /lib/modules/apostrophe-templates/views
    // but will fall back to /views if it doesn't find it
    'apostrophe-templates': { viewsFolderFallback: path.join(__dirname, 'views') },

    // Generic apostrophe-module designed to hold data + functions useful across the app
    // Some uses include special template functions that go outside the depth of nunjucks
    // and reusable, centralized apos.area configurations
    'helpers': { extend: 'apostrophe-module' },
    'styleguide': {},

    // apostrophe-seo adds custom meta data to the HEAD tag of a page, per page https://github.com/apostrophecms/apostrophe-seo
    'apostrophe-seo': {},

    // apostrophe-open-graph adds custom OG meta data to the HEAD tag of a page, per page https://github.com/apostrophecms/apostrophe-open-graph
    'apostrophe-open-graph': {},

    // apostrophe-pieces-import lets you turn on an CSV import interface per piece type https://github.com/apostrophecms/apostrophe-pieces-import
    'apostrophe-pieces-import': {},

    // apostrophe-favicons adds an interface for controlling a favicon for your site and outputs the proper link tags https://github.com/apostrophecms/apostrophe-favicons
    'apostrophe-favicons': {},
    'apostrophe-favicons-global': {},

    // Pages
    'default-pages': { extend: 'apostrophe-custom-pages' },

    // Catagorical Piece Types
    'category-object-types': { extend: 'apostrophe-pieces' },

    // Pieces
    'artists': { extend: 'apostrophe-pieces' },
    'artists-pages': { extend: 'apostrophe-pieces-pages' },

    'locations': { extend: 'apostrophe-pieces' },
    'locations-pages': { extend: 'apostrophe-pieces-pages' },
    'locations-widgets': { extend: 'apostrophe-widgets' },

    'artworks': { extend: 'apostrophe-pieces' },
    'artworks-pages': { extend: 'apostrophe-pieces-pages' },
    'artworks-widgets': { extend: 'apostrophe-pieces-widgets' },

    'articles': { extend: 'apostrophe-blog' },
    'articles-pages': { extend: 'apostrophe-pieces-pages' },
    'articles-widgets': { extend: 'apostrophe-pieces-widgets' },
    'articles-featured-widgets': { extend: 'apostrophe-widgets' },

    'events': { extend: 'apostrophe-events' },
    'events-pages': { extend: 'apostrophe-pieces-pages' },
    'events-widgets': { extend: 'apostrophe-pieces-widgets' },
    
    'people': { extend: 'apostrophe-pieces' },
    'people-pages': { extend: 'apostrophe-pieces-pages' },

    // Content Widgets
    'image-widgets': { extend: 'apostrophe-widgets' },
    'slideshow-widgets': { extend: 'apostrophe-widgets' },
    'logo-mask-widgets': { extend: 'apostrophe-widgets' },
    'link-widgets': { extend: 'apostrophe-widgets' },
    'marquee-widgets': { extend: 'apostrophe-widgets' },
    'feature-widgets': { extend: 'marquee-widgets' },
    'two-panel-widgets': { extend: 'apostrophe-widgets' },
    'content-widgets': { extend: 'apostrophe-widgets' },

    // Layout Widgets
    'columns-widgets': { extend: 'apostrophe-widgets' },

  }
});
