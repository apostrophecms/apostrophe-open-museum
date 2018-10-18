// This will provide the basic open/close actions for the various popup filter interfaces across the site
// Each type of popup will have it's own interaction player responsible for how that particular popup behaves

$(function() {
  let $body = $('body');

  // Event handling
  $body.on('click', '[data-popup-open]', function(e) {
    e.preventDefault();
    e.stopPropagation();
    openPopup($(this).parents('[data-popup]'));
  });

  // Actions
  function openPopup($popup) {
    
    let $window = $(window);
    let $popups = $('[data-popup]');

    // Close open popups before opening this one
    $popups.each(function() {
      closePopup($(this))
    })

    $popup.attr('data-popup', 'active');

    $popup.find('[data-popup-window]').on('click', function (e) {
      e.stopPropagation()
    });

    // have to bind this after stopping bubbling
    $popup.find('[data-popup-close]').on('click', function (e) {
      e.preventDefault()
      e.stopPropagation()
      closePopup($popup)
    });

    $window.one('click', function () {
      closePopup($popup)
    });
  }

  function closePopup($popup) {
    $popup.attr('data-popup', 'inactive');
  }
  
});