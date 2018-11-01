module.exports = {          
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
     // This hydrates joins and returns them to the front-end player's `data` param
    self.filterForDataAttribute = function(widget) { return widget; }
    const superGetCreateSingletonOptions = self.getCreateSingletonOptions;
    self.getCreateSingletonOptions = function (req) {

      const locationModule = self.apos.docs.getManager('location').find(req, {}).options.module;
      let browserOptions = superGetCreateSingletonOptions(req);
      if (locationModule.options.mapQuest) {
        browserOptions.mapQuestKey = locationModule.options.mapQuest.key
      } else {
        console.warn('WARNING: locations-widgets has no MapQuest key, see README') 
      }
      return browserOptions;
    };
  }
};