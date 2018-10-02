var assert = require('assert');
var moment = require('moment');

describe('launder', function() {

	var launder = require('../index.js')();

  it('should exist', function() {
    assert(launder);  
  });

  describe('instantiation', function(){

	  it('should have default filterTag function', function(){
	  	assert(typeof(launder.filterTag) === 'function');
	  	assert(launder.filterTag('  HEllo ') === 'hello');	 
	  });

	  it('should take a new filterTag function', function(){
	  	var launderWithFilterTag = require('../index.js')({
	  		filterTag: function(tag){
	  			return 'punk';
	  		}
	  	});

	  	assert(typeof(launderWithFilterTag.filterTag) === 'function');
	  	assert(launderWithFilterTag.filterTag('  HEllo ') === 'punk');	 
	  });

	});


  describe('methods', function(){
  	it('should have a `string` method', function() {      
      assert(launder.string);    
    });

    it('should have a `strings` method', function() {      
      assert(launder.strings);    
    });

    it('should have a `integer` method', function() {      
      assert(launder.integer);    
    });

    it('should have a `padInteger` method', function() {      
      assert(launder.padInteger);    
    });

    it('should have a `float` method', function() {      
      assert(launder.float);    
    });

    it('should have a `url` method', function() {      
      assert(launder.url);    
    });

    it('should have a `select` method', function() {      
      assert(launder.select);    
    });

    it('should have a `boolean` method', function() {      
      assert(launder.boolean);    
    });

    it('should have a `addBooleanFilterToCriteria` method', function() {      
      assert(launder.addBooleanFilterToCriteria);    
    });

    it('should have a `date` method', function() {      
      assert(launder.date);    
    });

    it('should have a `formatDate` method', function() {      
      assert(launder.formatDate);    
    });

    it('should have a `time` method', function() {      
      // just a flat circle
      assert(launder.time);    
    });

    it('should have a `formatTime` method', function() {      
      assert(launder.formatTime);    
    });

    it('should have a `tags` method', function() {      
      assert(launder.tags);    
    });

    it('should have a `id` method', function() {      
      assert(launder.id);    
    });

    it('should have an `ids` method', function() {      
      assert(launder.ids);    
    });
  });

	describe('string', function(){
		it('should do nothing to a good string', function(){			
			assert(launder.string('this is great') === 'this is great');	
		});

		it('should trim a string', function(){			
			assert(launder.string('  remove whitespace   ') === 'remove whitespace');	
		});

		it('should convert a number to a string', function(){			
			assert(launder.string(1234) === '1234');	
		});

		it('should convert a boolean to a string', function() {
			assert(launder.string(true) === 'true');
			assert(launder.string(false) === 'false');
		});

		it('should convert non-string/non-number to an empty string', function(){			
			assert(launder.string({an: 'object'}) === '');
			assert(launder.string(function(){ return 'still not a string' }) === '');	
		});

		it('should use a default for non-strings', function(){			
			assert(launder.string({an: 'object'}, 'default') === 'default');	
		});
	});

	describe('strings', function(){
		it('should do good stuff to an array of strings', function(){			
			var s = launder.strings(['  testing ', 123]);
			assert(s[0] === 'testing');
			assert(s[1] === '123');	
		});

		it('should return an empty array if we pass in something that is not an array', function(){			
			var s = launder.strings({an: 'object', is: 'not', an: 'array'});
			assert(Array.isArray(s));
			assert(s.length === 0);	
		});
	});

	describe('integer', function(){
		it('should do nothing to a good integer', function(){			
			assert(launder.integer(123) === 123);	
		});
		it('should convert a float to a rounded down integer', function(){			
			assert(launder.integer(42.42) === 42);	
		});
		it('should convet a string of an integer to an integer', function(){			
			assert(launder.integer('123') === 123);	
		});
		it('should convert a string of a float to a rounded down integer', function(){			
			assert(launder.integer('42.42') === 42);	
		});
		it('should convert a non-number to 0 by default', function(){			
			assert(launder.integer('nah') === 0);	
		});
		it('should convert a non-number to the passed in default', function(){			
			assert(launder.integer('nah', 5) === 5);	
		});
		it('should set a value below min to min', function(){			
			assert(launder.integer(5, null, 10) === 10);	
		});
		it('should set a value above max to max', function(){			
			assert(launder.integer(25, null, null, 20) === 20);	
		});
		it('should set a non-number with no default to min', function(){			
			assert(launder.integer('nah', null, 10, 20) === 10);	
		});
	});

	describe('padInteger', function(){
		it('should add 0s to to an integer shorter than the pad', function(){			
			assert(launder.padInteger(1234, 10) === '0000001234');	
		});
		it('should not add 0s to an integer longer than the pad', function(){			
			assert(launder.padInteger(123456789,5) === '123456789');	
		});
	});

describe('float', function(){
		it('should do nothing to a good float', function(){			
			assert(launder.float(42.42) === 42.42);	
		});
		it('should convert a string of a float to a float', function(){			
			assert(launder.float('42.42') === 42.42);	
		});
		it('should convert a non-number to 0 by default', function(){			
			assert(launder.float('nah') === 0);	
		});
		it('should convert a non-number to the passed in default', function(){			
			assert(launder.float('nah', 5.5) === 5.5);	
		});
		it('should set a value below min to min', function(){			
			assert(launder.float(5, null, 10.6) === 10.6);	
		});
		it('should set a value above max to max', function(){			
			assert(launder.float(25, null, null, 20.2) === 20.2);	
		});
		it('should set a non-number with no default to min', function(){			
			assert(launder.float('nah', null, 10.6, 20.2) === 10.6);	
		});
	});

	describe('url', function(){
		it('should do nothing to a good url', function(){			
			assert(launder.url('http://www.apostrophenow.org') === 'http://www.apostrophenow.org');	
		});
		it('should add http:// when missing', function(){			
			assert(launder.url('www.apostrophenow.org') === 'http://www.apostrophenow.org');	
		});
		it('should remove spaces from a url', function(){			
			assert(launder.url('this is not a url') === 'thisisnotaurl');	
		});
		it('should return the default if it is an empty string', function(){			
			assert(launder.url('', 'http://www.apostrophenow.org') === 'http://www.apostrophenow.org');	
		});
		it('should return the default if it is null', function(){			
			assert(launder.url(null, 'http://www.apostrophenow.org') === 'http://www.apostrophenow.org');	
		});
		it('should return the default if it is undefined', function(){			
			assert(launder.url(undefined, 'http://www.apostrophenow.org') === 'http://www.apostrophenow.org');	
		});
		it('should return the default if it is malicious', function(){			
			assert(launder.url('javascript:alert(\'All your base are belong to us\');', 'http://www.apostrophenow.org') === 'http://www.apostrophenow.org');	
		});
	});

	describe('select', function(){
		it('should do nothing to a good choice from an array', function(){			
			assert(launder.select('n', ['p','u','n','k']) === 'n');	
		});
		it('should do nothing to a good choice from an object', function(){			
			var s = launder.select('n', [
				{	name: 'Probably amazing', value: 'p' },
				{ name: 'Utterly incredible', value: 'u' },
				{ name: 'Never gonna give you up', value: 'n' },
				{ name: 'Kind hearted', value: 'k'}
				]);
			assert(s === 'n');
		});
		it('should return the default if choices is null', function(){			
			assert(launder.select('hi',null,'bye') === 'bye');	
		});
		it('should return the default if choices is empty', function(){			
			assert(launder.select('hi',[],'bye') === 'bye');	
		});
		it('should return the default if the choice is not found in an array', function(){			
			assert(launder.select('hi',['not','in','here'],'bye') === 'bye');	
		});
		it('should return the default if the choice is not found in an object', function(){			
			var s = launder.select('hi', [
				{ name: 'Not something', value: 'not' },
				{ name: 'Inside', value: 'in' },
				{ name: 'Here anymore', valu: 'here'}
				],'bye')
			assert(s === 'bye');	
		});
    it('should return the default if the choice is not found in an array', function(){      
      assert(launder.select('hi',['not','in','here'],'bye') === 'bye'); 
    });
	});
	

	describe('boolean', function(){
		it('should do nothing to a proper boolean', function(){
			assert(launder.boolean(true) === true);
			assert(launder.boolean(false) === false);
		});
		it('should convert a string to a proper boolean', function(){
			assert(launder.boolean('true') === true);
			assert(launder.boolean('false') === false);
		});
		it('should return true for string of `t`', function(){
			assert(launder.boolean('t') === true);
		});
		it('should return true for string of `y`', function(){
			assert(launder.boolean('y') === true);
		});
		it('should return true for string of `1`', function(){
			assert(launder.boolean('1') === true);
		});
		it('should return true for integer of 1', function(){
			assert(launder.boolean(1) === true);
		});
		it('should return false for an empty string', function(){
			assert(launder.boolean('') === false);
		});
		it('should return the default if nothing is passed', function(){
			assert(launder.boolean(null, 'yup') === 'yup');
		});
		it('should return false if nothing is passed and no default', function(){
			assert(launder.boolean(null) === false);
		});
	});

	describe('addBooleanFilterToCriteria', function(){
		var name = 'published';
		var criteria = {};
		var optionsTrue = { 'published': true };
		var optionsFalse = { 'published': false };
		var optionsEmpty = { 'published': ''};

		it('should not change criteria if option is `any`', function(){			
			launder.addBooleanFilterToCriteria('any', name, criteria);
			assert(criteria[name] === undefined);
		});

		it('should use a default of `any` if name is not found in options', function(){
			launder.addBooleanFilterToCriteria({}, name, criteria);
			assert(criteria[name] === undefined);
		});
		it('should use a default of `any` if options is null', function(){
			launder.addBooleanFilterToCriteria(null, name, criteria);
			assert(criteria[name] === undefined);
		});
		it('should use `name` property of `options` if `options` is an object', function(){
			launder.addBooleanFilterToCriteria(optionsTrue, name, criteria);
			assert(criteria[name] === true);
			var criteria2 = {};
			launder.addBooleanFilterToCriteria(optionsFalse, name, criteria2);
			assert(criteria2[name]['$ne'] === true);
		});
		it('should be able to use a boolean string `true` for options', function(){
			var criteria = {};
			launder.addBooleanFilterToCriteria('true', name, criteria);
			assert(criteria[name] === true);
		});
		it('should be able to use a boolean string `y` for options', function(){
			var criteria = {};
			launder.addBooleanFilterToCriteria('y', name, criteria);
			assert(criteria[name] === true);
		});
		it('should be able to use a real boolean for options', function(){
			var criteria = {};
			launder.addBooleanFilterToCriteria(true, name, criteria);
			assert(criteria[name] === true);
			var criteria = {};
			launder.addBooleanFilterToCriteria(false, name, criteria);
			assert(criteria[name]['$ne'] === true);
		});
		it('should treat empty string as false', function(){
			var criteria = {};
			launder.addBooleanFilterToCriteria('', name, criteria);
			assert(criteria[name]['$ne'] === true);
		});
		it('should treat empty string in an object as false', function(){
			var criteria = {};
			launder.addBooleanFilterToCriteria(optionsEmpty, name, criteria);
			assert(criteria[name]['$ne'] === true);
		});
		it('should take a default if `options` or `options[name]` is undefined', function(){
			var criteria = {};
			launder.addBooleanFilterToCriteria({}, name, criteria, false);
			assert(criteria[name]['$ne'] === true);
		});
	});

	describe('date', function(){
		it('should do nothing to a good date', function(){
			assert(launder.date('2015-02-19') === '2015-02-19');
		});
		it('should convert dates in MM/DD/YYYY format', function(){
			assert(launder.date('2/19/2015') === '2015-02-19');
		});
		it('should convert dates in MM/DD/YY format to the past century when that is closest', function() {
			assert(launder.date('2/19/99', new Date(2015, 1, 1)) === '1999-02-19');
		});
    it('should convert dates in MM/DD/YY format to the current century when that is closest', function() {
      assert(launder.date('2/19/15') === '2015-02-19');
    });
		it('should use the current year if in MM/DD format', function(){
			var year = moment().format('YYYY');
			assert(launder.date('2/19') === year+'-02-19');
		});
		it('should accept a date object', function(){
			assert(launder.date(new Date(2015, 1, 19)) == '2015-02-19');
		});
		it('should return current date if the date is not parsable', function(){
			assert(launder.date('waffles') === moment().format('YYYY-MM-DD'));
		});
		it('should return default if the date is not parsable', function(){
			assert(launder.date('waffles','1989-12-13') == '1989-12-13');
		});
	});	

	describe('formatDate', function(){
		it('should accept a date object', function(){
			assert(launder.formatDate(new Date(2015, 1, 19, 11, 22, 33)) == '2015-02-19');
		});
		it('should default to current date', function(){
			assert(launder.formatDate() == moment().format('YYYY-MM-DD'));
		});
	});

	describe('time', function(){
		it('should show me a good time', function(){
			assert(launder.time('12:34:56') === '12:34:56');
		});
    it('should show me a good, quick time', function(){
      assert(launder.time('12:34') === '12:34:00');
    });
    it('should show me a really quick good time', function(){
      assert(launder.time('12') === '12:00:00');
    });
		it('should convert 12h to 24h', function(){
			assert(launder.time('4:30pm') === '16:30:00');
		});
    it('should not require the m in pm', function(){
      assert(launder.time('4:30p') === '16:30:00');
    });
		it('should handle lower or uppercase meridiems', function(){
			assert(launder.time('4:30pm') === '16:30:00');
			assert(launder.time('4:30PM') === '16:30:00');
		});
		it('should accept dot as time separator', function(){
			assert(launder.time('4.30pm') === '16:30:00');
			assert(launder.time('4.30PM') === '16:30:00');
		});
		it('should accept dot and colon mixed as time separator', function(){
			assert(launder.time('3.52:05pm') === '15:52:05');
			assert(launder.time('4:32.23a') === '04:32:23');
		});
		it('should accept not accept any time separator', function(){
			assert(launder.time('3q52b05pm') !== '15:52:05');
			assert(launder.time('4 32 23a') !== '04:32:23');
			assert(launder.time('12Qpm') !== '12:00:00');
		});
		it('should handle no minutes', function(){
			assert(launder.time('4 PM') === '16:00:00');
		});
		it('should default to the current time', function(){
			assert(launder.time() === moment().format('HH:mm'));
		});
		it('should accept a default', function(){
			assert(launder.time(null, '12:00:00') == '12:00:00');
		});
	});


	describe('formatTime', function(){
		it('should accept a date object', function(){
			assert(launder.formatTime(new Date(2015, 1, 19, 11, 22, 33)) == '11:22:33');
		});
		it('should default to current time', function(){
			assert(launder.formatTime() == moment().format('HH:mm:ss'));
		});
	});

	describe('tags', function(){
		var goodTags = ['one', 'two', 'three'];
		var spaceyTags = [' One', 'TWO', '    three  '];
		var numberTags = [12, 34];
		var troubleTags = ['one', 2, {an: 'object'}, null, 'three'];

		it('should do nothing to a good array of tags', function(){
			var t = launder.tags(goodTags);
			assert(t.length === 3);
			assert(t[0] === 'one');
			assert(t[1] === 'two');
			assert(t[2] === 'three');
		});
		it('should apply default filterTag function', function(){
			var t = launder.tags(spaceyTags);
			assert(t.length === 3);
			assert(t[0] === 'one');
			assert(t[1] === 'two');
			assert(t[2] === 'three');
		});
		it('should return an empty array if you pass in something that is not an array', function(){
			var t = launder.tags({an: 'object', is: 'not', an: 'array'});
			assert(Array.isArray(t));
			assert(t.length === 0);	
		});
		it('should convert numbers to strings in tags', function(){
			var t = launder.tags(numberTags);
			assert(t.length === 2);
			assert(t[0] === '12');
			assert(t[1] === '34');
		});
		it('should remove things that are not strings or numbers', function(){
			var t = launder.tags(troubleTags);
			assert(t.length === 3);
			assert(t[0] === 'one');
			assert(t[1] === '2');
			assert(t[2] === 'three');
		});
		it('should take a filter function', function(){
			var t = launder.tags(numberTags,function(tag){ return tag+'0'});
			assert(t.length === 2);
			assert(t[0] === '120');
			assert(t[1] === '340');
		});
		it('should allow a different filter function to be set during initiation', function(){
			var launder = require('../index.js')({
				filterTag: function(tag){ return tag+'0'}
			});
			var t = launder.tags(numberTags);
			assert(t.length === 2);
			assert(t[0] === '120');
			assert(t[1] === '340');
		});
    it('should remove empty tags', function() {
      var t = launder.tags([ '1', '2', '' ]);
      assert(t.length === 2);
      assert(t[0] === '1');
      assert(t[1] === '2');
    });
	})

	describe('id', function(){
		it('should do nothing to a good id', function(){
			assert(launder.id('aBcD_1234') === 'aBcD_1234');
		});
		it('should return undefined if not valid', function(){
			assert(launder.id('@#%!#%') === undefined);
			assert(launder.id('abc 123') === undefined);
		});
		it('should return default if not valid', function(){
			assert(launder.id('@#%!#%','1234') === '1234')
		});
	})

	describe('ids', function(){
		var goodIds = ['1001', '1002', '1003'];
		var troubleIds = ['1001', '1002', {an: 'object'}, null, '1003'];
		it('should do nothing with a good array of ids', function(){
			var i = launder.ids(goodIds);
			assert(i.length === 3);
			assert(i[0] === '1001');
			assert(i[1] === '1002');
			assert(i[2] === '1003');
		});
		it('should return an empty array if you pass in something that is not an array', function(){
			var i = launder.ids({an: 'object', is: 'not', an: 'array'});
			assert(Array.isArray(i));
			assert(i.length === 0);	
		});
		it('should remove items that are not valid ids', function(){
			var i = launder.ids(troubleIds);
			assert(i.length === 3);
			assert(i[0] === '1001');
			assert(i[1] === '1002');
			assert(i[2] === '1003');
		});
	});




});
