$(function () {

  if (!$('[data-artwork-filters]').length > 0) {
    return
  }

  var $form = $('[data-artwork-filters]');

  init()

  function init() {
    prepFilterInputs()
    $form.find('[data-auto-submit]').on('change', function () {
      submit()
    })
  }

  function submit() {
    $form.submit()
  }

  function prepFilterInputs() {
    var criteria = omUtils.parseParams(window.location.search);
    $form.find(':input').each(function() {
      var $this = $(this);
      
      if (criteria[$this.attr('name')]) {
        if ($this[0].nodeName === 'INPUT') {
          $this.val(criteria[$this.attr('name')])
        }
        if ($this[0].nodeName === 'SELECT') {
          $this.find('option[value="' + criteria[$this.attr('name')] + '"]').attr('selected')
        }
        $(this).val(criteria[$(this).attr('name')])
      }
    })
  }
});
