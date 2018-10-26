$(function() {
  let $body = $('body');

  $body.on('click', '[data-bio-box-trigger]', function(e) {
    e.preventDefault()
    let $this = $(this);
    if ($this.attr('data-bio-box-trigger') === 'active') {
      $this.attr('data-bio-box-trigger', 'inactive')
      clearBio($this);
    } else {
      $('[data-bio-box-trigger]').attr('data-bio-box-trigger', 'inactive')
      $this.attr('data-bio-box-trigger', 'active')
      populateBio($this);
    }
  })

  $body.on('click', '[data-bio-box-close]', function(e) {
    e.preventDefault();
    $('[data-bio-box]').attr('data-bio-box', 'inactive')
  })

  function populateBio($el) {
    let $target = $el.nextAll('[data-bio-box]:first');
    $('[data-bio-box]').attr('data-bio-box', 'inactive');
    $target.attr('data-bio-box', 'active')
    $target.find('[data-bio-box-description]').text($el.attr('data-bio'))
    $target.find('[data-bio-box-role]').text($el.attr('data-role'))
    // let left = $el.offset().left;
    let left = $el.offset().left - ($el.outerWidth() / 2);
    console.log(left);
    
    $target.find('[data-bio-box-indicator]').css('left', left + 'px')
  }

  function clearBio($el) {
    $el.nextAll('[data-bio-box]:first').attr('data-bio-box', 'inactive')
  }
});