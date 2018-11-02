module.exports = {          
  label: 'Featured Article Widget',          
  addFields: [
    {
      name: 'label',
      label: 'Meta Label',
      help: 'Small meta description for context of widget',
      type: 'string'
    },
    {
      name: 'description',
      label: 'Short Description',
      type: 'string',
      help: 'Optional custom short description',
      textarea: true,
      required: true
    },
    {
      name: '_article',
      label: 'Article to feature',
      type: 'joinByOne',
      withType: 'article',
      filters: {
        projection: {
          _url: 1,
          slug: 1,
          title: 1,
          type: 1,
          publishedAt: 1,
          tags: 1,
          thumbnail: 1,
        }
      }
    }
  ]
};