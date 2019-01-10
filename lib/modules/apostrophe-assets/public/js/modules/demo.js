$(function () {
  var $body = $('body');
  if ($body.hasClass('is-demo-mode--true')) {
    var $pointerTriggers = $('[data-demo-modal-pointer-link]');
    $pointerTriggers.hover(function () {
      $('[data-demo-modal-pointer="' + $(this).attr('data-demo-modal-pointer-link') + '"]').addClass('c-demo-modal__pointer-container--active');
    }, function () {
      $('[data-demo-modal-pointer="' + $(this).attr('data-demo-modal-pointer-link') + '"]').removeClass('c-demo-modal__pointer-container--active');
    });
  }

  var cookieName = 'apostrophe-demo-modal38927';
  var cookieValue = $.cookie(cookieName);

  // activate modal
  if (true) {
    setTimeout(() => {
      $body.addClass('is-demo-mode--true--active');
    }, 2000);
  } else {
    notificationListener();
  }

  $body.on('click', '[data-demo-modal-close]', function () {
    $body.removeClass('is-demo-mode--true--active');
    $.cookie(cookieName, 1, {
      expires: 1
    });
    notificationListener();
  });

  function notificationPlayer () {

  }

  function notificationListener () {
    var lastScrollTop = $(window).scrollTop();
    $(window).on('scroll', function (e) {
      if ($(this).scrollTop() > lastScrollTop) {
        notificationPlayer();
      }
      lastScrollTop = $(this).scrollTop();
    });
  };
});
