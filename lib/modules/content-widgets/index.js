module.exports = {
  label: 'Mixed Content',
  addFields: [
    {
      name: 'headline',
      label: 'Headline',
      type: 'string'
    },
    {
      name: '_content',
      label: 'Content to Link',
      type: 'joinByArray',
      withType: ['artwork', 'artist', 'article', 'event'],
      filters: {
        projection: {
          _url: 1,
          slug: 1,
          title: 1,
          type: 1,
          thumbnail: 1,
          year: 1
        }
      }
    }
  ]        
};