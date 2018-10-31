module.exports = {        
  extend: 'apostrophe-widgets',
  label: 'Slideshow',
  addFields: [
    {
      name: 'imageType',
      label: 'What type of images',
      type: 'select',
      choices: [
        { label: 'Media Library', value: 'media', showFields:['images'], def: true },
        { label: 'Artwork', value: 'artworks', showFields:['_artworks'] }
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
          _url: 1,
          slug: 1,
          title: 1,
          type: 1
        }
      }
    }
  ]
};