# Apostrophe Demo 2018

## Introduction

This demo is meant to serve two main goals: The first being it is fully styled, responsive, generic website to use as a starting point for your own Apostrophe developement. The second being a demonstration of a fully featured production-ready Apostrophe build: a host of widgets (both simple and complex), networks of related content (pieces), custom content taxonomy, importing pieces, maps, advanced Apostrophe configuration, etc, all while organizing code the way we, the ApostropheCMS maintainers, do in production.

## Request for Feedback

We're currently looking for feedback on what would make this a more useful demo and a more friendly repository for those just getting started with Apostrophe.

Some things we're trying to achieve:
- Maintainability and readability
- Organization
- Clear naming
- Hitting a sweet spot between friendly-for-beginners and enlightening-for-intermediates (what does this mean??)

Some things we're trying to avoid:
- Excessive dev tooling that is not Apostrophe-specific
- ???

## Overview of Scope

This demo site is designed to illustrate the basic needs of an art museum website. In addition to the concept of pages, it includes the following content types:

- Artworks
- Artists
- Object Types
- Locations
- Museum Staff Members
- Articles (Blog)
- Events

The content is connected as such

                               +---------------+
                               |               |
                               |               |
         +--------------------->    Artworks   |
         |                     |               |
         |                     |               |
         |                     +--+---------+--+
         |                        |         |
         |                        |         |
         v                        v         v

+----------------+   +---------------+   +--------------+    +--------------+
|                |   |               |   |              |    |              |
|                |   |               |   |              |    |              |
|  Object Type   |   |   Locations   |   |   Artists    |    |   Articles   |
|                |   |               |   |              |    |              |
|                |   |               |   |              |    |              |
+----------------+   +---------------+   +--------------+    +--------------+

                                 ^
                                 |
                     +-----------+---+   +----------------+
                     |               |   |                |
                     |               |   |                |
                     |    Events     |   |  Staff Members |
                     |               |   |                |
                     |               |   |                |
                     +---------------+   +----------------+

Along with pre-configured piece types are an array of widgets you can use to illustrate your content on pages. These range from various way to display images, to features and marquees, to excerpts of existing pieces, to layout widgets that let you nest widgets inside other widgets!

## Technical Details

### Front-end assets
All source CSS is written in LESS, which is the CSS prepocessor bundled with Apostrophe. All source CSS resides in `/lib/modules/apostrophe-assets/public/css` and is organized according the (ITCSS method)[https://www.xfive.co/blog/itcss-scalable-maintainable-css-architecture/]

#### Exceptions
`apostrophe-widgets` modules that require front-end JS to run every time the module gets 'ready' (loads for the first time, changes) have a 'player' that Apostrophe expects to find in the module's `/public/js/always.js` file by default. The slideshow widget is a good example of this  `/lib/modules/slideshow-widgets`. More on this pattern at (Adding a JavaScript widget player on the browser side)[https://apostrophecms.org/docs/tutorials/getting-started/custom-widgets.html#adding-a-java-script-widget-player-on-the-browser-side]

### MapQuest API + locations piece-type
This site has built-in map widgets and geocoding functionality for it's `locations` piece-type. It runs both these operations through MapQuests free API. (You can register a key and secret here)[https://developer.mapquest.com/plan_purchase/steps/business_edition/business_edition_free/register]

#### MapQuest configuration
This site expects the MapQuest key and secret to be a part of the `options` object for the `locations` piece-type. This repo does not come bundled with a key and secret and so you will see both server and client console warnings when doing things that requre them.

You can add your key and secret like this

in `/app.js`

```
var apos = require('apostrophe')({
  shortName: 'apostrophe-demo-2018',
  modules: {
    // ... other module configurations
    'locations': {
      'mapQuest': {
        key: 'xxxxxxxx',
        secret: 'yyyyyyy'
      }
    }
  };
```

If you want to avoid putting API credentials in public repositories, (this guide illustrates creating environment-specific module settings)[https://apostrophecms.org/docs/tutorials/getting-started/settings.html#changing-the-value-for-a-specific-server-only]


### Using piece-types as taxonomy
In most use cases of `apostrophe-pieces` the developer wants to be able to leverage the on-screen visualization of that content (When you have a blog, you expect there to be pages that represent blog posts and widgets that display excerpts of those posts).

You can also use meta pieces to create taxonomy for visualized pieces. In this demo, the piece-type `categories-object-types` is a meta piece that is not represented on-screen but joined to `artworks` to help categorize them. The benefit of doing this type of categorization as a piece instead of a tag is that the pool of categories does not get polluted by the global tag landscape. You also get the familiar manager interface for managing your meta pieces.

(As with tags, you get built-in filtering of your joins with some added configuration)[https://apostrophecms.org/docs/tutorials/intermediate/cursors.html#filtering-joins-browsing-profiles-by-market]

A full example of this is illustrated in the schema of `artworks` `/lib/modules/artworks/index.js`

