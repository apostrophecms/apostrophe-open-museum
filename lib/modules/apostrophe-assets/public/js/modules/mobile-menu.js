$(function () {
  var $body = $('body');
  var stateClass = 's-show-menu';

  $body.on('click', '[data-mobile-trigger]', function () {
    $body.toggleClass(stateClass);
  });
});
