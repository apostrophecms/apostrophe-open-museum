module.exports = {          
   extend: 'apostrophe-pieces-pages',
   name: 'artwork-pages',
   label: 'Artwork Page',
   addFields: [],
   perPage: 15,
   piecesFilters: [
    { name: 'objectType' },
    { name: 'location' },
    { name: 'artist' },
   ]
};