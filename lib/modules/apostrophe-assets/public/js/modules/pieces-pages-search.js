$(function () {
  $('body').on('keypress', '[data-apos-ajax-context] input[name="search"]', function (e) {
    if (e.which === 13) {
      // Do not fire the first button in the form (default behavior), which would
      // remove the first selected tag
      e.preventDefault();
      e.stopPropagation();
    }
  });
});
