$(function() {
  var $tagPicker = $('[data-tag-picker]');

  // Setup from previous search
  if ($tagPicker.length > 0 && omUtils.parseParams(window.location.search).tag) {
    var tags = omUtils.parseParams(window.location.search).tag;

    if (_.isString(tags)) {
      addTag($tagPicker.find('[data-tag-picker-selected][value="'+ tags +'"]'), $tagPicker)
    }

    if (_.isArray(tags)) {
      tags.forEach(function(tag) {
        addTag($tagPicker.find('[data-tag-picker-selected][value="' + tag + '"]'), $tagPicker)
      });
    }
  }

  // Events
  $tagPicker.find('[data-tag-picker-selected]').on('click', function (e) {
    e.preventDefault();
    var $this = $(this);
    var $parent = $this.parents('[data-tag-picker]');

    if ($this.attr('data-tag-picker-selected') === 'true') {
      removeTag($this, $parent);
    } else {
      addTag($this, $parent)
    }
  })

  $tagPicker.find('[data-tag-picker-submit]').on('click', function (e) {
    e.preventDefault();
    submitTags($tagPicker);
  })

  $tagPicker.find('[data-tag-picker-clear]').on('click', function (e) {
    e.preventDefault();
    clearTags($tagPicker)
  });

  // Actions
  function removeTag($tag, $context) {
    $tag.attr('data-tag-picker-selected', 'false')
    $context.find('[data-tag-picker-display] button[value="' + $tag.val() + '"]').remove();
    removeTagFromSelect($tag, $context)
  }

  function addTag($tag, $context) {
    $tag.attr('data-tag-picker-selected', 'true')
    var $clone = $tag.clone();
    $clone.removeAttr('data-tag-picker-selected');
    $clone.on('click', function (e) {
      var $this = $(this);
      e.preventDefault();
      $context.find('[data-tag-picker-selected]button[value="' + $this.val() + '"]').attr('data-tag-picker-selected', 'false');
      $this.remove();
    })
    addTagToSelect($tag, $context)
    $context.find('[data-tag-picker-display]').append($clone);
  }

  function clearTags($context) {
    $context.find('[data-tag-picker-selected]').attr('data-tag-picker-selected', 'false');
    $context.find('[data-tag-picker-display] button:not([data-tag-picker-submit])').remove();
  }

  function submitTags($tagPicker) {
    $tagPicker.parents('form').submit();
  }

  function addTagToSelect($tag, $context) {
    $context.siblings('select').find('option[value="' + $tag.attr('value') +'"]').attr('selected', 'selected')
  }

  function removeTagFromSelect($tag, $context) {
    $context.siblings('select').find('option[value="' + $tag.attr('value') +'"]').removeAttr('selected')
  }

});
