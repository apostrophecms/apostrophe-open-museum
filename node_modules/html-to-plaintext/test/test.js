import assert from 'assert';
import getPlainText from '../src';
import { jsdom } from 'jsdom';

function getPlainTextFromHtmlString(text) {
  return getPlainText(jsdom(text));
}

describe('htmlToPlaintext', () => {
  it('should return the string hello', () => assert.equal('hello', getPlainTextFromHtmlString('hello')));
  it('should treat <br> as a line break', () => assert.equal('1\n2', getPlainTextFromHtmlString('1<br>2')));
  it('should treat <p> as a line break', () => assert.equal('1\n2', getPlainTextFromHtmlString('1<p>2</p>')));
  it('should ignore <br> at the end of a block', () => assert.equal('1\n2', getPlainTextFromHtmlString('1<p>2<br></p>')));
  it('should handle multiple <br> elements', () => assert.equal('1\n\n2', getPlainTextFromHtmlString('1<br><br>2')));
  it('should handle text inside a formatting element', () => {
    assert.equal('1\n2', getPlainTextFromHtmlString('<p>1</p>2'));
    assert.equal('1\n2', getPlainTextFromHtmlString('<p>1</p><p>2</p>'));
    assert.equal('\n1\n2', getPlainTextFromHtmlString('<p><br>1</p><p>2</p>'));
  })
});
