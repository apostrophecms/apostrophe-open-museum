module.exports = {        
   name: 'artwork',
   extend: 'apostrophe-pieces',
   label: 'Artwork',
   pluralLabel: 'Artworks',
   contextual:  true,
   addFields: [
    {
      name: '_objectType',
      label: 'Type of Object',
      type: 'joinByOne',
      withType: 'category-object-type',
      filters: {
        projection: {
          _url: 1,
          slug: 1,
          title: 1,
          type: 1
        }
      }
    },
    {
      name: '_location',
      label: 'Location of Object',
      type: 'joinByOne',
      withType: 'location',
      filters: {
        projection: {
          _url: 1,
          slug: 1,
          title: 1,
          type: 1
        }
      }
    },
    {
      name: '_artist',
      label: 'Artist',
      type: 'joinByOne',
      withType: 'artist',
      filters: {
        projection: {
          _url: 1,
          slug: 1,
          title: 1,
          type: 1,
          description: 1,
          thumbnail: 1
        }
      }
    },
    {
      name: 'medium',
      label: 'Medium',
      type: 'string'
    },
    {
      name: 'dimensions',
      label: 'Dimensions',
      type: 'string'
    },
    {
      name: 'year',
      label: 'Year',
      type: 'integer'
    },
    {
      name: 'thumbnail',
      label: 'Thumbnail',
      type: 'singleton',
      widgetType: 'apostrophe-images',
      options: {
        limit: [ 1 ]
      }
    }
   ]
};