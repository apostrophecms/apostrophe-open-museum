module.exports = {        
  label: 'Slideshow',
  addFields: [
    {
      name: 'imageType',
      label: 'What type of images',
      type: 'select',
      choices: [
        { label: 'Media Library', value: 'media', showFields: [ 'images' ] },
        { label: 'Artwork', value: 'artworks', showFields: [ '_artworks' ] }
      ]
    },
    {
      name: 'title',
      label: 'Gallery Title',
      type: 'string'
    },
    {
      name: 'images',
      label: 'Images',
      type: 'singleton',
      widgetType: 'apostrophe-images',
      options: {
        aspectRatio: false
      }
    },
    {
      name: '_artworks',
      label: 'Artwork',
      type: 'joinByArray',
      withType: 'apostrophe-page',
      filters: {
        projection: {
          // _url: 1 gets us slug, type, tags and anything else essential
          // to populating the _url property
          _url: 1,
          title: 1
        }
      }
    }
  ]
};