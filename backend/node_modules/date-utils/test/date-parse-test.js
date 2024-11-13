var vows   = require('vows');
var assert = require('assert');

require('../lib/date-utils.js');

vows.describe('Date Parse').addBatch({
    'can instantiate milliseconds': {
        topic: function () { return new Date(123456789); },
        'returns a valid date object': function (date) {
            assert.ok(date);
        },
        'returns a correct value': function (date) {
            assert.equal(date.valueOf(), 123456789);
        }
    },
    
    'can instantiate string': {
        topic: function () { return new Date('Jan 1, 2011 01:01:01 GMT'); },
        'returns a valid date object': function (date) {
            assert.ok(date);
        },
        'returns a correct value': function (date) {
            assert.equal(date.valueOf(), 1293843661000);
        }
    },
    
    'can instantiate arguments': {
        topic: function () { return new Date(2011, 1, 1, 1, 1, 1, 0); },
        'returns a valid date object': function (date) {
            assert.ok(date);
        }
    },
    
    'can parse normal date': {
        topic: function () { return Date.parse('Jan 1, 2011 01:01:01 GMT'); },
        'returns a correct value': function (milli) {
            assert.equal(milli, 1293843661000);
        }
    },
    'can parse ISO-8601': {
        topic: function () { return Date.parse('2011-01-01T01:01:01Z'); },
        'returns a correct value': function (milli) {
            assert.equal(milli, 1293843661000);
        }
    },
    'can parse custom format': {
        topic: function () {
            return Date.parse('20/6/2011 8:30', 'd/M/y H:m');
        },
        'returns a correct value': function (milli) {
            var against = new Date(2011, 5, 20, 8, 30, 0);
            assert.equal(milli, against.valueOf());
        }
    },
    'parse custom format with full month name': {
        topic: function () {
            return Date.parse('June 20, 2011 08:30:00', 'MMM d, y H:m:s');
        },
        'returns a correct value': function (milli) {
            var against = new Date(2011, 5, 20, 8, 30, 0);
            assert.equal(milli, against.valueOf());
        }
    },
    'parse custom format with abbr month name': {
        topic: function () {
            return Date.parse('Jun 20, 2011 08:30:00', 'MMM d, y H:m:s');
        },
        'returns a correct value': function (milli) {
            var against = new Date(2011, 5, 20, 8, 30, 0);
            assert.equal(milli, against.valueOf());
        }
    },
    'parse custom format with 12 hr clock': {
        topic: function () {
            return Date.parse('June 20, 2011 08:30:00AM', 'MMM d, y h:m:sa');
        },
        'returns a correct value': function (milli) {
            var against = new Date(2011, 5, 20, 8, 30, 0);
            assert.equal(milli, against.valueOf());
        }
    },
    'parse mysql date format': {
        topic: function () {
            return Date.parse('2011-06-20 08:30:00', 'y-M-d H:m:s');
        },
        'returns a correct value': function (milli) {
            var against = new Date(2011, 5, 20, 8, 30, 0);
            assert.equal(milli, against.valueOf());
        }
    },
    'parse us date format w/o time': {
        topic: function () {
            return Date.parse('6/20/2011', 'M/d/y');
        },
        'returns a correct value': function (milli) {
            var against = new Date(2011, 5, 20);
            assert.equal(milli, against.valueOf());
        }
    },
    'parse us date format with time': {
        topic: function () {
            return Date.parse('6/20/2011 00:00:01', 'M/d/y H:m:s');
        },
        'returns a correct value': function (milli) {
            var against = new Date(2011, 5, 20, 0, 0, 1);
            assert.equal(milli, against.valueOf());
        }
    },
    'parse uk date format w/o time': {
        topic: function () {
            return Date.parse('20/6/2011', 'd/M/y');
        },
        'returns a correct value': function (milli) {
            var against = new Date(2011, 5, 20);
            assert.equal(milli, against.valueOf());
        }
    },
    'parse uk date format with time': {
        topic: function () {
            
            return Date.parse('20/6/2011 00:00:01', 'd/M/y H:m:s');
        },
        'returns a correct value': function (milli) {
            var against = new Date(2011, 5, 20, 0, 0, 1);
            assert.equal(milli, against.valueOf());
        }
    }
}).export(module);
