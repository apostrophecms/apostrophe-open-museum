module.exports = {
  sanitizeHtml: {
    allowedClasses: {
      'p': ['o-body', 'o-meta'],
      'h2': ['o-section-header'],
      'h3': ['o-headline'],
      'h4': ['o-subheadline']
    },
    allowedTags: [
      'h2', 'h3', 'h4', 'p', 'a', 'ul', 'ol', 'li', 'strong', 'em', 'blockquote'
    ],
    allowedSchemes: ['http', 'https', 'ftp', 'mailto', 'tel']
  }
};
