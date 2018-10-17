module.exports = {          
   extend: 'apostrophe-widgets',
   label: 'Map',
   addFields: [
     {
      name: '_locations',
      label: 'Locations to Display',
      type: 'joinByArray',
      withType: 'location'
     }
   ],
   construct: function (self, options) {
    self.filterForDataAttribute = function(widget) { return widget; }
    const superGetCreateSingletonOptions = self.getCreateSingletonOptions;
      self.getCreateSingletonOptions = function (req) {

        const locationModule = self.apos.docs.getManager('location').find(req, {}).options.module;
        let browserOptions = superGetCreateSingletonOptions(req);
        browserOptions.mapQuestKey = locationModule.options.mapQuest.key

        return browserOptions;
      };
   }
};