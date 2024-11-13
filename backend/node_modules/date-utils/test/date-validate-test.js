var vows   = require('vows');
var assert = require('assert');

require('../lib/date-utils.js');

vows.describe('Date Validate').addBatch({
    'can deal with hours': {
        topic: function () { return Date; },
        'false for less than 0': function (topic) {
            assert.equal(topic.validateHour(-1), false);
        },
        'false for greater than 23': function (topic) {
            assert.equal(topic.validateHour(24), false);
        },
        'true for in range': function (topic) {
            assert.equal(topic.validateHour(12), true);
        }
    },

    'can deal with minutes': {
        topic: function () { return Date; },
        'false for less than 0': function (topic) {
            assert.equal(topic.validateMinute(-1), false);
        },
        'false for greater than 59': function (topic) {
            assert.equal(topic.validateMinute(60), false);
        },
        'true for in range': function (topic) {
            assert.equal(topic.validateMinute(30), true);
        }
    },

    'can deal with seconds': {
        topic: function () { return Date; },
        'false for less than 0': function (topic) {
            assert.equal(topic.validateSecond(-1), false);
        },
        'false for greater than 59': function (topic) {
            assert.equal(topic.validateSecond(60), false);
        },
        'true for in range': function (topic) {
            assert.equal(topic.validateSecond(30), true);
        }
    },

    'can deal with milliseconds': {
        topic: function () { return Date; },
        'false for less than 0': function (topic) {
            assert.equal(topic.validateMillisecond(-1), false);
        },
        'false for greater than 999': function (topic) {
            assert.equal(topic.validateMillisecond(1000), false);
        },
        'true for in range': function (topic) {
            assert.equal(topic.validateMillisecond(500), true);
        }
    },

    'can deal with years': {
        topic: function () { return Date; },
        'false for less than 0': function (topic) {
            assert.equal(topic.validateYear(-1), false);
        },
        'false for greater than 9999': function (topic) {
            assert.equal(topic.validateYear(10000), false);
        },
        'true for in range': function (topic) {
            assert.equal(topic.validateYear(5000), true);
        }
    },

    'can deal with days': {
        topic: function () { return Date; },
        'false for less than 0': function (topic) {
            assert.equal(topic.validateDay(-1, 2011, 12), false);
        },
        'false for greater than 31': function (topic) {
            assert.equal(topic.validateDay(32, 2011, 12), false);
        },
        'true for in range': function (topic) {
            assert.equal(topic.validateDay(10, 2011, 11), true);
        }
    },

    'static compare works': {
        topic: function () { return Date.today(); },
        '-1 for yesterday': function (topic) {
            assert.equal(Date.compare(Date.yesterday(), topic), -1);
        },
        '1 for tomorrow': function (topic) {
            assert.equal(Date.compare(Date.tomorrow(), topic), 1);
        },
        '0 for today': function (topic) {
            assert.equal(Date.compare(Date.today(), topic), 0);
        }
    },

    'static equals works': {
        topic: function () { return Date.today(); },
        'equal for today': function (topic) {
            assert.equal(Date.equals(topic, Date.today()), true);
        },
        'false for tomorrow': function (topic) {
            assert.equal(Date.equals(topic, Date.tomorrow()), false);
        },
        'false for yesterday': function (topic) {
            assert.equal(Date.equals(topic, Date.yesterday()), false);
        }
    },

    'static equalsDay works': {
        topic: function () { return Date.today(); },
        'true for today': function (topic) {
            assert.equal(Date.equalsDay(topic, Date.today()), true);
        },
        'false for yesterday': function (topic) {
            assert.equal(Date.equalsDay(topic, Date.yesterday()), false);
        },
    },

    'getDayNumberFromName works': {
        topic: function () { return Date; },
        'sunday works': function (topic) {
            assert.equal(topic.getDayNumberFromName('sunday'), 0);
        },
        'sun works': function (topic) {
            assert.equal(topic.getDayNumberFromName('sun'), 0);
        },
        'su works': function (topic) {
            assert.equal(topic.getDayNumberFromName('su'), 0);
        },
        'monday works': function (topic) {
            assert.equal(topic.getDayNumberFromName('monday'), 1);
        },
        'mon works': function (topic) {
            assert.equal(topic.getDayNumberFromName('mon'), 1);
        },
        'mo works': function (topic) {
            assert.equal(topic.getDayNumberFromName('mo'), 1);
        },
        'tuesday works': function (topic) {
            assert.equal(topic.getDayNumberFromName('tuesday'), 2);
        },
        'tue works': function (topic) {
            assert.equal(topic.getDayNumberFromName('tue'), 2);
        },
        'tu works': function (topic) {
            assert.equal(topic.getDayNumberFromName('tu'), 2);
        },
        'wednesday works': function (topic) {
            assert.equal(topic.getDayNumberFromName('wednesday'), 3);
        },
        'wed works': function (topic) {
            assert.equal(topic.getDayNumberFromName('wed'), 3);
        },
        'we works': function (topic) {
            assert.equal(topic.getDayNumberFromName('we'), 3);
        },
        'thursday works': function (topic) {
            assert.equal(topic.getDayNumberFromName('thursday'), 4);
        },
        'thu works': function (topic) {
            assert.equal(topic.getDayNumberFromName('thu'), 4);
        },
        'th works': function (topic) {
            assert.equal(topic.getDayNumberFromName('th'), 4);
        },
        'friday works': function (topic) {
            assert.equal(topic.getDayNumberFromName('friday'), 5);
        },
        'fri works': function (topic) {
            assert.equal(topic.getDayNumberFromName('fri'), 5);
        },
        'fr works': function (topic) {
            assert.equal(topic.getDayNumberFromName('fr'), 5);
        },
        'saturday works': function (topic) {
            assert.equal(topic.getDayNumberFromName('saturday'), 6);
        },
        'sat works': function (topic) {
            assert.equal(topic.getDayNumberFromName('sat'), 6);
        },
        'sa works': function (topic) {
            assert.equal(topic.getDayNumberFromName('sa'), 6);
        },
        'everything else does not': function (topic) {
            assert.equal(topic.getDayNumberFromName('junk'), undefined);
        }
    },

    'getMonthNumberFromName works': {
        topic: function () { return Date; },
        'january works': function (topic) {
            assert.equal(topic.getMonthNumberFromName('january'), 0);
        },
        'jan works': function (topic) {
            assert.equal(topic.getMonthNumberFromName('jan'), 0);
        },
        'february works': function (topic) {
            assert.equal(topic.getMonthNumberFromName('february'), 1);
        },
        'feb works': function (topic) {
            assert.equal(topic.getMonthNumberFromName('feb'), 1);
        },
        'march works': function (topic) {
            assert.equal(topic.getMonthNumberFromName('march'), 2);
        },
        'mar works': function (topic) {
            assert.equal(topic.getMonthNumberFromName('mar'), 2);
        },
        'april works': function (topic) {
            assert.equal(topic.getMonthNumberFromName('april'), 3);
        },
        'apr works': function (topic) {
            assert.equal(topic.getMonthNumberFromName('apr'), 3);
        },
        'may works': function (topic) {
            assert.equal(topic.getMonthNumberFromName('may'), 4);
        },
        'june works': function (topic) {
            assert.equal(topic.getMonthNumberFromName('june'), 5);
        },
        'jun works': function (topic) {
            assert.equal(topic.getMonthNumberFromName('jun'), 5);
        },
        'july works': function (topic) {
            assert.equal(topic.getMonthNumberFromName('july'), 6);
        },
        'jul works': function (topic) {
            assert.equal(topic.getMonthNumberFromName('jul'), 6);
        },
        'august works': function (topic) {
            assert.equal(topic.getMonthNumberFromName('august'), 7);
        },
        'aug works': function (topic) {
            assert.equal(topic.getMonthNumberFromName('aug'), 7);
        },
        'september works': function (topic) {
            assert.equal(topic.getMonthNumberFromName('september'), 8);
        },
        'sep works': function (topic) {
            assert.equal(topic.getMonthNumberFromName('sep'), 8);
        },
        'october works': function (topic) {
            assert.equal(topic.getMonthNumberFromName('october'), 9);
        },
        'oct works': function (topic) {
            assert.equal(topic.getMonthNumberFromName('oct'), 9);
        },
        'november works': function (topic) {
            assert.equal(topic.getMonthNumberFromName('november'), 10);
        },
        'nov works': function (topic) {
            assert.equal(topic.getMonthNumberFromName('nov'), 10);
        },
        'december works': function (topic) {
            assert.equal(topic.getMonthNumberFromName('december'), 11);
        },
        'dec works': function (topic) {
            assert.equal(topic.getMonthNumberFromName('dec'), 11);
        }
    },

    'getWeekNumber works': {
        'the first week': {
            topic: function() { return new Date(2013, 0, 1); },
            'must be 1': function(topic) {
                assert.strictEqual(topic.getWeekNumber(), 1);
            }
        },

        'week 16': {
            topic: function() { return new Date(2013, 3, 15); },
            'must be 16': function(topic) {
                assert.strictEqual(topic.getWeekNumber(), 16);
            }
        }
    },

    'getFullWeekNumber works': {
        'the first week': {
            topic: function() { return new Date(2013, 0, 1); },
            'must be 1': function(topic) {
                assert.strictEqual(topic.getFullWeekNumber(), "01");
            }
        },

        'week 16': {
            topic: function() { return new Date(2013, 3, 15); },
            'must be 16': function(topic) {
                assert.strictEqual(topic.getFullWeekNumber(), "16");
            }
        }
    },

    'getMonthNameFromNumber works': {
        topic: function () { return Date; },
        '0 works': function (topic) {
            assert.equal(topic.getMonthNameFromNumber(0), 'January');
        },
        '1 works': function (topic) {
            assert.equal(topic.getMonthNameFromNumber(1), 'February');
        },
        '2 works': function (topic) {
            assert.equal(topic.getMonthNameFromNumber(2), 'March');
        },
        '3 works': function (topic) {
            assert.equal(topic.getMonthNameFromNumber(3), 'April');
        },
        '4 works': function (topic) {
            assert.equal(topic.getMonthNameFromNumber(4), 'May');
        },
        '5 works': function (topic) {
            assert.equal(topic.getMonthNameFromNumber(5), 'June');
        },
        '6 works': function (topic) {
            assert.equal(topic.getMonthNameFromNumber(6), 'July');
        },
        '7 works': function (topic) {
            assert.equal(topic.getMonthNameFromNumber(7), 'August');
        },
        '8 works': function (topic) {
            assert.equal(topic.getMonthNameFromNumber(8), 'September');
        },
        '9 works': function (topic) {
            assert.equal(topic.getMonthNameFromNumber(9), 'October');
        },
        '10 works': function (topic) {
            assert.equal(topic.getMonthNameFromNumber(10), 'November');
        },
        '11 works': function (topic) {
            assert.equal(topic.getMonthNameFromNumber(11), 'December');
        }
    },

    'getMonthAbbrFromNumber works': {
        topic: function () { return Date; },
        '0 works': function (topic) {
            assert.equal(topic.getMonthAbbrFromNumber(0), 'Jan');
        },
        '1 works': function (topic) {
            assert.equal(topic.getMonthAbbrFromNumber(1), 'Feb');
        },
        '2 works': function (topic) {
            assert.equal(topic.getMonthAbbrFromNumber(2), 'Mar');
        },
        '3 works': function (topic) {
            assert.equal(topic.getMonthAbbrFromNumber(3), 'Apr');
        },
        '4 works': function (topic) {
            assert.equal(topic.getMonthAbbrFromNumber(4), 'May');
        },
        '5 works': function (topic) {
            assert.equal(topic.getMonthAbbrFromNumber(5), 'Jun');
        },
        '6 works': function (topic) {
            assert.equal(topic.getMonthAbbrFromNumber(6), 'Jul');
        },
        '7 works': function (topic) {
            assert.equal(topic.getMonthAbbrFromNumber(7), 'Aug');
        },
        '8 works': function (topic) {
            assert.equal(topic.getMonthAbbrFromNumber(8), 'Sep');
        },
        '9 works': function (topic) {
            assert.equal(topic.getMonthAbbrFromNumber(9), 'Oct');
        },
        '10 works': function (topic) {
            assert.equal(topic.getMonthAbbrFromNumber(10), 'Nov');
        },
        '11 works': function (topic) {
            assert.equal(topic.getMonthAbbrFromNumber(11), 'Dec');
        }
    },

    'getLastMonthName': {
        'when it is January': {
            topic: function () {
                return new Date("January 15, 2010 12:00:00");
            },
            'returns December': function(instance) {
                assert.equal(instance.getLastMonthName(), 'December');
            }
        },
        'when it is Feburary': {
            topic: function () {
                return new Date("Feburary 15, 2010 12:00:00");
            },
            'returns January': function(instance) {
                assert.equal(instance.getLastMonthName(), 'January');
            }
        },
        'when it is March': {
            topic: function () {
                return new Date("March 15, 2010 12:00:00");
            },
            'returns February': function(instance) {
                assert.equal(instance.getLastMonthName(), 'February');
            }
        },
        'when it is April': {
            topic: function () {
                return new Date("April 15, 2010 12:00:00");
            },
            'returns March': function(instance) {
                assert.equal(instance.getLastMonthName(), 'March');
            }
        },
        'when it is May': {
            topic: function () {
                return new Date("May 15, 2010 12:00:00");
            },
            'returns April': function(instance) {
                assert.equal(instance.getLastMonthName(), 'April');
            }
        },
        'when it is June': {
            topic: function () {
                return new Date("June 15, 2010 12:00:00");
            },
            'returns May': function(instance) {
                assert.equal(instance.getLastMonthName(), 'May');
            }
        },
        'when it is July': {
            topic: function () {
                return new Date("July 15, 2010 12:00:00");
            },
            'returns June': function(instance) {
                assert.equal(instance.getLastMonthName(), 'June');
            }
        },
        'when it is August': {
            topic: function () {
                return new Date("August 15, 2010 12:00:00");
            },
            'returns July': function(instance) {
                assert.equal(instance.getLastMonthName(), 'July');
            }
        },
        'when it is September': {
            topic: function () {
                return new Date("September 15, 2010 12:00:00");
            },
            'returns August': function(instance) {
                assert.equal(instance.getLastMonthName(), 'August');
            }
        },
        'when it is October': {
            topic: function () {
                return new Date("October 15, 2010 12:00:00");
            },
            'returns September': function(instance) {
                assert.equal(instance.getLastMonthName(), 'September');
            }
        },
        'when it is November': {
            topic: function () {
                return new Date("November 15, 2010 12:00:00");
            },
            'returns October': function(instance) {
                assert.equal(instance.getLastMonthName(), 'October');
            }
        },
        'when it is December': {
            topic: function () {
                return new Date("December 15, 2010 12:00:00");
            },
            'returns November': function(instance) {
                assert.equal(instance.getLastMonthName(), 'November');
            }
        }
    },

    'can add milliseconds': {
        'adding positive milliseconds works': function () {
            var topic = Date.today();
            topic.addMilliseconds(500);
            assert.equal(topic.getMilliseconds(), 500);
        },
        'adding negative milliseconds works': function () {
            var topic = Date.today();
            topic.addMilliseconds(500);
            assert.equal(topic.getMilliseconds(), 500);
            topic.addMilliseconds(-250);
            assert.equal(topic.getMilliseconds(), 250);
        }
    },

    'can add seconds': {
        'adding positive seconds works': function () {
            var topic = Date.today();
            topic.addSeconds(50);
            assert.equal(topic.getSeconds(), 50);
        },
        'adding negative seconds works': function () {
            var topic = Date.today();
            topic.addSeconds(50);
            assert.equal(topic.getSeconds(), 50);
            topic.addSeconds(-25);
            assert.equal(topic.getSeconds(), 25);
        }
    },

    'can add minutes': {
        'adding positive minutes works': function () {
            var topic = Date.today();
            topic.addMinutes(50);
            assert.equal(topic.getMinutes(), 50);
        },
        'adding negative minutes works': function () {
            var topic = Date.today();
            topic.addMinutes(50);
            assert.equal(topic.getMinutes(), 50);
            topic.addMinutes(-25);
            assert.equal(topic.getMinutes(), 25);
        }
    },

    'can add hours': {
        'adding positive hours works': function () {
            var topic = Date.today();
            topic.addHours(5);
            assert.equal(topic.getHours(), 5);
        },
        'adding negative hours works': function () {
            var topic = Date.today();
            topic.addHours(5);
            assert.equal(topic.getHours(), 5);
            topic.addHours(-2);
            assert.equal(topic.getHours(), 3);
        }
    },

    'can add days': {
        'adding positive days works': function () {
            var topic = new Date(2011, 0, 10);
            topic.addDays(1);
            assert.equal(topic.getDate(), 11);
        },
        'adding positive days works across boundaries': function () {
            var topic = new Date(2011, 0, 31);
            topic.addDays(1);
            assert.equal(topic.getDate(), 1);
            assert.equal(topic.getMonth(), 1);
        },
        'adding negative days works': function () {
            var topic = new Date(2011, 0, 10);
            topic.addDays(1);
            assert.equal(topic.getDate(), 11);
            topic.addDays(-2);
            assert.equal(topic.getDate(), 9);
        }
    },

    'can add weeks': {
        'adding positive weeks works': function () {
            var topic = new Date(2011, 0, 10);
            topic.addWeeks(1);
            assert.equal(topic.getDate(), 17);
        },
        'adding negative weeks works': function () {
            var topic = new Date(2011, 0, 10);
            topic.addWeeks(1);
            assert.equal(topic.getDate(), 17);
            topic.addWeeks(-2);
            assert.equal(topic.getDate(), 3);
        }
    },

    'can add months': {
        'adding positive months works': function () {
            var topic = new Date(2011, 1, 10);
            topic.addMonths(1);
            assert.equal(topic.getMonth(), 2);
        },
        'adding negative months works': function () {
            var topic = new Date(2011, 1, 10);
            topic.addMonths(1);
            assert.equal(topic.getMonth(), 2);
            topic.addMonths(-2);
            assert.equal(topic.getMonth(), 0);
        }
    },

    'can add years': {
        'adding positive years works': function () {
            var topic = new Date(2011, 1, 10);
            topic.addYears(1);
            assert.equal(topic.getFullYear(), 2012);
        },
        'adding negative years works': function () {
            var topic = new Date(2011, 1, 10);
            topic.addYears(1);
            assert.equal(topic.getFullYear(), 2012);
            topic.addYears(-2);
            assert.equal(topic.getFullYear(), 2010);
        }
    },

    'cannot remove milliseconds': {
        'removing is not implemented': function () {
            var topic = Date.today();
            assert.throws(function() { topic.removeMilliseconds(500) }, Error);
        }
    },

    'can remove seconds': {
        'removing positive seconds works': function () {
            var topic = Date.today();
            topic.removeSeconds(50);
            assert.equal(topic.getSeconds(), 10);
        },
        'removing negative seconds works': function () {
            var topic = Date.today();
            topic.removeSeconds(50);
            assert.equal(topic.getSeconds(), 10);
            topic.removeSeconds(-25);
            assert.equal(topic.getSeconds(), 35);
        }
    },

    'can remove minutes': {
        'removing positive minutes works': function () {
            var topic = Date.today();
            topic.removeMinutes(50);
            assert.equal(topic.getMinutes(), 10);
        },
        'removing negative minutes works': function () {
            var topic = Date.today();
            topic.removeMinutes(50);
            assert.equal(topic.getMinutes(), 10);
            topic.removeMinutes(-25);
            assert.equal(topic.getMinutes(), 35);
        }
    },

    'can remove hours': {
        'removing positive hours works': function () {
            var topic = Date.today();
            topic.removeHours(5);
            assert.equal(topic.getHours(), 19);
        },
        'removing negative hours works': function () {
            var topic = Date.today();
            topic.removeHours(5);
            assert.equal(topic.getHours(), 19);
            topic.removeHours(-2);
            assert.equal(topic.getHours(), 21);
        }
    },

    'can remove days': {
        'removing positive days works': function () {
            var topic = new Date(2011, 0, 10);
            topic.removeDays(1);
            assert.equal(topic.getDate(), 09);
        },
        'removing positive days works across boundaries': function () {
            var topic = new Date(2011, 0, 01);
            topic.removeDays(1);
            assert.equal(topic.getDate(), 31);
            assert.equal(topic.getMonth(), 11);
        },
        'removing negative days works': function () {
            var topic = new Date(2011, 0, 10);
            topic.removeDays(1);
            assert.equal(topic.getDate(), 09);
            topic.removeDays(-2);
            assert.equal(topic.getDate(), 11);
        }
    },

    'can remove weeks': {
        'removing positive weeks works': function () {
            var topic = new Date(2011, 0, 10);
            topic.removeWeeks(1);
            assert.equal(topic.getDate(), 03);
        },
        'removing negative weeks works': function () {
            var topic = new Date(2011, 0, 10);
            topic.removeWeeks(1);
            assert.equal(topic.getDate(), 03);
            topic.removeWeeks(-2);
            assert.equal(topic.getDate(), 17);
        }
    },

    'can remove months': {
        'removing positive months works': function () {
            var topic = new Date(2011, 1, 10);
            topic.removeMonths(1);
            assert.equal(topic.getMonth(), 0);
        },
        'removing negative months works': function () {
            var topic = new Date(2011, 1, 10);
            topic.removeMonths(1);
            assert.equal(topic.getMonth(), 0);
            topic.removeMonths(-2);
            assert.equal(topic.getMonth(), 2);
        }
    },

    'can remove years': {
        'removing positive years works': function () {
            var topic = new Date(2011, 1, 10);
            topic.removeYears(1);
            assert.equal(topic.getFullYear(), 2010);
        },
        'removing negative years works': function () {
            var topic = new Date(2011, 1, 10);
            topic.removeYears(1);
            assert.equal(topic.getFullYear(), 2010);
            topic.removeYears(-2);
            assert.equal(topic.getFullYear(), 2012);
        }
    },
    'can add weekdays within a week': {
        'adding positive weekdays': function () {
            var topic = new Date(2013, 1, 13); //Wed
            topic.addWeekdays(2);
            assert.equal(topic.getDay(), 5);
        },
        'adding negative weekdays': function () {
            var topic = new Date(2013, 1, 13); //Wed
            topic.addWeekdays(-2);
            assert.equal(topic.getDay(), 1);
        }
    },
    'can add weekdays across one week': {
        'adding positive weekdays': function () {
            var wed = new Date(2013, 1, 13);
            assert.equal(wed.addWeekdays(3).getDate(), 18);
            var fri = new Date(2013, 1, 15);
            assert.equal(fri.addWeekdays(1).getDate(), 18);
        },
        'adding negative weekdays': function () {
            var wed = new Date(2013, 1, 13);
            assert.equal(wed.addWeekdays(-3).getDate(), 8);
            var mon = new Date(2013, 1, 11);
            assert.equal(mon.addWeekdays(-1).getDate(), 8);
        }
    },
    'can add weekdays across multiple weeks': {
        'adding positive weekdays': function () {
            var tue = new Date(2013, 3, 16);
            assert.equal(tue.clone().addWeekdays(14).getDate(), 6);
            assert.equal(tue.clone().addWeekdays(14).getMonth(), 4);
            var fri = new Date(2013, 3, 19);
            assert.equal(fri.clone().addWeekdays(14).getDate(), 9);
            assert.equal(fri.clone().addWeekdays(14).getMonth(), 4);
        },
        'adding negative weekdays': function () {
            var tue = new Date(2013, 3, 16); //Wed
            assert.equal(tue.clone().addWeekdays(-17).getDate(), 22);
            assert.equal(tue.clone().addWeekdays(-17).getMonth(), 2);
            var mon = new Date(2013, 3, 15); //Wed
            assert.equal(mon.clone().addWeekdays(-17).getDate(), 21);
            assert.equal(mon.clone().addWeekdays(-17).getMonth(), 2);
        }
    },
    'can add weekdays to a Saturday': {
        'adding positive weekdays': function () {
            var sat = new Date(2013, 1, 16);
            assert.equal(sat.clone().addWeekdays(1).getDate(), 18);
            assert.equal(sat.clone().addWeekdays(11).getDate(), 4);
            assert.equal(sat.clone().addWeekdays(31).getDate(), 1);
        },
        'adding negative weekdays': function () {
            var sat = new Date(2013, 1, 16);
            assert.equal(sat.clone().addWeekdays(-1).getDate(), 15);
            assert.equal(sat.clone().addWeekdays(-15).getDate(), 28);
            assert.equal(sat.clone().addWeekdays(-33).getDate(), 2);
        }
    },
    'can add weekdays to a Sunday': {
        'adding positive weekdays': function () {
            var sun = new Date(2013, 1, 17);
            assert.equal(sun.clone().addWeekdays(1).getDate(), 18);
            assert.equal(sun.clone().addWeekdays(11).getDate(), 4);
            assert.equal(sun.clone().addWeekdays(31).getDate(), 1);

        },
        'adding negative weekdays': function () {
            var sun = new Date(2013, 1, 17);
            assert.equal(sun.clone().addWeekdays(-1).getDate(), 15);
            assert.equal(sun.clone().addWeekdays(-15).getDate(), 28);
            assert.equal(sun.clone().addWeekdays(-33).getDate(), 2);
        }
    },

    'can set time to now': {
        'setting time to now works': function () {
            var topic = Date.today();
            topic.setTimeToNow();
            var now = new Date();

            // hokey, but should be sufficient
            assert.equal((now.valueOf() - topic.valueOf() < 100), true);
        }
    },

    'can clone time': {
        topic: function () { return new Date(); },
        'clone works': function (topic) {
            var clone = topic.clone();
            assert.equal(clone.valueOf(), topic.valueOf());
        }
    },

    'between works': {
        'between returns true for valid start and end': function () {
            var today = Date.today();
            var yesterday = Date.yesterday();
            var tomorrow = Date.tomorrow();
            assert.equal(today.between(yesterday, tomorrow), true);
        },
        'between returns false for invalid start and end': function () {
            var today = Date.today();
            var yesterday = Date.yesterday();
            var tomorrow = Date.tomorrow();
            assert.equal(today.between(tomorrow, yesterday), false);
        }
    },

    'compareTo works': {
        topic: function () { return Date.today(); },
        '-1 for tomorrow': function (topic) {
            assert.equal(topic.compareTo(Date.tomorrow()), -1);
        },
        '1 for yesterday': function (topic) {
            assert.equal(topic.compareTo(Date.yesterday()), 1);
        },
        '0 for today': function (topic) {
            assert.equal(topic.compareTo(Date.today()), 0);
        }
    },

    'isToday works': {
        topic: function () { return Date.today(); },
        'true for today': function (topic) {
            assert.equal(topic.isToday(), true);
        },
        'false if not today': function (topic) {
            assert.equal(Date.yesterday().isToday(), false);
        }
    },

    'equals instance works': {
        topic: function () { return Date.today(); },
        'true for equal': function (topic) {
            assert.equal(topic.equals(Date.today()), true);
        },
        'false for not equal': function (topic) {
            assert.equal(topic.equals(Date.tomorrow()), false);
        }
    },

    'equalsDay instance works': {
        topic: function () { return Date.today(); },
        'true for today': function (topic) {
            assert.equal(topic.equalsDay(Date.today()), true);
        },
        'false for yesterday': function (topic) {
            assert.equal(topic.equalsDay(Date.yesterday()), false);
        }
    },

    'isBefore works': {
        topic: function () { return Date.today(); },
        'true for before': function (topic) {
            assert.equal(topic.isBefore(Date.tomorrow()), true);
        },
        'false for after': function (topic) {
            assert.equal(topic.isBefore(Date.yesterday()), false);
        }
    },

    'isAfter works': {
        topic: function () { return Date.today(); },
        'false for before': function (topic) {
            assert.equal(topic.isAfter(Date.tomorrow()), false);
        },
        'true for after': function (topic) {
            assert.equal(topic.isAfter(Date.yesterday()), true);
        }
    },

    'isWeekend works': {
        'false for weekdays': function (topic) {
            assert.equal(new Date(2013,2,11).isWeekend(), false);
            assert.equal(new Date(2013,2,12).isWeekend(), false);
            assert.equal(new Date(2013,2,13).isWeekend(), false);
            assert.equal(new Date(2013,2,14).isWeekend(), false);
            assert.equal(new Date(2013,2,15).isWeekend(), false);
        },
        'true for weekend': function (topic) {
            assert.equal(new Date(2013,2,16).isWeekend(), true);
            assert.equal(new Date(2013,2,17).isWeekend(), true);
        }
    },

    'getDaysBetween works': {
        topic: function () { return Date.today(); },
        '1 for tomorrow': function (topic) {
            assert.equal(topic.getDaysBetween(Date.tomorrow()), 1);
        },
        '-1 for yesterday': function (topic) {
            assert.equal(topic.getDaysBetween(Date.yesterday()), -1);
        },
        '0 for today': function (topic) {
            assert.equal(topic.getDaysBetween(Date.today()), 0);
        }
    },

    'getDaysBetween works for beginning of year': {
        topic: function () {  return new Date('Jan 1, 2011 01:01:01 GMT'); },
        'should return 0 for the same day': function (topic) {
            var date = new Date('Jan 1, 2011 01:01:01 GMT');
            assert.equal(topic.getDaysBetween(date), 0);
        },
        'should return 1 for tomorrow': function (topic) {
            var date = new Date('Jan 2, 2011 01:01:01 GMT');
            assert.equal(topic.getDaysBetween(date), 1);
        }
    },

    'getMinutesBetween works': {
        topic: function () { return new Date('Jan 1, 2011 23:31:01 GMT'); },
        '10 for 10 minutes': function (topic) {
            assert.equal(topic.getMinutesBetween(new Date('Jan 1, 2011 23:41:01 GMT')), 10);
        },
        '-10 for 10 minutes ago': function (topic) {
            assert.equal(topic.getMinutesBetween(new Date('Jan 1, 2011 23:21:01 GMT')), -10);
        },
        '0 for same minute': function (topic) {
            assert.equal(topic.getMinutesBetween(new Date('Jan 1, 2011 23:31:01 GMT')), 0);
        },
        'for time difference that spans days': function (topic) {
            assert.equal(topic.getMinutesBetween(new Date('Jan 2, 2011 00:01:01 GMT')), 30);
        }
    },

    'getSecondsBetween works': {
        topic: function () { return new Date('Jan 1, 2011 23:31:01 GMT'); },
        '10 for 10 seconds': function (topic) {
            assert.equal(topic.getSecondsBetween(new Date('Jan 1, 2011 23:31:11 GMT')), 10);
        },
        '-10 for 10 seconds ago': function (topic) {
            assert.equal(topic.getSecondsBetween(new Date('Jan 1, 2011 23:30:51 GMT')), -10);
        },
        '0 for same second': function (topic) {
            assert.equal(topic.getSecondsBetween(new Date('Jan 1, 2011 23:31:01 GMT')), 0);
        }
    },

    'getMillisecondsBetween works': {
        topic: function () { return new Date(); },
        '10 for 10 milliseconds': function (topic) {
            assert.equal(topic.getMillisecondsBetween(new Date(+topic + 10)), 10);
        },
        '-10 for 10 milliseconds ago': function (topic) {
            assert.equal(topic.getMillisecondsBetween(new Date(+topic - 10)), -10);
        },
        '0 for same millisecond': function (topic) {
            assert.equal(topic.getMillisecondsBetween(new Date(+topic)), 0);
        }
    },

    'getHoursBetween works': {
        topic: function () { return new Date('Jan 1, 2011 23:31:01 GMT'); },
        '1 for 1 hour': function (topic) {
            assert.equal(topic.getHoursBetween(new Date('Jan 2, 2011 00:31:01 GMT')), 1);
        },
        '-1 for 1 hour ago': function (topic) {
            assert.equal(topic.getHoursBetween(new Date('Jan 1, 2011 22:31:01 GMT')), -1);
        },
        '0 for same hour': function (topic) {
            assert.equal(topic.getHoursBetween(new Date('Jan 1, 2011 23:31:01 GMT')), 0);
        }
    },

    'getOrdinalNumber works': {
        'returns correct day': function () {
            var date = new Date('02-01-2011');
            assert.equal(date.getOrdinalNumber(), 32);
        }
    },

    'getOrdinalNumber works for january 1st': {
        'returns correct day': function () {
            var date = new Date('01-01-2011');
            assert.equal(date.getOrdinalNumber(), 1);
        }
    },

    'getDaysInMonth works': {
        'january': function (topic) {
            assert.equal(Date.getDaysInMonth(2011, 0), 31);
        },
        'february': function (topic) {
            assert.equal(Date.getDaysInMonth(2011, 1), 28);
        },
        'february leap year': function (topic) {
            assert.equal(Date.getDaysInMonth(2008, 1), 29);
        },
        'march': function (topic) {
            assert.equal(Date.getDaysInMonth(2011, 2), 31);
        },
        'april': function (topic) {
            assert.equal(Date.getDaysInMonth(2011, 3), 30);
        },
        'may': function (topic) {
            assert.equal(Date.getDaysInMonth(2011, 4), 31);
        },
        'june': function (topic) {
            assert.equal(Date.getDaysInMonth(2011, 5), 30);
        },
        'july': function (topic) {
            assert.equal(Date.getDaysInMonth(2011, 6), 31);
        },
        'august': function (topic) {
            assert.equal(Date.getDaysInMonth(2011, 7), 31);
        },
        'september': function (topic) {
            assert.equal(Date.getDaysInMonth(2011, 8), 30);
        },
        'october': function (topic) {
            assert.equal(Date.getDaysInMonth(2011, 9), 31);
        },
        'november': function (topic) {
            assert.equal(Date.getDaysInMonth(2011, 10), 30);
        },
        'december': function (topic) {
            assert.equal(Date.getDaysInMonth(2011, 11), 31);
        }
    },

    'getMonthsBetween works': {
      topic: function() { return new Date(Date.UTC(2013, 1, 28)); },
      'different months': function(topic) {
        var eDate = new Date(Date.UTC(2013, 2, 30));
        assert.equal(topic.getMonthsBetween(eDate).toFixed(5), 1.06586);
      },
      'different months and years': function(topic) {
        var eDate = new Date(Date.UTC(2014, 3, 4));
        assert.equal(topic.getMonthsBetween(eDate).toFixed(5), 13.22715);
      },
      'same month': function( topic ) {
        var sDate = new Date(Date.UTC(2013, 1, 1));
        assert.equal(sDate.getMonthsBetween(topic).toFixed(5), 0.87097);
      },
      'same date': function(topic) {
        var sameDate = new Date(topic.getTime());
        assert.equal(topic.getMonthsBetween(sameDate).toFixed(5), 0);
      },
      'same day and month but different years': function(topic) {
        var differentYear = new Date(Date.UTC(2014, 1, 28));
        assert.equal(topic.getMonthsBetween(differentYear).toFixed(5), 12);
      }
    }

}).export(module);
