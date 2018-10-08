module.exports = {          
   extend: 'apostrophe-pieces-widgets',          
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
           _url: 1,
           slug: 1,
           title: 1,
           type: 1
         }
       }
     }
   ]          
};