/*

© 2011 by Jerry Sievert

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*/


(function () {
    /** @class Date */
    // constants
    var monthsAbbr = [], monthsFull = [], daysAbbr = [], daysFull = [], dayNames = {}, monthsAll, daysAll = [], monthNames = [];
    monthsAbbr = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
    ];

    monthsFull = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ];

    daysAbbr = [
        'Sun',
        'Mon',
        'Tue',
        'Wed',
        'Thu',
        'Fri',
        'Sat'
    ];

    daysFull = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
    ];

    dayNames = {
        'su':         0,
        'sun':        0,
        'sunday':     0,
        'mo':         1,
        'mon':        1,
        'monday':     1,
        'tu':         2,
        'tue':        2,
        'tuesday':    2,
        'we':         3,
        'wed':        3,
        'wednesday':  3,
        'th':         4,
        'thu':        4,
        'thursday':   4,
        'fr':         5,
        'fri':        5,
        'friday':     5,
        'sa':         6,
        'sat':        6,
        'saturday':   6
    };
    monthsAll = monthsFull.concat(monthsAbbr);
    daysAll = [
        'su',
        'sun',
        'sunday',
        'mo',
        'mon',
        'monday',
        'tu',
        'tue',
        'tuesday',
        'we',
        'wed',
        'wednesday',
        'th',
        'thu',
        'thursday',
        'fr',
        'fri',
        'friday',
        'sa',
        'sat',
        'saturday'
    ];

    monthNames = {
        'jan':        0,
        'january':    0,
        'feb':        1,
        'february':   1,
        'mar':        2,
        'march':      2,
        'apr':        3,
        'april':      3,
        'may':        4,
        'jun':        5,
        'june':       5,
        'jul':        6,
        'july':       6,
        'aug':        7,
        'august':     7,
        'sep':        8,
        'september':  8,
        'oct':        9,
        'october':    9,
        'nov':        10,
        'november':   10,
        'dec':        11,
        'december':   11
    };

    var daysInMonth = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];


    // private helper functions
    /** @ignore */
    function pad(str, length) {
        str = String(str);
        while (str.length < length) {
            str = '0' + str;
        }
        return str;
    }

    var isInteger = function (str) {
        if (str.match(/^(\d+)$/)) {
            return true;
        }
        return false;
    };
    var getInt = function (str, i, minlength, maxlength) {
        for (var x = maxlength; x >= minlength; x--) {
            var token = str.substring(i, i + x);
            if (token.length < minlength) {
                return null;
            }
            if (isInteger(token)) {
                return token;
            }
        }
        return null;
    };

    // static class methods
    var origParse = Date.parse;
    // ------------------------------------------------------------------
    // getDateFromFormat( date_string , format_string )
    //
    // This function takes a date string and a format string. It matches
    // If the date string matches the format string, it returns the
    // getTime() of the date. If it does not match, it returns NaN.
    // Original Author: Matt Kruse <matt@mattkruse.com>
    // WWW: http://www.mattkruse.com/
    // Adapted from: http://www.mattkruse.com/javascript/date/source.html
    // ------------------------------------------------------------------


    var getDateFromFormat = function (val, format) {
        val = val + "";
        format = format + "";
        var iVal = 0;
        var iFormat = 0;
        var c = "";
        var token = "";
        var token2 = "";
        var x, y;
        var now = new Date();
        var year = now.getYear();
        var month = now.getMonth() + 1;
        var date = 1;
        var hh = 0;
        var mm = 0;
        var ss = 0;
        var ampm = "";



        while (iFormat < format.length) {
            // Get next token from format string
            c = format.charAt(iFormat);
            token = "";
            while ((format.charAt(iFormat) === c) && (iFormat < format.length)) {
                token += format.charAt(iFormat++);
            }
            // Extract contents of value based on format token
            if (token === "yyyy" || token === "yy" || token === "y") {
                if (token === "yyyy") {
                    x = 4;
                    y = 4;
                }
                if (token === "yy") {
                    x = 2;
                    y = 2;
                }
                if (token === "y") {
                    x = 2;
                    y = 4;
                }
                year = getInt(val, iVal, x, y);
                if (year === null) {
                    return NaN;
                }
                iVal += year.length;
                if (year.length === 2) {
                    if (year > 70) {
                        year = 1900 + (year - 0);
                    } else {
                        year = 2000 + (year - 0);
                    }
                }
            } else if (token === "MMM" || token === "NNN") {
                month = 0;
                for (var i = 0; i < monthsAll.length; i++) {
                    var monthName = monthsAll[i];
                    if (val.substring(iVal, iVal + monthName.length).toLowerCase() === monthName.toLowerCase()) {
                        if (token === "MMM" || (token === "NNN" && i > 11)) {
                            month = i + 1;
                            if (month > 12) {
                                month -= 12;
                            }
                            iVal += monthName.length;
                            break;
                        }
                    }
                }
                if ((month < 1) || (month > 12)) {
                    return NaN;
                }
            } else if (token === "EE" || token === "E") {
                for (var n = 0; n < daysAll.length; n++) {
                    var dayName = daysAll[n];
                    if (val.substring(iVal, iVal + dayName.length).toLowerCase() === dayName.toLowerCase()) {
                        iVal += dayName.length;
                        break;
                    }
                }
            } else if (token === "MM" || token === "M") {
                month = getInt(val, iVal, token.length, 2);
                if (month === null || (month < 1) || (month > 12)) {
                    return NaN;
                }
                iVal += month.length;
            } else if (token === "dd" || token === "d") {
                date = getInt(val, iVal, token.length, 2);
                if (date === null || (date < 1) || (date > 31)) {
                    return NaN;
                }
                iVal += date.length;
            } else if (token === "hh" || token === "h") {
                hh = getInt(val, iVal, token.length, 2);
                if (hh === null || (hh < 1) || (hh > 12)) {
                    return NaN;
                }
                iVal += hh.length;
            } else if (token === "HH" || token === "H") {
                hh = getInt(val, iVal, token.length, 2);
                if (hh === null || (hh < 0) || (hh > 23)) {
                    return NaN;
                }
                iVal += hh.length;
            } else if (token === "KK" || token === "K") {
                hh = getInt(val, iVal, token.length, 2);
                if (hh === null || (hh < 0) || (hh > 11)) {
                    return NaN;
                }
                iVal += hh.length;
            } else if (token === "kk" || token === "k") {
                hh = getInt(val, iVal, token.length, 2);
                if (hh === null || (hh < 1) || (hh > 24)) {
                    return NaN;
                }
                iVal += hh.length;
                hh--;
            } else if (token === "mm" || token === "m") {
                mm = getInt(val, iVal, token.length, 2);
                if (mm === null || (mm < 0) || (mm > 59)) {
                    return NaN;
                }
                iVal += mm.length;
            } else if (token === "ss" || token === "s") {
                ss = getInt(val, iVal, token.length, 2);
                if (ss === null || (ss < 0) || (ss > 59)) {
                    return NaN;
                }
                iVal += ss.length;
            } else if (token === "a") {
                if (val.substring(iVal, iVal + 2).toLowerCase() === "am") {
                    ampm = "AM";
                } else if (val.substring(iVal, iVal + 2).toLowerCase() === "pm") {
                    ampm = "PM";
                } else {
                    return NaN;
                }
                iVal += 2;
            } else {
                if (val.substring(iVal, iVal + token.length) !== token) {
                    return NaN;
                } else {
                    iVal += token.length;
                }
            }
        }
        // If there are any trailing characters left in the value, it doesn't match
        if (iVal !== val.length) {
            return NaN;
        }
        // Is date valid for month?
        if (month === 2) {
            // Check for leap year
            if (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0)) { // leap year
                if (date > 29) {
                    return NaN;
                }
            } else {
                if (date > 28) {
                    return NaN;
                }
            }
        }
        if ((month === 4) || (month === 6) || (month === 9) || (month === 11)) {
            if (date > 30) {
                return NaN;
            }
        }
        // Correct hours value
        if (hh < 12 && ampm === "PM") {
            hh = hh - 0 + 12;
        } else if (hh > 11 && ampm === "AM") {
            hh -= 12;
        }
        var newdate = new Date(year, month - 1, date, hh, mm, ss);
        return newdate.getTime();
    };


    /** @ignore */
    Date.parse = function (date, format) {
        if (format) {
            return getDateFromFormat(date, format);
        }
        var timestamp = origParse(date), minutesOffset = 0, match;
        if (isNaN(timestamp) && (match = /^(\d{4}|[+\-]\d{6})-(\d{2})-(\d{2})(?:[T ](\d{2}):(\d{2})(?::(\d{2})(?:\.(\d{3,}))?)?(?:(Z)|([+\-])(\d{2})(?::?(\d{2}))?))?/.exec(date))) {
            if (match[8] !== 'Z') {
                minutesOffset = +match[10] * 60 + (+match[11]);

                if (match[9] === '+') {
                    minutesOffset = 0 - minutesOffset;
                }
            }

            match[7] = match[7] || '000';

            timestamp = Date.UTC(+match[1], +match[2] - 1, +match[3], +match[4], +match[5] + minutesOffset, +match[6], +match[7].substr(0, 3));
        }

        return timestamp;
    };

    function polyfill(name, func) {
        if (Date.prototype[name] === undefined) {
            Date.prototype[name] = func;
        }
    }

    /**
        Returns new instance of Date object with the date set to today and
        the time set to midnight
        @static
        @returns {Date} Today's Date
        @function today
        @memberof Date
     */
    Date.today = function () {
        return new Date().clearTime();
    };

    /**
        Returns new instance of Date object with the date set to today and
        the time set to midnight in UTC
        @static
        @returns {Date} Today's Date in UTC
        @function UTCtoday
        @memberof Date
     */
    Date.UTCtoday = function () {
        return new Date().clearUTCTime();
    };

    /**
        Returns new instance of Date object with the date set to tomorrow and
        the time set to midnight
        @static
        @returns {Date} Tomorrow's Date
        @function tomorrow
        @memberof Date
     */
    Date.tomorrow = function () {
        return Date.today().add({days: 1});
    };

    /**
        Returns new instance of Date object with the date set to tomorrow and
        the time set to midnight in UTC
        @static
        @returns {Date} Tomorrow's Date in UTC
        @function UTCtomorrow
        @memberof Date
     */
    Date.UTCtomorrow = function () {
        return Date.UTCtoday().add({days: 1});
    };

    /**
        Returns new instance of Date object with the date set to yesterday and
        the time set to midnight
        @static
        @returns {Date} Yesterday's Date
        @function yesterday
        @memberof Date
     */
    Date.yesterday = function () {
        return Date.today().add({days: -1});
    };

    /**
        Returns new instance of Date object with the date set to yesterday and
        the time set to midnight in UTC
        @static
        @returns {Date} Yesterday's Date in UTC
        @function UTCyesterday
        @memberof Date
     */
    Date.UTCyesterday = function () {
        return Date.UTCtoday().add({days: -1});
    };

   /**
       Returns whether the day is valid
       @static
       @param day {Number} day of the month
       @param year {Number} year
       @param month {Number} month of the year [0-11]
       @returns {Boolean}
       @function validateDay
       @memberof Date
    */
    Date.validateDay = function (day, year, month) {
        var date = new Date(year, month, day);
        return (date.getFullYear() === year &&
            date.getMonth() === month &&
            date.getDate() === day);
    };

    /**
       Returns whether the year is valid
       @static
       @param year {Number} year
       @returns {Boolean}
       @function validateYear
       @memberof Date
    */
    Date.validateYear = function (year) {
        return (year >= 0 && year <= 9999);
    };

    /**
       Returns whether the second is valid
       @static
       @param second {Number} second
       @returns {Boolean}
       @function validateSecond
       @memberof Date
    */
    Date.validateSecond = function (second) {
        return (second >= 0 && second < 60);
    };

    /**
       Returns whether the month is valid [0-11]
       @static
       @param month {Number} month
       @returns {Boolean}
       @function validateMonth
       @memberof Date
    */
    Date.validateMonth = function (month) {
        return (month >= 0 && month < 12);
    };

    /**
       Returns whether the minute is valid
       @static
       @param minute {Number} minute
       @returns {Boolean}
       @function validateMinute
       @memberof Date
    */
    Date.validateMinute = function (minute) {
        return (minute >= 0 && minute < 60);
    };

  /**
     Returns whether the millisecond is valid
     @static
     @param millisecond {Number} millisecond
     @returns {Boolean}
     @function validateMillisecond
     @memberof Date
  */
    Date.validateMillisecond = function (milli) {
        return (milli >= 0 && milli < 1000);
    };

    /**
       Returns whether the hour is valid [0-23]
       @static
       @param hour {Number} hour
       @returns {Boolean}
       @function validateHour
       @memberof Date
    */
    Date.validateHour = function (hour) {
        return (hour >= 0 && hour < 24);
    };

    /**
       Compares two dates
       @static
       @param date1 {Date} first date
       @param date2 {Date} second date
       @returns {Number} -1 if date1 is less than date2, 0 if they are equal, 1 if date1 is more than date2
       @function compare
       @memberof Date
    */
    Date.compare = function (date1, date2) {
        if (date1.valueOf() < date2.valueOf()) {
            return -1;
        } else if (date1.valueOf() > date2.valueOf()) {
            return 1;
        }
        return 0;
    };

    /**
       Compares two dates to the millisecond
       @static
       @param date1 {Date} first date
       @param date2 {Date} second date
       @returns {Boolean}
       @function equals
       @memberof Date
    */
    Date.equals = function (date1, date2) {
        return date1.valueOf() === date2.valueOf();
    };

    /**
       Compares two dates by day
       @static
       @param date1 {Date} first date
       @param date2 {Date} second date
       @returns {Boolean}
       @function equalsDay
       @memberof Date
    */
    Date.equalsDay = function (date1, date2) {
        return date1.toYMD() === date2.toYMD();
    };

    /**
       Returns the day number for a day [0-6]
       @static
       @param day {String} day name
       @returns {Number}
       @function getDayNumberFromName
       @memberof Date
    */
    Date.getDayNumberFromName = function (name) {
        return dayNames[name.toLowerCase()];
    };

    /**
       Returns the day number for a month [0-11]
       @static
       @param month {String} month name
       @returns {Number}
       @function getMonthNumberFromName
       @memberof Date
    */
    Date.getMonthNumberFromName = function (name) {
        return monthNames[name.toLowerCase()];
    };

    /**
       Returns the month name for a month [0-11]
       @static
       @param month {Number} month
       @returns {String}
       @function getMonthNameFromNumber
       @memberof Date
    */
    Date.getMonthNameFromNumber = function (number) {
        return monthsFull[number];
    };

    /**
       Returns the month name abbreviated for a month [0-11]
       @static
       @param month {Number} month
       @returns {String}
       @function getMonthAbbrFromNumber
       @memberof Date
    */
    Date.getMonthAbbrFromNumber = function (number) {
        return monthsAbbr[number];
    };

    /**
       Returns whether or not the year is a leap year
       @static
       @param year {Number} year
       @returns {Boolean}
       @function isLeapYear
       @memberof Date
    */
    Date.isLeapYear = function (year) {
        return (new Date(year, 1, 29).getDate() === 29);
    };

    /**
       Returns the number of days in a month
       @static
       @param year {Number} year
       @param month {Number} month
       @returns {Number}
       @function getDaysInMonth
       @memberof Date
    */
    Date.getDaysInMonth = function (year, month) {
        if (month === 1) {
            return Date.isLeapYear(year) ? 29 : 28;
        }
        return daysInMonth[month];
    };

    /**
       Returns the abbreviated month name
       @returns {String}
       @function getMonthAbbr
       @instance
       @memberof Date
    */
    polyfill('getMonthAbbr', function () {
        return monthsAbbr[this.getMonth()];
    });

    /**
       Returns the month name
       @returns {String}
       @function getMonthName
       @instance
       @memberof Date
    */
    polyfill('getMonthName', function () {
        return monthsFull[this.getMonth()];
    });

    /**
       Returns the name of last month
       @returns {String}
       @function getLastMonthName
       @instance
       @memberof Date
    */
    polyfill('getLastMonthName', function () {
        var i = this.getMonth();
        i = (i === 0 ? 11 : i - 1);
        return monthsFull[i];
    });

    /**
       Returns the current UTC office
       @returns {String}
       @function getUTCOffset
       @instance
       @memberof Date
    */
    polyfill('getUTCOffset', function () {
        var tz = pad(Math.abs(this.getTimezoneOffset() / 0.6), 4);
        if (this.getTimezoneOffset() > 0) {
            tz = '-' + tz;
        }
        return tz;
    });

    /**
       Returns a padded Common Log Format
       @returns {String}
       @function toCLFString
       @deprecated Will be deprecated in version 2.0 in favor of toFormat
       @instance
       @memberof Date
    */
    polyfill('toCLFString',  function () {
        return pad(this.getDate(), 2) + '/' + this.getMonthAbbr() + '/' +
               this.getFullYear() + ':' + pad(this.getHours(), 2) + ':' +
               pad(this.getMinutes(), 2) + ':' + pad(this.getSeconds(), 2) +
               ' ' + this.getUTCOffset();
    });

    /**
       Returns a padded Year/Month/Day
       @returns {String}
       @param separator {String} optional, defaults to "-"
       @function toYMD
       @deprecated Will be deprecated in version 2.0 in favor of toFormat
       @instance
       @memberof Date
    */
    polyfill('toYMD', function (separator) {
        separator = typeof separator === 'undefined' ? '-' : separator;
        return this.getFullYear() + separator + pad(this.getMonth() + 1, 2) +
            separator + pad(this.getDate(), 2);
    });

    /**
       Returns a formatted String for database insertion
       @returns {String}
       @function toDBString
       @deprecated Will be deprecated in version 2.0 in favor of toFormat
       @instance
       @memberof Date
    */
    polyfill('toDBString', function () {
        return this.getUTCFullYear() + '-' +  pad(this.getUTCMonth() + 1, 2) +
               '-' + pad(this.getUTCDate(), 2) + ' ' + pad(this.getUTCHours(), 2) +
               ':' + pad(this.getUTCMinutes(), 2) + ':' + pad(this.getUTCSeconds(), 2);
    });

    /**
       Sets the time to 00:00:00.0000 and returns a new Date object
       @returns {Date}
       @function clearTime
       @instance
       @memberof Date
    */
    polyfill('clearTime', function () {
        this.setHours(0);
        this.setMinutes(0);
        this.setSeconds(0);
        this.setMilliseconds(0);

        return this;
    });

    /**
       Sets the time to 00:00:00.0000 and returns a new Date object with set to UTC
       @returns {Date}
       @function clearUTCTime
       @instance
       @memberof Date
    */
    polyfill('clearUTCTime', function () {
        this.setUTCHours(0);
        this.setUTCMinutes(0);
        this.setUTCSeconds(0);
        this.setUTCMilliseconds(0);

        return this;
    });

    /**
       Adds `milliseconds`, `seconds`, `minutes`, `hours`, `days`, `weeks`, `months`, and `years` and returns a new Date.
       Usage: `data.add({ "seconds": 10, "days": 1 })`
       @param additions {Object}
       @returns {Date}
       @function add
       @instance
       @memberof Date
    */
    polyfill('add', function (obj) {
        if (obj.milliseconds !== undefined) {
            this.setMilliseconds(this.getMilliseconds() + obj.milliseconds);
        }
        if (obj.seconds !== undefined) {
            this.setSeconds(this.getSeconds() + obj.seconds);
        }
        if (obj.minutes !== undefined) {
            this.setMinutes(this.getMinutes() + obj.minutes);
        }
        if (obj.hours !== undefined) {
            this.setHours(this.getHours() + obj.hours);
        }
        if (obj.days !== undefined) {
            this.setDate(this.getDate() + obj.days);
        }
        if (obj.weeks !== undefined) {
            this.setDate(this.getDate() + (obj.weeks * 7));
        }
        if (obj.months !== undefined) {
            this.setMonth(this.getMonth() + obj.months);
        }
        if (obj.years !== undefined) {
            this.setFullYear(this.getFullYear() + obj.years);
        }
        return this;
    });

    /**
       Adds milliseconds to the Date and returns it
       @returns {Date}
       @param milliseconds {Number} Number of milliseconds to add
       @function addMilliseconds
       @deprecated Will be deprecated in version 2.0 in favor of add
       @instance
       @memberof Date
    */
    polyfill('addMilliseconds', function (milliseconds) {
        return this.add({ milliseconds: milliseconds });
    });

    /**
       Adds seconds to the Date and returns it
       @returns {Date}
       @param seconds {Number} Number of seconds to add
       @function addSeconds
       @deprecated Will be deprecated in version 2.0 in favor of add
       @instance
       @memberof Date
    */
    polyfill('addSeconds', function (seconds) {
        return this.add({ seconds: seconds });
    });

    /**
       Adds minutes to the Date and returns it
       @returns {Date}
       @param minutes {Number} Number of minutes to add
       @function addMinutes
       @deprecated Will be deprecated in version 2.0 in favor of add
       @instance
       @memberof Date
    */
    polyfill('addMinutes', function (minutes) {
        return this.add({ minutes: minutes });
    });

    /**
       Adds hours to the Date and returns it
       @returns {Date}
       @param hours {Number} Number of hours to add
       @function addHours
       @deprecated Will be deprecated in version 2.0 in favor of add
       @instance
       @memberof Date
    */
    polyfill('addHours', function (hours) {
        return this.add({ hours: hours });
    });

    /**
       Adds days to the Date and returns it
       @returns {Date}
       @param days {Number} Number of days to add
       @function addSeconds
       @deprecated Will be deprecated in version 2.0 in favor of add
       @instance
       @memberof Date
    */
    polyfill('addDays', function (days) {
        return this.add({ days: days });
    });

    /**
       Adds weeks to the Date and returns it
       @returns {Date}
       @param weeks {Number} Number of weeks to add
       @function addWeeks
       @deprecated Will be deprecated in version 2.0 in favor of add
       @instance
       @memberof Date
    */
    polyfill('addWeeks', function (weeks) {
        return this.add({ days: (weeks * 7) });
    });

    /**
       Adds months to the Date and returns it
       @returns {Date}
       @param months {Number} Number of months to add
       @function addMonths
       @deprecated Will be deprecated in version 2.0 in favor of add
       @instance
       @memberof Date
    */
    polyfill('addMonths', function (months) {
        return this.add({ months: months });
    });

    /**
       Adds years to the Date and returns it
       @returns {Date}
       @param years {Number} Number of years to add
       @function addYears
       @deprecated Will be deprecated in version 2.0 in favor of add
       @instance
       @memberof Date
    */
    polyfill('addYears', function (years) {
        return this.add({ years: years });
    });

    /**
       Removes `milliseconds`, `seconds`, `minutes`, `hours`, `days`, `weeks`, `months`, and `years` and returns a new Date.
       Usage: `data.remove({ "seconds": 10, "days": 1 })`
       @param removals {Object}
       @returns {Date}
       @function remove
       @instance
       @memberof Date
    */
    polyfill('remove', function (obj) {
        if (obj.seconds !== undefined) {
            this.setSeconds(this.getSeconds() - obj.seconds);
        }
        if (obj.minutes !== undefined) {
            this.setMinutes(this.getMinutes() - obj.minutes);
        }
        if (obj.hours !== undefined) {
            this.setHours(this.getHours() - obj.hours);
        }
        if (obj.days !== undefined) {
            this.setDate(this.getDate() - obj.days);
        }
        if (obj.weeks !== undefined) {
            this.setDate(this.getDate() - (obj.weeks * 7));
        }
        if (obj.months !== undefined) {
            this.setMonth(this.getMonth() - obj.months);
        }
        if (obj.years !== undefined) {
            this.setFullYear(this.getFullYear() - obj.years);
        }
        return this;
    });

    /**
       Removes milliseconds from the Date and returns it
       @returns {Date}
       @param milliseconds {Number} Number of millseconds to remove
       @function removeMilliseconds
       @deprecated Will be deprecated in version 2.0 in favor of remove
       @instance
       @memberof Date
    */
    polyfill('removeMilliseconds', function (milliseconds) {
        throw new Error('Not implemented');
    });

    /**
       Removes seconds from the Date and returns it
       @returns {Date}
       @param seconds {Number} Number of seconds to remove
       @function removeSeconds
       @deprecated Will be deprecated in version 2.0 in favor of remove
       @instance
       @memberof Date
    */
    polyfill('removeSeconds', function (seconds) {
        return this.remove({ seconds: seconds });
    });

    /**
       Removes minutes from the Date and returns it
       @returns {Date}
       @param seconds {Number} Number of minutes to remove
       @function removeMinutes
       @deprecated Will be deprecated in version 2.0 in favor of remove
       @instance
       @memberof Date
    */
    polyfill('removeMinutes', function (minutes) {
        return this.remove({ minutes: minutes });
    });

    /**
       Removes hours from the Date and returns it
       @returns {Date}
       @param hours {Number} Number of hours to remove
       @function removeHours
       @deprecated Will be deprecated in version 2.0 in favor of remove
       @instance
       @memberof Date
    */
    polyfill('removeHours', function (hours) {
        return this.remove({ hours: hours });
    });

    /**
       Removes days from the Date and returns it
       @returns {Date}
       @param days {Number} Number of days to remove
       @function removeDays
       @deprecated Will be deprecated in version 2.0 in favor of remove
       @instance
       @memberof Date
    */
    polyfill('removeDays', function (days) {
        return this.remove({ days: days });
    });

    /**
       Removes weeks from the Date and returns it
       @returns {Date}
       @param weeks {Number} Number of weeks to remove
       @function removeWeeks
       @deprecated Will be deprecated in version 2.0 in favor of remove
       @instance
       @memberof Date
    */
    polyfill('removeWeeks', function (weeks) {
        return this.remove({ days: (weeks * 7) });
    });

    /**
       Removes months from the Date and returns it
       @returns {Date}
       @param months {Number} Number of months to remove
       @function removeMonths
       @deprecated Will be deprecated in version 2.0 in favor of remove
       @instance
       @memberof Date
    */
    polyfill('removeMonths', function (months) {
        return this.remove({ months: months });
    });

    /**
       Removes years from the Date and returns it
       @returns {Date}
       @param years {Number} Number of years to remove
       @function removeYears
       @deprecated Will be deprecated in version 2.0 in favor of remove
       @instance
       @memberof Date
    */
    polyfill('removeYears', function (years) {
        return this.remove({ years: years });
    });

    /**
       Adds weekdays based on a Mon-Fri work schedule and returns it
       @returns {Date}
       @param weekdays {Number} Number of weekdays to add
       @function addWeekdays
       @instance
       @memberof Date
    */
    polyfill('addWeekdays', function (weekdays) {
        var day = this.getDay();
        if (day === 0) { day = 7; }
        var daysOffset = weekdays;
        var weekspan = Math.floor(( weekdays + day - 1 ) / 5.0);
        if (weekdays > 0){
            daysOffset += weekspan * 2;
            if ( day > 5 ) { daysOffset -= day - 5; }
        } else {
            daysOffset += Math.min( weekspan * 2, 0);
            if ( day > 6 ) { daysOffset -= 1; }
        }
        return this.addDays( daysOffset );
    });

    /**
       Sets the time and date to now
       @function setTimeToNow
       @instance
       @memberof Date
    */
    polyfill('setTimeToNow', function () {
        var n = new Date();
        this.setMilliseconds(n.getMilliseconds());
        this.setSeconds(n.getSeconds());
        this.setMinutes(n.getMinutes());
        this.setHours(n.getHours());
    });

    /**
       Returns a cloned copy of the current Date
       @function clone
       @instance
       @memberof Date
    */
    polyfill('clone', function () {
        return new Date(this.valueOf());
    });

    /**
       Returns whether this Date is between a start and end date
       @function between
       @returns {Boolean}
       @instance
       @memberof Date
    */
    polyfill('between', function (start, end) {
        return (this.valueOf() >= start.valueOf() &&
                this.valueOf() <= end.valueOf());
    });
    /**
       Compares a Date to this Date
       @param {Date} Date to compare to
       @function compareTo
       @returns {Number} -1 if less than date, 0 if they are equal, 1 if more than date
       @instance
       @memberof Date
    */
    polyfill('compareTo', function (date) {
        return Date.compare(this, date);
    });

    /**
       Compares a Date and time to this Date and time for equality
       @param {Date} Date to compare to
       @function equals
       @returns {Boolean}
       @instance
       @memberof Date
    */
    polyfill('equals', function (date) {
        return Date.equals(this, date);
    });

    /**
       Compares a Date to this Date for equality
       @param {Date} Date to compare to
       @function equalsDay
       @returns {Boolean}
       @instance
       @memberof Date
    */
    polyfill('equalsDay', function (date) {
        return Date.equalsDay(this, date);
    });

    /**
       Checks to see if the Date is today
       @function isToday
       @returns {Boolean}
       @instance
       @memberof Date
    */
    polyfill('isToday', function () {
        return Date.equalsDay(this, Date.today());
    });

    /**
       Compares a Date to this Date for to see if it is after the Date passed
       @param {Date} Date to compare to
       @function isAfter
       @returns {Boolean}
       @instance
       @memberof Date
    */
    polyfill('isAfter', function (date) {
        date = date ? date : new Date();
        return (this.compareTo(date) > 0);
    });

    /**
       Compares a Date to this Date for to see if it is before the Date passed
       @param {Date} Date to compare to
       @function isBefore
       @returns {Boolean}
       @instance
       @memberof Date
    */
    polyfill('isBefore', function (date) {
        date = date ? date : new Date();
        return (this.compareTo(date) < 0);
    });

    /**
       Returns `true` if the Date is a weekend using standard Saturday/Sunday definition of a weekend
       @function isWeekend
       @returns {Boolean}
       @instance
       @memberof Date
    */
    polyfill('isWeekend', function (date) {
        return (this.getDay() % 6 === 0);
    });

    /**
       Returns the number of days between this Date and the Date passed in
       @function getDaysBetween
       @param {Date} Date to compare to
       @returns {Number}
       @instance
       @memberof Date
    */
    polyfill('getDaysBetween', function (date) {
        return ((date.clone().valueOf() - this.valueOf()) / 86400000) | 0;
    });

    /**
       Returns the number of hours between this Date and the Date passed in
       @function getHoursBetween
       @param {Date} Date to compare to
       @returns {Number}
       @instance
       @memberof Date
    */
    polyfill('getHoursBetween', function (date) {
        return ((date.clone().valueOf() - this.valueOf()) / 3600000) | 0;
    });

    /**
       Returns the number of minutes between this Date and the Date passed in
       @function getMinutesBetween
       @param {Date} Date to compare to
       @returns {Number}
       @instance
       @memberof Date
    */
    polyfill('getMinutesBetween', function (date) {
        return ((date.clone().valueOf() - this.valueOf()) / 60000) | 0;
    });

    /**
       Returns the number of seconds between this Date and the Date passed in
       @function getSecondsBetween
       @param {Date} Date to compare to
       @returns {Number}
       @instance
       @memberof Date
    */
    polyfill('getSecondsBetween', function (date) {
        return ((date.clone().valueOf() - this.valueOf()) / 1000) | 0;
    });

    /**
       Returns the number of milliseconds between this Date and the Date passed in
       @function getMillisecondsBetween
       @param {Date} Date to compare to
       @returns {Number}
       @instance
       @memberof Date
    */
    polyfill('getMillisecondsBetween', function (date) {
        return ((date.clone().valueOf() - this.valueOf())) | 0;
    });

    /**
       Returns the number of months between this Date and the Date passed in
       @function getMonthsBetween
       @param {Date} Date to compare to
       @returns {Number}
       @instance
       @memberof Date
    */
    polyfill('getMonthsBetween', function (date) {
      var daysDiff = Math.abs(((+this) / (86400 * 1000)) - ((+date) / (86400 * 1000)));
      var start = new Date((+date) < (+this) ? (+date) : (+this));
      var end = new Date((date) > (+this) ? (+date) : (+this));

      var months = 0;
      while (+start < +end) {
        months++;
        start = start.addMonths(1);
      }

      var days = Math.abs(((+start) / (86400 * 1000)) - ((+end) / (86400 * 1000)));

      return months - (days / 31);
    });

    /**
       Returns the ordinal number of this Date
       @function getOrdinalNumber
       @returns {Number}
       @instance
       @memberof Date
    */
    polyfill('getOrdinalNumber', function () {
        return Math.ceil((this.clone().clearTime() - new Date(this.getFullYear(), 0, 1)) / 86400000) + 1;
    });

    /**
       Returns the a formatted version of this Date
       @function toFormat
       @param format {String} Format of the Date, using `YYYY`, `YY`, `MM`, `DD`, `HH`, `HH24`, `MI`, `SS`, etc
       @returns {String}
       @instance
       @memberof Date
    */
    polyfill('toFormat', function (format) {
        return toFormat(format, getReplaceMap(this));
    });

    /**
       Returns the a formatted version of the UTC version of this Date
       @function toUTCFormat
       @param format {String} Format of the Date, using `YYYY`, `YY`, `MM`, `DD`, `HH`, `HH24`, `MI`, `SS`, etc
       @returns {String}
       @instance
       @memberof Date
    */
    polyfill('toUTCFormat', function (format) {
        return toFormat(format, getUTCReplaceMap(this));
    });

    /**
       Returns the week number of this Date
       @function getWeekNumber
       @returns {Number}
       @instance
       @memberof Date
    */
    polyfill('getWeekNumber', function() {
        var onejan = new Date(this.getFullYear(),0,1);
        return Math.ceil((((this - onejan) / 86400000) + onejan.getDay()+1)/7);
    });

    /**
       Returns the week number of this Date, zero padded
       @function getFullWeekNumber
       @returns {Number}
       @instance
       @memberof Date
    */
    polyfill('getFullWeekNumber', function() {
        var weekNumber = '' + this.getWeekNumber();
        if (weekNumber.length === 1) {
            weekNumber = "0" + weekNumber;
        }

        return weekNumber;
    });

    var toFormat = function(format, replaceMap) {
        var f = [ format ], i, l, s;
        var replace = function (str, rep) {
            var i = 0, l = f.length, j, ll, t, n = [];
            for (; i < l; i++) {
                if (typeof f[i] == 'string') {
                    t = f[i].split(str);
                    for (j = 0, ll = t.length - 1; j < ll; j++) {
                        n.push(t[j]);
                        n.push([rep]); // replacement pushed as non-string
                    }
                    n.push(t[ll]);
                } else {
                    // must be a replacement, don't process, just push
                    n.push(f[i]);
                }
            }
            f = n;
        };

        for (i in replaceMap) {
            replace(i, replaceMap[i]);
        }

        s = '';
        for (i = 0, l = f.length; i < l; i++)
          s += typeof f[i] == 'string' ? f[i] : f[i][0];
        return f.join('');
    };

    var getReplaceMap = function(date) {
        var hours = (date.getHours() % 12) ? date.getHours() % 12 : 12;
        return {
            'YYYY': date.getFullYear(),
            'YY': String(date.getFullYear()).slice(-2),
            'MMMM': monthsFull[date.getMonth()],
            'MMM': monthsAbbr[date.getMonth()],
            'MM': pad(date.getMonth() + 1, 2),
            'MI': pad(date.getMinutes(), 2),
            'M': date.getMonth() + 1,
            'DDDD': daysFull[date.getDay()],
            'DDD': daysAbbr[date.getDay()],
            'DD': pad(date.getDate(), 2),
            'D': date.getDate(),
            'HH24': pad(date.getHours(), 2),
            'HH': pad(hours, 2),
            'H': hours,
            'SS': pad(date.getSeconds(), 2),
            'PP': (date.getHours() >= 12) ? 'PM' : 'AM',
            'P': (date.getHours() >= 12) ? 'pm' : 'am',
            'LL': pad(date.getMilliseconds(), 3)
        };
    };

    var getUTCReplaceMap = function(date) {
        var hours = (date.getUTCHours() % 12) ? date.getUTCHours() % 12 : 12;
        return {
            'YYYY': date.getUTCFullYear(),
            'YY': String(date.getUTCFullYear()).slice(-2),
            'MMMM': monthsFull[date.getUTCMonth()],
            'MMM': monthsAbbr[date.getUTCMonth()],
            'MM': pad(date.getUTCMonth() + 1, 2),
            'MI': pad(date.getUTCMinutes(), 2),
            'M': date.getUTCMonth() + 1,
            'DDDD': daysFull[date.getUTCDay()],
            'DDD': daysAbbr[date.getUTCDay()],
            'DD': pad(date.getUTCDate(), 2),
            'D': date.getUTCDate(),
            'HH24': pad(date.getUTCHours(), 2),
            'HH': pad(hours, 2),
            'H': hours,
            'SS': pad(date.getUTCSeconds(), 2),
            'PP': (date.getUTCHours() >= 12) ? 'PM' : 'AM',
            'P': (date.getUTCHours() >= 12) ? 'pm' : 'am',
            'LL': pad(date.getUTCMilliseconds(), 3)
        };
    };

    /*
     * change the language
     * @param lang => support "es" Spanish, "fr" french, "pt-BR" Portuguese Brazil
     * translate => diego
     */
    var language = function (lang) {
        if (lang == "es") {
            monthsAbbr = [
                'Ene',
                'Feb',
                'Mar',
                'Abr',
                'May',
                'Jun',
                'Jul',
                'Ago',
                'Sep',
                'Oct',
                'Nov',
                'Dic'
            ];

            monthsFull = [
                'Enero',
                'Febrero',
                'Marzo',
                'Abril',
                'Mayo',
                'Junio',
                'Julio',
                'Agosto',
                'Septiembre',
                'Octubre',
                'Noviembre',
                'Diciembre'
            ];

            daysAbbr = [
                'Dom',
                'Lun',
                'Mar',
                'Mie',
                'Jue',
                'Vie',
                'Sab'
            ];

            daysFull = [
                'Domingo',
                'Lunes',
                'Martes',
                'Miércoles',
                'Jueves',
                'Viernes',
                'Sábado'
            ];

            dayNames = {
                'do': 0,
                'dom': 0,
                'domingo': 0,
                'lu': 1,
                'lun': 1,
                'lunes': 1,
                'ma': 2,
                'mar': 2,
                'martes': 2,
                'mi': 3,
                'mie': 3,
                'miercoles': 3,
                'ju': 4,
                'jue': 4,
                'jueves': 4,
                'vi': 5,
                'vie': 5,
                'viernes': 5,
                'sa': 6,
                'sab': 6,
                'sabado': 6
            };
            monthsAll = monthsFull.concat(monthsAbbr);
            daysAll = [
                'do',
                'dom',
                'domingo',
                'lu',
                'lun',
                'lunes',
                'ma',
                'mar',
                'martes',
                'mi',
                'mie',
                'miércoles',
                'ju',
                'jue',
                'jueves',
                'vi',
                'vie',
                'viernes',
                'sa',
                'sab',
                'sábado'
            ];

            monthNames = {
                'ene': 0,
                'enero': 0,
                'feb': 1,
                'febrero': 1,
                'mar': 2,
                'marzo': 2,
                'abr': 3,
                'abril': 3,
                'may': 4,
                'mayo':4,
                'jun': 5,
                'junio': 5,
                'jul': 6,
                'julio': 6,
                'ago': 7,
                'agosto': 7,
                'sep': 8,
                'septiembre': 8,
                'oct': 9,
                'octubre': 9,
                'nov': 10,
                'noviembre': 10,
                'dic': 11,
                'diciembre': 11
            };
        } else if (lang == "fr") {
            monthsAbbr = [
                'Jan',
                'Fév',
                'Mar',
                'Avr',
                'Mai',
                'Jui',
                'Jul',
                'Aoû',
                'Sep',
                'Oct',
                'Nov',
                'Déc'
            ];

            monthsFull = [
                'Janvier',
                'Février',
                'Mars',
                'Avril',
                'Mai',
                'Juin',
                'Juillet',
                'Août',
                'Septembre',
                'Octobre',
                'Novembre',
                'Décembre'
            ];

            daysAbbr = [
                'Dim',
                'Lun',
                'Mar',
                'Mer',
                'Jeu',
                'Ven',
                'Sam'
            ];

            daysFull = [
                'Dimanchi',
                'Lundi',
                'Mardi',
                'Mercredi',
                'Jeudi',
                'Vendredi',
                'Samedi'
            ];

            dayNames = {
                'di': 0,
                'dim': 0,
                'dimanchi': 0,
                'lu': 1,
                'lun': 1,
                'lundi': 1,
                'ma': 2,
                'mar': 2,
                'mardi': 2,
                'me': 3,
                'mer': 3,
                'mercredi': 3,
                'je': 4,
                'jeu': 4,
                'jeudi': 4,
                've': 5,
                'ven': 5,
                'vendredi': 5,
                'sa': 6,
                'sam': 6,
                'samedi': 6
            };
            monthsAll = monthsFull.concat(monthsAbbr);
            daysAll = [
                'di',
                'dim',
                'dimanchi',
                'lu',
                'lun',
                'lundi',
                'ma',
                'mar',
                'mardi',
                'me',
                'mer',
                'mercredi',
                'je',
                'jeu',
                'jeudi',
                've',
                'ven',
                'vendredi',
                'sa',
                'sam',
                'samedi'
            ];

            monthNames = {
                'jan': 0,
                'janvier': 0,
                'fév': 1,
                'février': 1,
                'mar': 2,
                'mars': 2,
                'avr': 3,
                'avril': 3,
                'mai': 4,
                'jui': 5,
                'juin': 5,
                'jul': 6,
                'juillet': 6,
                'aoû': 7,
                'août': 7,
                'sep': 8,
                'septembre': 8,
                'oct': 9,
                'octobre': 9,
                'nov': 10,
                'novembre': 10,
                'déc': 11,
                'décembre': 11
            };
        } else if (lang == "pt-BR") {
            monthsAbbr = [
                'Jan',
                'Fev',
                'Mar',
                'Abr',
                'Mai',
                'Jun',
                'Jul',
                'Ago',
                'Set',
                'Out',
                'Nov',
                'Dez'
            ];

            monthsFull = [
                'Janeiro',
                'Fevereiro',
                'Março',
                'Abril',
                'Maio',
                'Junho',
                'Julho',
                'Agosto',
                'Setembro',
                'Outubro',
                'Novembro',
                'Dezembro'
            ];

            daysAbbr = [
                'Dom',
                'Seg',
                'Ter',
                'Qua',
                'Qui',
                'Sex',
                'Sab'
            ];

            daysFull = [
                'Domingo',
                'Segunda',
                'Terça',
                'Quarta',
                'Quinta',
                'Sexta',
                'Sábado'
            ];

            dayNames = {
                'do': 0,
                'dom': 0,
                'domingo': 0,
                'se': 1,
                'seg': 1,
                'segunda': 1,
                'te': 2,
                'ter': 2,
                'terca': 2,
                'qa': 3,
                'qua': 3,
                'quarta': 3,
                'qi': 4,
                'qui': 4,
                'quinta': 4,
                'se': 5,
                'sex': 5,
                'sexta': 5,
                'sa': 6,
                'sab': 6,
                'sabado': 6
            };
            monthsAll = monthsFull.concat(monthsAbbr);
            daysAll = [
                'do',
                'dom',
                'domingo',
                'se',
                'seg',
                'segunda',
                'te',
                'ter',
                'terça',
                'qa',
                'qua',
                'quarta',
                'qi',
                'qui',
                'quinta',
                'se',
                'sex',
                'sexta',
                'sa',
                'sab',
                'sábado'
            ];

            monthNames = {
                'jan': 0,
                'janeiro': 0,
                'fev': 1,
                'fevereiro': 1,
                'mar': 2,
                'março': 2,
                'abr': 3,
                'abril': 3,
                'mai': 4,
                'jun': 5,
                'junho': 5,
                'jul': 6,
                'julho': 6,
                'ago': 7,
                'agosto': 7,
                'set': 8,
                'setembro': 8,
                'out': 9,
                'outubro': 9,
                'nov': 10,
                'novembro': 10,
                'dez': 11,
                'dezembro': 11
            };
        }
    };

    // Are we being imported?..
    if (typeof module !== "undefined" && typeof module.exports === "object") {
        module.exports.language = language;
    } else if (typeof exports === "object") {
        exports.language = language;
    } else if (typeof Date.language === "undefined"){
        // ...if not and if no language, then add statically to Date (for browsers.)
        Date.language = language;
    }
}());
