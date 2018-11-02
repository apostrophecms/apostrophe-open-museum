/* global omUtils */

$(function () {
  var $cb = $('[data-checkboxes]');

  $cb.each(function () {
    var $context = $(this);
    var qs = omUtils.parseParams(window.location.search);
    if (qs[$context.find('input:first').attr('name')]) {
      var appliedFilters = qs[$context.find('input:first').attr('name')];
      if (_.isArray(appliedFilters)) {
        appliedFilters.forEach(function (filter) {
          $context.find('input[value="' + filter + '"]').prop('checked', true).trigger('change');
        });
      }
      if (_.isString(appliedFilters)) {
        $context.find('input[value="' + appliedFilters + '"]').prop('checked', true).trigger('change');
      }
      updateDisplay();
    }

    // Events
    $context.find('[data-checkboxes-all]').on('click', function (e) {
      e.preventDefault();
      selectAll();
    });

    $context.find('[data-checkboxes-clear]').on('click', function (e) {
      e.preventDefault();
      clearAll();
    });

    $context.find('input').on('change', function () {
      updateDisplay();
    });

    // Actions
    function selectAll () {
      $context.find('input').prop('checked', true).trigger('change');
    }

    function clearAll () {
      $context.find('input').prop('checked', false).trigger('change');
    }

    function updateDisplay () {
      var inputs = $context.find('input:checked');
      if (inputs.length > 1) {
        $context.find('[data-checkboxes-display]').text('Multiple Selected');
      } else if (inputs.length === 1) {
        $context.find('[data-checkboxes-display]').text(inputs.siblings('label').text());
      } else {
        $context.find('[data-checkboxes-display]').text('None Selected');
      }
    }
  });
});
