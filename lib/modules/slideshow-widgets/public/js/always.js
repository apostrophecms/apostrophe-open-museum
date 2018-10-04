apos.define('slideshow-widgets', {
  extend: 'apostrophe-widgets',
  construct: function (self, options) {
    self.play = function ($widget, data, options) {
      let $current = $widget.find('[data-gallery-current]');
      let $total = $widget.find('[data-gallery-total]');
      let $slideshow = $widget.find('[data-slideshow-length]');
      let $body = $('body');
      let imageSwiper = new Swiper('[data-slideshow]', {
        loop: true,
        autoHeight: true,
        // // Navigation arrows
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      });

      let descriptionSwiper = new Swiper('[data-slideshow-descriptions]', {
        loop: true,
        effect: 'fade',
        fadeEffect: {
          crossFade: true
        }
      });

      $body.on('click', $widget.find('[data-slideshow-prev]'), function () {
        imageSwiper.slidePrev()
      })

      $body.on('click', $widget.find('[data-slideshow-next]'), function () {
        imageSwiper.slideNext()
      })

      imageSwiper.on('slideChange', function() {
        $current.text(imageSwiper.realIndex + 1)
        descriptionSwiper.slideTo(imageSwiper.realIndex+ 1)
      })
    };
  }
});