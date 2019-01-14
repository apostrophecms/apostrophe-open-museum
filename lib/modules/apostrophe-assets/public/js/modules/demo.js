$(function () {
  var $body = $('body');
  if ($body.hasClass('is-demo-mode--true')) {
    var modalCookieName = 'apostrophe-demo-modal-3894eee4eee427';
    var modalCookieValue = $.cookie(modalCookieName);

    var notificationCookieName = 'apostrophe-demo-notifiction-3ewwedd8333927';
    var notificationCookieValue = $.cookie(notificationCookieName);

    notificationListener();
    notificationAutoplay(notificationCookieValue);
    modalOn(modalCookieValue);
  }

  // listeners

  function pointerListener () {
    var $pointerTriggers = $('[data-demo-modal-pointer-link]');
    $pointerTriggers.hover(function () {
      pointerOn(this);
    }, function () {
      pointerOff(this);
    });
  }

  function notificationListener () {
    $body.on('click', '[data-demo-notification-toggle]', function (e) {
      notificationToggle();
    });
  }

  function modalCloseListener () {
    $body.on('click', '[data-demo-modal-close]', function () {
      modalOff();
    });
  }

  // actions

  function pointerOn (el) {
    $('[data-demo-modal-pointer="' + $(el).attr('data-demo-modal-pointer-link') + '"]').addClass('c-demo-modal__pointer-container--active');
    $body.addClass('is-highlighting-demo is-highlighting-demo--' + $(el).attr('data-demo-modal-pointer-link'));
  }

  function pointerOff (el) {
    $body.removeClass('is-highlighting-demo is-highlighting-demo--' + $(el).attr('data-demo-modal-pointer-link'));
    $('[data-demo-modal-pointer="' + $(el).attr('data-demo-modal-pointer-link') + '"]').removeClass('c-demo-modal__pointer-container--active');
  }

  function modalOn (modalCookieValue) {
    if (!modalCookieValue) {
      setTimeout(() => {
        $body.addClass('is-demo-mode--true--active');
        $body.find('[data-demo-modal-gif]').addClass('is-loaded');
        pointerListener();
        modalCloseListener();
      }, 2000);
    }
  }

  function modalOff () {
    $body.removeClass('is-demo-mode--true--active');
    $.cookie(modalCookieName, 1, {
      expires: 1
    });
  }

  function notificationToggle () {
    var $notification = $body.find('[data-demo-notification]');
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

  function notificationAutoplay (notificationCookieValue) {
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
