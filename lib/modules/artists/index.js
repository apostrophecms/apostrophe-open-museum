module.exports = {        
   name: 'artist',        
   extend: 'apostrophe-pieces',        
   label: 'Artist',        
   pluralLabel: 'Artists',        
   addFields: [
     {
       name: 'description',
       label: 'Short Description',
       help: 'This is displayed at the bottom of an Artwork show page that this artist is associated with',
       type: 'string',
       textarea: true
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