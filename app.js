const path = require('path');

const apos = require('apostrophe')({
  shortName: 'apostrophe-open-museum',

  // Apostrophe Blog bundle
  bundles: [ 'apostrophe-blog' ],

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

    // Instantiate apostrophe-templates module and give it a fallback directory to better separate
    // apostrophe customization from totally project-specific templates.
    //
    // Apostrophe will try to serve a template from the module rendering it before falling back
    // to this global `/views` folder.

    'apostrophe-templates': { viewsFolderFallback: path.join(__dirname, 'views') },

    // This module adds Nunjucks "helper functions" and helper data useful in all templates.
    //
    // Some uses include special template functions that go outside the depth of nunjucks,
    // often by exporting lodash functions, and reusable, centralized apos.area configurations.
    //
    // The module also contains useful library .js files containing ready-made options
    // for areas and the like, which other modules `require` to avoid redundancy.
    'helpers': { extend: 'apostrophe-module' },

    // Makes extra information available to the `styleguide.html` page template.
    'styleguide': {},

    // apostrophe-seo adds custom meta data to the HEAD tag of a page, per page https://github.com/apostrophecms/apostrophe-seo
    // This is not automatic, see also views/layout.html
    'apostrophe-seo': {},

    // apostrophe-open-graph adds custom OG meta data to the HEAD tag of a page, per page https://github.com/apostrophecms/apostrophe-open-graph
    // This is not automatic, see also views/layout.html
    'apostrophe-open-graph': {},

    // apostrophe-pieces-import lets you turn on an CSV import interface per piece type https://github.com/apostrophecms/apostrophe-pieces-import
    'apostrophe-pieces-import': {},

    // apostrophe-favicons adds an interface for controlling a favicon for your site and outputs the proper link tags https://github.com/apostrophecms/apostrophe-favicons
    'apostrophe-favicons': {},
    // apostrophe-favicons arrives as a bundle of modules, apostrophe-favicons-global is the
    // specific one we want to activate
    'apostrophe-favicons-global': {},

    // Custom schema fields in "Page Settings" for the "default" page type
    'default-pages': { extend: 'apostrophe-custom-pages' },

    // Categorical "meta" piece types
    'category-object-types': { extend: 'apostrophe-pieces' },

    // Various piece types visualized around the site
    'artists': { extend: 'apostrophe-pieces' },
    'artists-pages': { extend: 'apostrophe-pieces-pages' },
    'locations': {
      extend: 'apostrophe-pieces',
      'mapQuest': {
        key: 'twADhGQBQQW3R9laAAzA0UaTj5Rrrskj',
        secret: 'stTrrmLbEcY9B9Wc'
      }
    },
    'locations-pages': { extend: 'apostrophe-pieces-pages' },
    'locations-widgets': { extend: 'apostrophe-widgets' },

    'artworks': { extend: 'apostrophe-pieces' },
    'artworks-pages': { extend: 'apostrophe-pieces-pages' },
    'artworks-widgets': { extend: 'apostrophe-pieces-widgets' },

    'articles': { extend: 'apostrophe-blog' },
    'articles-pages': { extend: 'apostrophe-blog-pages' },
    'articles-widgets': { extend: 'apostrophe-blog-widgets' },
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
    'random-met-artwork-widgets': { extend: 'apostrophe-widgets' },

    // Layout Widgets
    'columns-widgets': { extend: 'apostrophe-widgets' }

  }
});
