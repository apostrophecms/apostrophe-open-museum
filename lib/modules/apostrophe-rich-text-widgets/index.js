module.exports = {
  sanitizeHtml: {
    // If you add sanitize-html module options here, remember to include
    // EVERYTHING that should be allowed for that option. You are overriding
    // the defaults.
    allowedClasses: {
      '*': ['o-title', 'o-headline', 'o-subheadline', 'o-section-header', 'o-body', 'o-pull-quote']
    },
    allowedTags: [
      'span', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'p', 'a',
      'ul', 'ol', 'nl', 'li', 'b', 'i', 'strong', 'em', 'strike', 'code',
      'hr', 'br', 'div',
      'table', 'thead', 'caption', 'tbody', 'tr', 'th', 'td', 'pre'
    ],
    allowedSchemes: ['http', 'https', 'ftp', 'mailto', 'tel']
  }
};
