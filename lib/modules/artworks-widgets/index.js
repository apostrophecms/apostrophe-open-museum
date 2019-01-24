module.exports = {
  label: 'Artwork Widget',
  addFields: [
    {
      name: 'title',
      label: 'Widget Title',
      type: 'string'
    },
    {
      name: '_page',
      label: 'Page to Link',
      type: 'joinByOne',
      withType: 'apostrophe-page',
      filters: {
        projection: {
          // _url: 1 gives us slug, type, tags and whatever is currently
          // considered essential to populate _url properly
          _url: 1,
          title: 1
        }
      }
    }
  ]
};
