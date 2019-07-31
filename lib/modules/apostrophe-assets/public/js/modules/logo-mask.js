$(function () {
  var $logoMask = $('[data-logo-mask]');
  var $svg = $logoMask.find('svg');
  $logoMask.on('mouseenter', function (e) {
    this.iid = setInterval(function () {
      animate();
    }, 525);
  });

  $logoMask.on('mouseleave', function (e) {
    this.iid && clearInterval(this.iid);
  });

  function animate () {
    var $temp = $svg.find('image:first').clone();
    $svg.find('image:first').remove();
    $svg.append($temp);
  }
});
