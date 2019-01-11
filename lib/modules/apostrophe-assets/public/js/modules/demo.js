$(function () {
  var $body = $('body');
  if ($body.hasClass('is-demo-mode--true')) {
    var $notification = $body.find('[data-demo-notification]');
    var $pointerTriggers = $('[data-demo-modal-pointer-link]');
    $pointerTriggers.hover(function () {
      $('[data-demo-modal-pointer="' + $(this).attr('data-demo-modal-pointer-link') + '"]').addClass('c-demo-modal__pointer-container--active');
      $body.addClass('is-highlighting-demo is-highlighting-demo--' + $(this).attr('data-demo-modal-pointer-link'));
    }, function () {
      $body.removeClass('is-highlighting-demo is-highlighting-demo--' + $(this).attr('data-demo-modal-pointer-link'));
      $('[data-demo-modal-pointer="' + $(this).attr('data-demo-modal-pointer-link') + '"]').removeClass('c-demo-modal__pointer-container--active');
    });
  }

  var modalCookieName = 'apostrophe-demo-modal-38944eee427';
  var modalCookieValue = $.cookie(modalCookieName);

  var notificationCookieName = 'apostrophe-demo-notifiction-3ewwe8333927';
  var notificationCookieValue = $.cookie(notificationCookieName);

  notificationListener();
  notificationAutoplay();

  // activate modal
  if (!modalCookieValue) {
  // if (true) {
    setTimeout(() => {
      $body.addClass('is-demo-mode--true--active');
      $body.find('[data-demo-modal-gif]').addClass('is-loaded');
    }, 2000);
  }

  $body.on('click', '[data-demo-modal-close]', function () {
    $body.removeClass('is-demo-mode--true--active');
    $.cookie(modalCookieName, 1, {
      expires: 1
    });
  });

  function notificationListener () {
    $body.on('click', '[data-demo-notification-toggle]', function (e) {
      notificationToggle();
    });
  }

  function notificationToggle () {
    $notification.toggleClass('c-demo-notification--hidden');
    if ($notification.hasClass('c-demo-notification--hidden')) {
      $notification.find('[data-demo-notification-toggle]').text('←');
      $.cookie(notificationCookieName, 1, {
        expires: 1
      });
    } else {
      $notification.find('[data-demo-notification-toggle]').text('→');
    }
  }

  function notificationAutoplay () {
    if (!notificationCookieValue) {
      var lastScrollTop = $(window).scrollTop();
      $(window).on('scroll', function (e) {
        if ($(this).scrollTop() > lastScrollTop && !notificationCookieValue) {
          $(window).unbind('scroll');
          setTimeout(() => {
            notificationToggle();
          }, 2000);
        } else {
          $(window).unbind('scroll');
        }
        lastScrollTop = $(this).scrollTop();
      });
    }
  };
});
