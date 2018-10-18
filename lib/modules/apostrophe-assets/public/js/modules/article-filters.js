$(function () {

  if (!$('[data-article-filters]').length > 0) {
    return
  }

  console.log('loud and proud');
  

  let $form = $('[data-article-filters]');

  init()

  function init() {
    prepFilterInputs()
    // $form.find('[data-auto-submit]').on('change', function () {
    //   submit()
    // })
  }

  function submit() {
    $form.submit()
  }

  function prepFilterInputs() {
    let criteria = omUtils.parseParams(window.location.search);
    $form.find(':input').each(function() {
      let $this = $(this);
      
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
