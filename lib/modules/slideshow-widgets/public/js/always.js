apos.define('slideshow-widgets', {
  extend: 'apostrophe-widgets',
  construct: function (self, options) {
    self.play = function ($widget, data, options) {
      // We're not using Babel in this project, so use "var" for the
      // deepest backwards compatibility. If you want to, you can use
      // Babel and webpack, then code in the latest version of JavaScript
      // and push the output file to Apostrophe as an asset
      var $current = $widget.find('[data-gallery-current]');
      var $total = $widget.find('[data-gallery-total]');
      var $slideshow = $widget.find('[data-slideshow-length]');
      // Notice we never use a global CSS selector - we always
      // "find" inside $widget. Swiper uses the DOM directly, so use
      // [0] to get from the jQuery object to the DOM element
      var imageSwiper = new Swiper($widget.find('[data-slideshow]')[0], {
        loop: true,
        autoHeight: true,
        slideToClickedSlide: false,
        threshold: 10,
        effect: 'fade',
          fadeEffect: {
            crossFade: true
          },
        pagination: {
          clickable: false
        }
      });

      var descriptionSwiper = new Swiper($widget.find('[data-slideshow-descriptions]')[0], {
        loop: true,
        effect: 'fade',
        fadeEffect: {
          crossFade: true
        }
      });

      $widget.find('[data-slideshow-prev]').on('click', function() {
        imageSwiper.slidePrev()
      })

      $widget.find('[data-slideshow-next]').on('click', function() {
        imageSwiper.slideNext()
      })

      if (imageSwiper.on) {
        imageSwiper.on('slideChange', function () {
          $current.text(imageSwiper.realIndex + 1)
          descriptionSwiper.slideTo(imageSwiper.realIndex + 1)
        })
        imageSwiper.on('click', function() {
          imageSwiper.slideNext()
        })
      }
    };
  }
});