$(function () {

  if (!$('[data-artwork-filters]').length > 0) {
    return
  }

  let $form = $('[data-artwork-filters]');

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
    let criteria = parseParams(window.location.search);    
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

  function parseParams(query) {
    var re = /([^&=]+)=?([^&]*)/g;
    var decodeRE = /\+/g; // Regex for replacing addition symbol with a space
    var decode = function (str) {
      return decodeURIComponent(str.replace(/\+/g, ' '));
    };
    var params = {},
      e;

    if (query) {
      if (query.substr(0, 1) == '?') {
        query = query.substr(1);
      }
      while (e = re.exec(query)) {
        var k = decode(e[1]);
        var v = decode(e[2]);
        if (params[k] !== undefined) {
          if (!$.isArray(params[k])) {
            params[k] = [params[k]];
          }
          params[k].push(v);
        } else {
          params[k] = v;
        }
      }
    }
    return params;
  }
});
