apos.define('random-met-artwork-widgets', {
  extend: 'apostrophe-widgets',
  construct: function (self, options) {
    self.play = function ($widget, data, options) {
      self.api('get', {}, function (data) {
        if (data.error) {
          console.error('Error finding eligible match from MET API, try again later');
          $widget.find('[data-loading]').text('An error has occurred, try again later');
          return;
        }
        $widget.find('[data-random-met-artwork-widget]').removeClass('c-random-met-artwork--loading').addClass('c-random-met-artwork--loaded');
        $widget.find('img').attr('src', data.primaryImage).attr('alt', data.artistDisplayName + ': ' + data.title);
        $widget.find('figcaption').text(data.artistDisplayName + ': ' + data.title);
      }, function (err) {
        if (err) {
          console.log(err);
        }
      });
    };
  }
});
