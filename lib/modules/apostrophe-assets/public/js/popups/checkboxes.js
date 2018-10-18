$(function(){

  let $cb = $('[data-checkboxes]');

  // if ($mr.cb > 0 && omUtils.parseParams(window.location.search).eraMin) {
  //   let min = omUtils.parseParams(window.location.search).eraMin;
  //   let max = omUtils.parseParams(window.location.search).eraMax;
  //   populateGhostInputs([min, max]);
  //   populateDisplay([min, max])
  //   updateRange([min, max])
  // } else {
  //   populateDisplay()
  // }

  $cb.each(function(){
    let $context = $(this);

    // Events
    $context.find('[data-checkboxes-all]').on('click', function (e) {
      e.preventDefault();
      selectAll();
    })

    $context.find('[data-checkboxes-clear]').on('click', function (e) {
      e.preventDefault();
      clearAll();
    })

    $context.find('input').on('change', function() {
      console.log('changed');
      updateDisplay()
    })

    // Actions
    function selectAll() {
      $context.find('input').prop('checked', true).trigger('change')
    }

    function clearAll() {
      $context.find('input').prop('checked', false).trigger('change')
    }

    function updateDisplay() {
      let inputs = $context.find('input:checked');
      if (inputs.length > 1) {
        $context.find('[data-checkboxes-display]').text('Multiple Selected')
      } else if (inputs.length === 1) {
        $context.find('[data-checkboxes-display]').text(inputs.siblings('label').text())
      } else {
        $context.find('[data-checkboxes-display]').text('None Selected')
      }
      
    }

  })
});