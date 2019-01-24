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
    self.filterForDataAttribute = function (widget) { return widget; };
    const superGetCreateSingletonOptions = self.getCreateSingletonOptions;
    self.getCreateSingletonOptions = function (req) {
      // We are interested in the mapquest options given to the
      // corresponding pieces module
      const locations = self.apos.modules.locations;
      let browserOptions = superGetCreateSingletonOptions(req);
      if (locations.options.mapQuest) {
        browserOptions.mapQuestKey = locations.options.mapQuest.key;
      } else {
        console.warn('WARNING: locations-widgets has no MapQuest key, see README');
      }
      return browserOptions;
    };
  }
};
