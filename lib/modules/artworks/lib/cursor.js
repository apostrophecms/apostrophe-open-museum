module.exports = {
  construct: function (self, options) {
    self.addFilter('eraMin', {
      def: false,
      launder: function (value) {
        return self.apos.launder.integer(value);
      },
      safeFor: 'public',
      finalize: function (callback) {

        var eraMin = self.get('eraMin');
        if (!eraMin) {
          return setImmediate(callback);
        }

        self.and({
          year: {
            $gte: eraMin
          }
        });
        return callback(null);

      }
    });
    
    self.addFilter('eraMax', {
      def: false,
      launder: function (value) {
        return self.apos.launder.integer(value);
      },
      safeFor: 'public',
      finalize: function (callback) {

        var eraMax = self.get('eraMax');
        if (!eraMax) {
          return setImmediate(callback);
        }

        self.and({
          year: {
            $lte: eraMax
          }
        });
        return callback(null);

      }
    });
  }
};