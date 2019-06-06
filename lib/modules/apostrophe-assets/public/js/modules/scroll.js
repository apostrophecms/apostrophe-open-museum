$(function () {
  var $body = $('body');

  $body.on('click', 'a[href*="#"]', function (e) {
    var $this = $(this);
    e.preventDefault();
    $('html, body').animate({
      scrollTop: $($this.attr('href')).offset().top
    }, 500, 'linear');
    var hash = $this.attr('href');
    hash = hash.slice(1);
    window.location.hash = hash;
  });
});
