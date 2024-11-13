var vows   = require('vows');
var assert = require('assert');

require('../lib/date-utils.js');

function pad(str, length) {
    str = String(str);
    while (str.length < length) {
        str = '0' + str;
    }
    return str;
}

vows.describe('Date Format').addBatch({
    'can return month abbreviations as static method': {
        topic: function () { return new Date(123456789); },
        'returns the correct abbreviated month': function (date) {
            assert.equal(date.getMonthAbbr(), 'Jan');
        }
    },
    
    'can return month as static method': {
        topic: function () { return new Date(123456789); },
        'returns the correct month': function (date) {
            assert.equal(date.getMonthAbbr(), 'Jan');
        }
    },
    
    'can return common log formatted string': {
        topic: function () { return new Date(Date.UTC(2011, 0, 1, 1, 1, 1, 0)); },
        'returns the correct clf string': function (date) {
            var tz = pad(Math.abs(date.getTimezoneOffset() / 0.6), 4);
            if (date.getTimezoneOffset() > 0) {
                tz = '-' + tz;
            }
            
            date = new Date(date.valueOf() + date.getTimezoneOffset() * 60000);
            assert.equal(date.toCLFString(), '01/Jan/2011:01:01:01 ' + tz);
        }
    },

    'can return correctly formatted toFormat': {
        topic: function () { var topic = new Date(2011, 2, 1);
                             topic.addHours(13)
                                  .addMinutes(11)
                                  .addSeconds(41)
                                  .addMilliseconds(23);
                             return topic;
                           },
        'returns correctly': function (date) {
            assert.equal(date.toFormat('YYYY'), '2011');
            assert.equal(date.toFormat('YY'), '11');
            assert.equal(date.toFormat('M'), '3');
            assert.equal(date.toFormat('MM'), '03');
            assert.equal(date.toFormat('MMM'), 'Mar');
            assert.equal(date.toFormat('MMMM'), 'March');
            assert.equal(date.toFormat('D'), '1');
            assert.equal(date.toFormat('DD'), '01');
            assert.equal(date.toFormat('DDD'), 'Tue');
            assert.equal(date.toFormat('DDDD'), 'Tuesday');
            assert.equal(date.toFormat('H'), '1');
            assert.equal(date.toFormat('HH'), '01');
            assert.equal(date.toFormat('HH24'), '13');
            assert.equal(date.toFormat('MI'), '11');
            assert.equal(date.toFormat('SS'), '41');
            assert.equal(date.toFormat('LL'), '023');
        },

        'returns complex formats correct': function (date) {
            assert.equal(date.toFormat('DDD-MMM-YYYY'), 'Tue-Mar-2011');
            assert.equal(date.toFormat('DD/MM/YY'), '01/03/11');
            assert.equal(date.toFormat('D:M:YY'), '1:3:11');
        }
    },

    'can return correctly formatted toUTCFormat': {
        topic: function () {
            return topic = new Date(Date.UTC(2011, 2, 1, 13, 11, 41, 23));
        },

        'returns correctly': function (date) {
            assert.equal(date.toUTCFormat('YYYY'), '2011');
            assert.equal(date.toUTCFormat('YY'), '11');
            assert.equal(date.toUTCFormat('M'), '3');
            assert.equal(date.toUTCFormat('MM'), '03');
            assert.equal(date.toUTCFormat('MMM'), 'Mar');
            assert.equal(date.toUTCFormat('MMMM'), 'March');
            assert.equal(date.toUTCFormat('D'), '1');
            assert.equal(date.toUTCFormat('DD'), '01');
            assert.equal(date.toUTCFormat('DDD'), 'Tue');
            assert.equal(date.toUTCFormat('DDDD'), 'Tuesday');
            assert.equal(date.toUTCFormat('H'), '1');
            assert.equal(date.toUTCFormat('HH'), '01');
            assert.equal(date.toUTCFormat('HH24'), '13');
            assert.equal(date.toUTCFormat('MI'), '11');
            assert.equal(date.toUTCFormat('SS'), '41');
            assert.equal(date.toUTCFormat('LL'), '023');
        },

        'returns complex formats correct': function (date) {
            assert.equal(date.toUTCFormat('DDD-MMM-YYYY'), 'Tue-Mar-2011');
            assert.equal(date.toUTCFormat('DD/MM/YY'), '01/03/11');
            assert.equal(date.toUTCFormat('D:M:YY'), '1:3:11');
        }
    },

    'can return correct months': {
        topic: function () { return new Date(2011, 0, 1); },
        'returns Jan correcty': function (date) { assert.equal(date.addMonths(0).toFormat('MMM'), 'Jan'); },
        'returns Feb correcty': function (date) { assert.equal(date.addMonths(1).toFormat('MMM'), 'Feb'); },
        'returns Mar correcty': function (date) { assert.equal(date.addMonths(1).toFormat('MMM'), 'Mar'); },
        'returns Apr correcty': function (date) { assert.equal(date.addMonths(1).toFormat('MMM'), 'Apr'); },
        'returns May correcty': function (date) { assert.equal(date.addMonths(1).toFormat('MMM'), 'May'); },
        'returns Jun correcty': function (date) { assert.equal(date.addMonths(1).toFormat('MMM'), 'Jun'); },
        'returns Jul correcty': function (date) { assert.equal(date.addMonths(1).toFormat('MMM'), 'Jul'); },
        'returns Aug correcty': function (date) { assert.equal(date.addMonths(1).toFormat('MMM'), 'Aug'); },
        'returns Sep correcty': function (date) { assert.equal(date.addMonths(1).toFormat('MMM'), 'Sep'); },
        'returns Oct correcty': function (date) { assert.equal(date.addMonths(1).toFormat('MMM'), 'Oct'); },
        'returns Nov correcty': function (date) { assert.equal(date.addMonths(1).toFormat('MMM'), 'Nov'); },
        'returns Dec correcty': function (date) { assert.equal(date.addMonths(1).toFormat('MMM'), 'Dec'); },
    },

    'can return database formatted string': {
        topic: function () { return new Date(Date.UTC(2011, 0, 1, 1, 1, 1, 0)); },
        'returns the correct database string': function (date) {
            assert.equal(date.toDBString(), '2011-01-01 01:01:01');
        }
    },
    
    'when passing an argument to toYMD': {
        topic: function () { return new Date(2011, 0, 1, 1, 1, 1, 0).toYMD('-'); },
        'the correct string is returned': function (topic) {
            assert.equal(topic, '2011-01-01');
        }
    },

    'when passing an empty argument to toYMD': {
        topic: function () { return new Date(2011, 0, 1, 1, 1, 1, 0).toYMD(''); },
        'the correct string is returned': function (topic) {
            assert.equal(topic, '20110101');
        }
    },

    'when passing no argument to toYMD': {
        topic: function () { return new Date(2011, 0, 1, 1, 1, 1, 0).toYMD(); },
        'the correct default is chosen and the string is returned': function (topic) {
            assert.equal(topic, '2011-01-01');
        }
    }

}).export(module);
