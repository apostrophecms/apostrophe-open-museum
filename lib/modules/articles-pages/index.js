module.exports = {          
  extend: 'apostrophe-pieces-pages',          
  label: 'Article Page',
  name: 'article-pages',
  piecesFilters: [
    { name: 'year' },
    { name: 'month' },
    { name: 'day' },
    { name: 'tags' }
  ]
};