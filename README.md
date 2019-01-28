# Open Museum

See it in action at http://demo.apostrophecms.org.

## Introduction

This project is meant to serve two main goals: The first being it is fully styled, responsive, generic website to use as a starting point for your own Apostrophe development. The second being a demonstration of a fully featured production-ready Apostrophe build: a host of widgets (both simple and complex), networks of related content (pieces), custom content taxonomy, importing pieces, maps, advanced Apostrophe configuration, etc. all while organizing code the way we, the ApostropheCMS maintainers, do in production.

## Getting Started

You need to [set up your environment](https://apostrophecms.org/docs/tutorials/getting-started/setting-up-your-environment.html) with the necessities to develop with Apostrophe.

Then run:

```
git clone https://github.com/apostrophecms/apostrophe-open-museum
cd apostrophe-open-museum
npm install
node app apostrophe-users:add admin admin
[enter password when prompted]
node app
```

You should now be able to access the site at: [http://localhost:3000](http://localhost:3000), and log in to start editing by visiting [/login](http://localhost:3000/login).

See the [Apostrophe tutorials](https://apostrophecms.org/docs/tutorials/getting-started/index.html) for more information.

## Request for Feedback

We're currently looking for feedback on what would make this a more useful demo and a more friendly repository for those just getting started with Apostrophe.

Some things we're trying to achieve:
- Maintainability and readability
- Organization
- Clear naming
- Hitting a sweet spot between friendly-for-beginners and enlightening-for-intermediates.

Some things we're trying to avoid:
- Excessive dev tooling that is not Apostrophe-specific
- Inconsistent coding style
- Practices we wouldn't follow in our own client projects

## Overview of Scope

This demo site is designed to illustrate the basic needs of an art museum website. In addition to the concept of pages, it includes the following content types:

- Artworks
- Artists
- Object Types ("Sculpture", "Painting", etc.)
- Locations
- Museum Staff Members
- Articles (Blog)
- Events

The relationships between the content types look like this:

```

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

```

These relationships are represented with Apostrophe [joins](https://apostrophecms.org/docs/tutorials/getting-started/schema-guide.html#code-join-by-array-code) between piece types.

Along with pre-configured piece types, this projecgt also includes a variety of widgets you can use to illustrate your content on pages. These range from various ways to display images, to features and marquees, to excerpts of existing pieces, to layout widgets that let you nest widgets inside other widgets!

## Technical Details

### Front-end assets
All source CSS is written in LESS, which is the CSS prepocessor bundled with Apostrophe. All source CSS resides in `/lib/modules/apostrophe-assets/public/css` and is organized according the [ITCSS method](https://www.xfive.co/blog/itcss-scalable-maintainable-css-architecture/). Note that you can also use Webpack and SASS in your own project, as long as you generate a CSS file as output and push that to Apostrophe as an asset.

#### Exceptions
`apostrophe-widgets` modules that require front-end JS to run every time the module gets 'ready' (loads for the first time, changes) have a 'player' that Apostrophe expects to find in the module's `/public/js/always.js` file by default. The slideshow widget is a good example of this  `/lib/modules/slideshow-widgets`. For more on this pattern see [adding a JavaScript widget player on the browser side](https://apostrophecms.org/docs/tutorials/getting-started/custom-widgets.html#adding-a-java-script-widget-player-on-the-browser-side)

### MapQuest API + locations piece type
This site has built-in map widgets and geocoding functionality for its `locations` piece type. It runs both of these operations through MapQuest's free API. [You can register a key and secret here](https://developer.mapquest.com/plan_purchase/steps/business_edition/business_edition_free/register).

> You do not have to enter a "callback URL" when signing up and generating your API key. Just leave that field blank.

#### MapQuest configuration
This site expects the MapQuest key and secret to be a part of the `options` object for the `locations` piece type. This repo does not come bundled with a key and secret and so you will see both server and client console warnings when doing things that require them.

You can add your key and secret like this:

In `/app.js`

```

const apos = require('apostrophe')({
  shortName: 'apostrophe-open-museum',
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

You can also place configuration like this in the module's own index.js file, i.e. `lib/modules/locations/index.js`

**You should not put API credentials in public repositories.** [This guide illustrates creating environment-specific module settings](https://apostrophecms.org/docs/tutorials/getting-started/settings.html#changing-the-value-for-a-specific-server-only) without adding them to your repository.

### Using piece types as taxonomy

In most use cases of `apostrophe-pieces` the developer wants to be able to leverage the on-screen visualization of that content. For instance, when you have a blog, you expect there to be pages that represent blog posts and widgets that display excerpts of those posts. You would also expect a "blog page" that displays all of the posts, with the ability to use paginatio or infinite scroll to reach older content.

But pieces have other applications. You can also use "meta pieces" to create a taxonomy for visualized pieces. In this demo, the piece type `categories-object-types` is a "meta piece" that is not represented on-screen but is instead joined to `artworks` to help categorize them.

The benefit of doing this type of categorization as a piece instead of as a tag is that the pool of categories does not get polluted by the global tag landscape, and only those with permission to edit the categories can change the list of possibilities. You also get the familiar manager interface for managing your meta pieces.

[As with tags, you get built-in filtering of your joins with some added configuration](https://apostrophecms.org/docs/tutorials/intermediate/cursors.html#filtering-joins-browsing-profiles-by-market).

A full example of this is illustrated in the schema of `artworks` `/lib/modules/artworks/index.js`

