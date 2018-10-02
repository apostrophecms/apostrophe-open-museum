# HTML to Plaintext

Converts HTML to plain text. Preserves line breaks well, but doesn't care about rendering bullet points, numbers, etc.

This is a port of a solution I found here: http://stackoverflow.com/a/30088920

How to use:
```
import getPlainText from 'html-to-plaintext`;

const plainText = getPlainText(document.getElementsByClassName('.editor')[0]);
```

To run the tests:

```
npm install
npm test
```
