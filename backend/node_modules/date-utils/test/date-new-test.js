var vows   = require('vows');
var assert = require('assert');

require('../lib/date-utils.js');

vows.describe('Date New').addBatch({
    'can return a new object from today static method': {
        topic: function () { return Date.today(); },
        'returns the correct time': function (date) {
            var compare = new Date().clearTime();
            assert.equal(date.valueOf(), compare.valueOf());
        }
    },

    'clearTime() works': {
        topic: function() { return new Date().clearTime(); },
        'returns the correct value': function (date) {
            var compare = new Date();
            compare.setHours(0);
            compare.setMinutes(0);
            compare.setSeconds(0);
            compare.setMilliseconds(0);

            assert.equal(date.valueOf(), compare.valueOf());
        }
    },

    'clearUTCTime() works': {
        topic: function() { return new Date().clearUTCTime(); },
        'returns the correct value': function (date) {
            var compare = new Date();
            compare.setUTCHours(0);
            compare.setUTCMinutes(0);
            compare.setUTCSeconds(0);
            compare.setUTCMilliseconds(0);

            assert.equal(date.valueOf(), compare.valueOf());
        }
    },

    'today() works': {
        topic: function() {
            return Date.today();
        },
        'returns the correct value': function(date) {
            var compare = new Date().clearTime();
            assert.equal(date.valueOf(), compare.valueOf());
        }
    },

    'UTCtoday() works': {
        topic: function() {
            return Date.UTCtoday();
        },
        'returns the correct value': function(date) {
            var compare = new Date().clearUTCTime();
            assert.equal(date.valueOf(), compare.valueOf());
        }
    },

    'yesterday() works': {
        topic: function() {
            return Date.yesterday();
        },
        'returns the correct value': function(date) {
            var compare = new Date().clearTime();
            compare.setSeconds(compare.getSeconds() - 86400);
            assert.equal(date.valueOf(), compare.valueOf());
        }
    },

    'UTCyesterday() works': {
        topic: function() {
            return Date.UTCyesterday();
        },
        'returns the correct value': function(date) {
            var compare = new Date().clearUTCTime();
            compare.setSeconds(compare.getSeconds() - 86400);
            assert.equal(date.valueOf(), compare.valueOf());
        }
    },

    'tomorrow() works': {
        topic: function() {
            return Date.tomorrow();
        },
        'returns the correct value': function(date) {
            var compare = new Date().clearTime();
            compare.setSeconds(compare.getSeconds() + 86400);
            assert.equal(date.valueOf(), compare.valueOf());
        }
    },

    'UTCtomorrow() works': {
        topic: function() {
            return Date.UTCtomorrow();
        },
        'returns the correct value': function(date) {
            var compare = new Date().clearUTCTime();
            compare.setSeconds(compare.getSeconds() + 86400);
            assert.equal(date.valueOf(), compare.valueOf());
        }
    }

}).export(module);