/* global omUtils */

$(function () {
  var $mr = $('[data-multirange]');

  if ($mr.length > 0 && omUtils.parseParams(window.location.search).eraMin) {
    var min = omUtils.parseParams(window.location.search).eraMin;
    var max = omUtils.parseParams(window.location.search).eraMax;
    populateGhostInputs([min, max]);
    populateDisplay([min, max]);
    updateRange([min, max]);
  } else {
    populateDisplay();
  }

  // Events
  $mr.find('[data-multirange-input]').on('input change', function () {
    var $this = $mr.find('[data-multirange-input]:not(.ghost)');
    populateDisplay($this.val().split(','));
    populateGhostInputs($mr.find('[data-multirange-input]').val().split(','));
  });

  $mr.find('[data-multirange-all]').on('click', function (e) {
    e.preventDefault();
    resetRange();
  });

  // Actions
  // We don't actually use the multirange form element, instead populate 2 hidden inputs
  function populateGhostInputs (data) {
    $mr.find('[data-multirange-ghost-min]').val(data[0]);
    $mr.find('[data-multirange-ghost-max]').val(data[1]);
  }

  function populateDisplay (data) {
    if (data) {
      $mr.find('[data-multirange-display]').text(data[0] + 'CE - ' + data[1] + ' CE');
    } else {
      $mr.find('[data-multirange-display]').text('Open to select a range');
    }
  }

  function updateRange (data) {
    $mr.find('[data-multirange-input]')[0].value = data[0] + ',' + data[1];
  }

  function resetRange () {
    var $this = $mr.find('[data-multirange-input]:not(.ghost)');
    var data = [$this.attr('min'), $this.attr('max')];
    populateGhostInputs(data);
    updateRange(data);
    populateDisplay(data);
  }
});
