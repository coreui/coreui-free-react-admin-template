# js-joda cheat sheet

For a detailed API Reference refer to the [ESDoc generated docs](./esdoc/).

## Table of contents

<!-- toc -->

- [General concepts](#general-concepts)
  * [Method naming conventions](#method-naming-conventions)
- [LocalDate](#localdate)
  * [Create a `LocalDate`](#create-a-localdate)
  * [Get values from `LocalDate`](#get-values-from-localdate)
  * [Get week of week-based year, quarter of year, day of quarter](#get-week-of-week-based-year-quarter-of-year-day-of-quarter)
  * [Adding to and subtracting from a `LocalDate`](#adding-to-and-subtracting-from-a-localdate)
  * [Alter specific fields of a LocalDate](#alter-specific-fields-of-a-localdate)
  * [Compare one `LocalDate` with another](#compare-one-localdate-with-another)
  * [Distance on the timeline](#distance-on-the-timeline)
  * [Converting from and to other temporals](#converting-from-and-to-other-temporals)
  * [Adjust a date to another date](#adjust-a-date-to-another-date)
- [LocalTime](#localtime)
  * [Create a `LocalTime` instance](#create-a-localtime-instance)
  * [Get values from `LocalTime`](#get-values-from-localtime)
  * [Adding to/ subtracting from a `LocalTime` instance](#adding-to-subtracting-from-a-localtime-instance)
  * [Alter specific fields of a `LocalTime` instance](#alter-specific-fields-of-a-localtime-instance)
  * [Truncate a `LocalTime` instance](#truncate-a-localtime-instance)
  * [Compare `LocalTime` instances](#compare-localtime-instances)
  * [Distance between times](#distance-between-times)
  * [Convert a `LocalTime` from a `moment` or JavaScript `Date`](#convert-a-localtime-from-a-moment-or-javascript-date)
- [LocalDateTime](#localdatetime)
  * [Create a `LocalDateTime` instance](#create-a-localdatetime-instance)
  * [Get values from `LocalDateTime`](#get-values-from-localdatetime)
  * [Adding to and subtracting from a `LocalDateTime` instance](#adding-to-and-subtracting-from-a-localdatetime-instance)
  * [Alter specific fields of a `LocalDateTime` instance](#alter-specific-fields-of-a-localdatetime-instance)
  * [Truncate a `LocalDateTime` instance](#truncate-a-localdatetime-instance)
  * [Compare `LocalDateTime` instances](#compare-localdatetime-instances)
  * [Distance between two `LocalDateTime` instances](#distance-between-two-localdatetime-instances)
  * [Convert from a `moment` or JavaScript `Date`](#convert-from-a-moment-or-javascript-date)
- [ZonedDateTime](#zoneddatetime)
  * [The `SYSTEM` zone ID](#the-system-zone-id)
  * [Working with time zones](#working-with-time-zones)
  * [Create a ZonedDateTime](#create-a-zoneddatetime)
  * [Switch time zones](#switch-time-zones)
  * [Get and manipulate values from a `ZonedDateTime`](#get-and-manipulate-values-from-a-zoneddatetime)
  * [Calculate values across daylight savings transitions](#calculate-values-across-daylight-savings-transitions)
- [Period](#period)
- [Duration](#duration)
- [Customizing js-joda](#customizing-js-joda)
  * [Custom temporal adjuster](#custom-temporal-adjuster)
  * [Custom temporal fields and temporal units](#custom-temporal-fields-and-temporal-units)
  * [Custom formatter and queries](#custom-formatter-and-queries)

<!-- tocstop -->

---

## General concepts

The API is **immutable**. An existing instance is never changed. All manipulating methods (`plus`, `at`, etc.) return new instances.

**An existing instance is always valid**. If you try to create an invalid value, you'll get an exception instead of a `null` or `undefined` value.

### Method naming conventions

The API uses consistently named methods.

| method name or prefix | usage                                        | examples                                                        |
| --------------------- | -------------------------------------------- | --------------------------------------------------------------- |
| `.of`                 | static factory method for building by parts  | `LocalDate.of(2016, 2, 23)` <br> `LocalDate.ofInstant(i)`       |
| `.parse`              | static factory method for parsing strings    | `LocalDate.parse('2016-02-23')` <br> `LocalTime.parse('12:34')` |
| `.is`                 | checks for certain conditions                | `t1.isAfter(t2)` <br> `d1.isLeapYear()`                         |
| `.equals`             | checks for equivalence between two instances | `t1.equals(t2)`                                                 |
| `.with`               | the immutable equivalent of a setter         | `d.withDayOfMonth(1)` <br> `t.withHour(9)`                      |
| `.plus`               | adds an amount to an object                  | `t.plusMinutes(5)` <br> `d.plus(3, ChronoUnit.YEARS)`           |
| `.minus`              | subtracts an amount from an object           | `t.minusHours(1)` <br> `d.minus(1, ChronoUnit.DAYS)`            |
| `.to`                 | converts this object to another type         | `dt.toLocalDate()` <br> `d1.until(d2).toTotalMonths()`          |
| `.at`                 | combines one object with another             | `date.atTime(time)` <br> `localDate.atZone(tz)`                 |

Note that getter methods for instance properties omit the get keyword: `d.year()`, not ~~`d.getYear()`~~.

## LocalDate

A `LocalDate` represents a date with **no time** and **no time zone** in the [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601) calendar system, such as 2007-12-24.

### Create a `LocalDate`

```javascript
// obtain the current date in the system default time zone, e.g. 2016-02-23
LocalDate.now();

// obtain the current date in the UTC time zone, e.g. 2016-02-23
LocalDate.now(ZoneOffset.UTC);

// obtain an instance of LocalDate from an ISO 8601 formatted text string
LocalDate.parse('2016-02-23');

// obtain an instance of LocalDate from a year, month, and dayOfMonth value
LocalDate.of(2016, 2, 23); // 2016-02-23

// obtain an instance of LocalDate from a year, month, and dayOfMonth value
LocalDate.of(2016, Month.FEBRUARY, 23); // 2016-02-23

// obtain an instance of LocalDate from an epochDay where day 0 is 1970-01-01
LocalDate.ofEpochDay(-1); // 1969-12-31

// obtain an instance of LocalDate from an epochDay where day 0 is 1970-01-01
LocalDate.ofYearDay(2016, 42); // 2016-02-11
```

### Get values from `LocalDate`

```javascript
var d = LocalDate.parse('2016-12-24');

d.toString(); // '2016-12-24' ISO 8601 format

d.dayOfMonth(); // 24
d.month(); // Month.DECEMBER
d.monthValue(); // 12
d.year(); // 2016

d.dayOfWeek(); // DayOfWeek.SATURDAY
d.dayOfWeek().value(); // 6
d.dayOfYear(); // 359

d.isLeapYear(); // true - 2016 is a leap year
d.plusYears(1).isLeapYear(); // false

// get the epoch day where 0 is 1970-01-01
d.toEpochDay(); // 17159

// get range of month
d.lengthOfMonth(); // 31
d.range(ChronoField.DAY_OF_MONTH); // ValueRange(1 - 31)

// get range of year
d.lengthOfYear(); // 366
d.range(ChronoField.DAY_OF_YEAR); // ValueRange(1 - 366)

// get other date-based field like the aligned week of year
d.get(ChronoField.ALIGNED_WEEK_OF_YEAR); // 52

// or the day of week aligned to the first day of month
d.get(ChronoField.ALIGNED_DAY_OF_WEEK_IN_MONTH); // 3
```

### Get week of week-based year, quarter of year, day of quarter

```javascript
// get week of week-based year as defined by ISO 8601, with a Monday-based week
d.get(IsoFields.WEEK_OF_WEEK_BASED_YEAR); // 51

d.isoWeekOfWeekyear(); // 51, equivalent to the above
d.isoWeekyear(); // 2016

LocalDate.of(2017, 1, 1).isoWeekOfWeekyear(); // 52
LocalDate.of(2017, 1, 1).isoWeekyear(); // 2016

// set the date to week 52 of week-based year with the same day of week
d.with(IsoFields.WEEK_OF_WEEK_BASED_YEAR, 52); // 2016-12-31

// get the quarter of the year
d.get(IsoFields.QUARTER_OF_YEAR); // 4
d.get(IsoFields.DAY_OF_QUARTER); // 85

// set the date to the 15th day of the third quarter
d.with(IsoFields.QUARTER_OF_YEAR, 3).with(IsoFields.DAY_OF_QUARTER, 15); // 2016-07-15
```

### Adding to and subtracting from a `LocalDate`

Note that each of these methods returns a new `LocalDate` instance.

```javascript
var d = LocalDate.parse('2016-02-23');

// add/subtract 366 days
d.plusDays(366); // '2017-02-23'
d.minusDays(366); // '2015-02-22'

// add/subtract 12 months
d.plusMonths(12); // '2017-02-23'
d.minusMonths(12); // '2015-02-23'

// add/subtract 4 weeks
d.plusWeeks(4); // '2016-03-22'
d.minusWeeks(4); // '2016-01-26'

// add/subtract 1 year
d.plusYears(1); // '2017-02-23'
d.minusYears(1); // '2015-02-23'

// add/subtract 30 years
d.plus(3, ChronoUnit.DECADES); // '2046-02-23'
d.minus(3, ChronoUnit.DECADES); // '1986-02-23'

// add/subtract a Period of 3 Months and 3 Days
d.plus(Period.ofMonths(3).plusDays(3)); // '2016-05-26'
d.minus(Period.ofMonths(3).plusDays(3)); // '2015-11-20'
```

### Alter specific fields of a LocalDate

```javascript
var d = LocalDate.parse('2016-12-24');

// set the day of month to 1
d.withDayOfMonth(1); // '2016-12-01'

// set month and the day of month to 1
d.withMonth(1).withDayOfMonth(1); // '2016-01-01'

// set month to November and the day of month to 1
d.withMonth(Month.NOVEMBER).withDayOfMonth(1); // '2016-11-01'

// set the year to beginning of era
d.withYear(1); // '0001-12-24'

// get the last day of the current month
LocalDate.now()
  .plusMonths(1)
  .withDayOfMonth(1)
  .minusDays(1);

// set the day of year
d.withDayOfYear(42); // 2016-02-11

// set the week of week-based year to 52
d.with(IsoFields.WEEK_OF_WEEK_BASED_YEAR, 52); // 2016-12-31
```

### Compare one `LocalDate` with another

```javascript
var d1 = LocalDate.parse('2016-12-24');
var d2 = d1.plusDays(2);

d1.isAfter(d2); // false
d1.isBefore(d2); // true

d1.equals(d2); // false
d1.equals(d1.plusDays(0)); // true
d1.equals(d1.plusDays(1)); // false

d1.compareTo(d1) === 0; // true
d1.compareTo(d2) < 0; // true
d2.compareTo(d1) > 0; // true

d1.hashCode(); // 4129560
d2.hashCode(); // 4129562
d1.hashCode() !== d2.hashCode(); // true
```

### Distance on the timeline

```javascript
var d1 = LocalDate.parse('2016-12-24');
var d2 = d1.plusMonths(13).plusDays(42);

// obtain the Period between the two dates
d1.until(d2).toString(); // 'P1Y2M11D' (1 year, 2 months, 11 days in ISO-8601 period format)
d1.until(d2).toTotalMonths(); // 14

// obtain the distance between the two dates with a specific precision
d1.until(d2, ChronoUnit.MONTHS); // 14, returns the distance in total months
d1.until(d2, ChronoUnit.DAYS); // 438, returns the distance in total days
```

### Converting from and to other temporals

```javascript
// obtain a LocalDate from a LocalDateTime instance
var dt = LocalDateTime.now();
LocalDate.from(dt); // LocalDate from LocalDateTime
dt.toLocalDate(); // LocalDateTime to LocalDate (equivalent to the above)

var d1 = LocalDate.parse('2016-02-25');

// obtain a LocalDateTime at a certain LocalTime
d1.atStartOfDay(); // '2016-02-25T00:00'
d1.atTime(LocalTime.of(11, 55)); // '2016-02-25T11:55'
d1.atTime(LocalTime.NOON); // '2016-02-25T12:00'

// obtain a LocalDate from a JavaScript Date

// the manual way
var d = LocalDate.ofInstant(Instant.ofEpochMilli(new Date().getTime()));
// the recommended way with the JavaScript temporal
d = LocalDate.from(nativeJs(new Date()));
// converting from a moment works the same way
d = LocalDate.from(nativeJs(moment()));
```

### Adjust a date to another date

`TemporalAdjusters` provide compact business logic for date-based temporals such as `LocalDate`, `LocalDateTime` or `ZonedDateTime`.

```javascript
var d = LocalDate.parse('2016-12-24');

// get first/ last day of month
d.with(TemporalAdjusters.firstDayOfMonth()); // 2016-12-01
d.with(TemporalAdjusters.lastDayOfMonth()); // 2016-12-31

// get the next specified weekday
d.with(TemporalAdjusters.nextOrSame(DayOfWeek.SUNDAY)); // 2016-12-25
d.with(TemporalAdjusters.nextOrSame(DayOfWeek.SATURDAY)); // 2016-12-24
d.with(TemporalAdjusters.next(DayOfWeek.SATURDAY)); // 2016-12-31

// get the first/last weekday of month
d.with(TemporalAdjusters.lastInMonth(DayOfWeek.SATURDAY)); // 2016-12-31
d.with(TemporalAdjusters.firstInMonth(DayOfWeek.SATURDAY)); // 2016-12-03
```

Find more adjusters in the TemporalAdjusters API documentation.

## LocalTime

A `LocalTime` represents a time with **no date** and **no time zone** in the [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601) calendar system, such as '10:15:30'

### Create a `LocalTime` instance

```javascript
// obtain the current time in the system default time zone, e.g. '10:29:05.743'
LocalTime.now();

// obtain the current time in the UTC time zone, e.g. '09:29:05.743'
LocalTime.now(ZoneOffset.UTC);

// obtain an instance of LocalTime from an ISO 8601 formatted text string
LocalTime.parse('09:42'); // '09:42'
LocalTime.parse('09:42:42'); // '09:42:42'
LocalTime.parse('09:42:42.123'); // '09:42:42.123'
LocalTime.parse('09:42:42.123456789'); // '09:42:42.123456789'

// obtain an instance of LocalTime from hour, minute, second, and nanosecond values
LocalTime.of(23, 55); // '23:55'
LocalTime.of(23, 55, 42); // '23:55:42'
LocalTime.of(23, 55, 42, 123000000); // '23:55:42.123'

// obtain an instance of LocalTime from second of day
LocalTime.ofSecondOfDay(3666); // '01:01:06'
```

### Get values from `LocalTime`

```javascript
var t = LocalTime.parse('23:55:42.123');

t.toString(); // '23:55:42.123' ISO 8601 format

t.hour(); // 23
t.minute(); // 55
t.second(); // 42
t.nano(); // 123000000

// get other time-based fields
t.get(ChronoField.SECOND_OF_DAY); // 86142
t.get(ChronoField.MILLI_OF_SECOND); // 123
t.get(ChronoField.HOUR_OF_AMPM); // 11
// any other time-based ChronoField is allowed as param for get
```

### Adding to/ subtracting from a `LocalTime` instance

```javascript
var t = LocalTime.parse('11:55:42');

// add/subtract 12 hours
t.plusHours(12); // '23:55:42'
t.minusHours(12); // '23:55:42'

// add/subtract 30 minutes
t.plusMinutes(30); // '12:25:42'
t.minusMinutes(30); // '11:25:42'

// add/subtract 30 seconds
t.plusSeconds(30); // '11:56:12'
t.minusSeconds(30); // '11:55:12'

// add/subtract 1 million nanoseconds (1 millisecond)
t.plusNanos(1000000); // '11:56:42.001'
t.minusNanos(1000000); // '11:55:41.999'

// add/subtract a time-based unit
t.plus(1, ChronoUnit.MILLIS); // '11:55:42.001'
t.plus(1, ChronoUnit.HALF_DAYS); // '23:55:42'

// add/subtract a duration of 15 minutes
t.plus(Duration.ofMinutes(15)); // '12:10:42'
t.minus(Duration.ofMinutes(15)); // '11:40:42'
```

### Alter specific fields of a `LocalTime` instance

```javascript
var t = LocalTime.parse('11:55:42');

// set the hour of day to 1
t.withHour(1); // '01:55:42'

// set the minute of hour to 1
t.withMinute(1); // '11:01:42'

// set the second of minute to 1
t.withSecond(1); // '11:55:01'

// set the MILLI_OF_SECOND to 51
t.with(ChronoField.MILLI_OF_SECOND, 51); // '11:55:42.051'

// set by a custom  TemporalAdjusters
// sample of a custom adjuster that adjust to the next even second
nextEvenSecond = {
  adjustInto: function(t) {
    return t.second() % 2 === 0 ? t.plusSeconds(2) : t.plusSeconds(1);
  },
};
t.with(nextEvenSecond); // '11:55:44'
t.plusSeconds(1).with(nextEvenSecond); // '11:55:44'
```

### Truncate a `LocalTime` instance

```javascript
var t = LocalTime.parse('23:55:42.123');

t.truncatedTo(ChronoUnit.SECONDS); // '23:55:42'
t.truncatedTo(ChronoUnit.MINUTES); // '23:55:00'
t.truncatedTo(ChronoUnit.HOURS); // '23:00'
t.truncatedTo(ChronoUnit.HALF_DAYS); // '12:00'
t.truncatedTo(ChronoUnit.DAYS); // '00:00'
```

### Compare `LocalTime` instances

```javascript
var t1 = LocalTime.parse('11:55:42');
var t2 = t1.plusHours(2);

t1.isAfter(t2); // false
t1.isBefore(t2); // true

t1.equals(t1.plusHours(0)); // true
t1.equals(t1.plusHours(1)); // false

t1.compareTo(t1) === 0; // true
t1.compareTo(t2) < 0; // true
t2.compareTo(t1) > 0; // true

t1.hashCode(); // 916974646
t2.hashCode(); // -1743180648
t1.hashCode() !== t2.hashCode(); // true
```

### Distance between times

```javascript
var t1 = LocalTime.parse('11:00');
var t2 = t1
  .plusHours(2)
  .plusMinutes(42)
  .plusSeconds(12);

// obtain the duration between the two dates
t1.until(t2, ChronoUnit.HOURS); // 2
t1.until(t2, ChronoUnit.MINUTES); // 162
t1.until(t2, ChronoUnit.SECONDS); // 9732
```

### Convert a `LocalTime` from a `moment` or JavaScript `Date`

```javascript
// obtain a LocalTime instance from a JavaScript Date

// the manual way
var t = LocalTime.ofInstant(Instant.ofEpochMilli(new Date().getTime()));
// the recommended way with the JavaScript temporal
t = LocalTime.from(nativeJs(new Date()));
// converting from a `moment` instance works the same way
d = LocalTime.from(nativeJs(moment()));
```

## LocalDateTime

A LocalDateTime represents a date-time with **no time zone** in the [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601) calendar system, such as '2007-12-03T10:15:30'.

### Create a `LocalDateTime` instance

```javascript
// obtain the current date and time in the system default time zone, e.g. '2016-02-26T10:29:05.743'
LocalDateTime.now();

// obtain the current date and time in the UTC time zone
LocalDateTime.now(ZoneOffset.UTC);

// obtain an instance of LocalDateTime from an ISO 8601 formatted text string
LocalDateTime.parse('2016-02-26T09:42'); // '2016-02-26T09:42'
LocalDateTime.parse('2016-02-26T09:42:42.123'); // '2016-02-26T09:42:42.123'

// obtain an instance of LocalDateTime from year, month, dayOfMonth, hour, minute, second and nanosecond values
LocalDateTime.of(2016, 2, 29); // '2016-02-29T00:00'
LocalDateTime.of(2016, 2, 29, 12, 55, 42); // '2016-02-29T12:55:42'
LocalDateTime.of(2016, 2, 29, 12, 55, 42, 9); // '2016-02-29T12:55:42.000000009'

// obtain an instance of LocalDateTime from epoch seconds and a ZoneOffset
LocalDateTime.ofEpochSecond(0, ZoneOffset.UTC); // '1970-01-01T00:00'
LocalDateTime.ofInstant(Instant.now()); // current local date-time
LocalDateTime.ofInstant(Instant.now(), ZoneOffset.UTC); // current local UTC date-time
```

### Get values from `LocalDateTime`

```javascript
var dt = LocalDateTime.parse('2016-02-26T23:55:42.123');

dt.toString(); // '2016-02-26T23:55:42.123' ISO 8601 format

dt.year(); // 2016
dt.month(); // Month.FEBRUARY
dt.monthValue(); // 2
dt.dayOfMonth(); // 26
dt.hour(); // 23
dt.minute(); // 55
dt.second(); // 42
dt.nano(); // 123000000

dt.dayOfWeek(); // DayOfWeek.FRIDAY
dt.dayOfWeek().value(); // 5
dt.dayOfYear(); // 57

dt.toLocalDate().isLeapYear(); // true 2016 is a leap year

// obtain the date and time components of the LocalDateTime
dt.toLocalDate();
dt.toLocalTime();

// get range of month
dt.toLocalDate().lengthOfMonth(); // 29
dt.range(ChronoField.DAY_OF_MONTH); // ValueRange(1 - 29)

// get range of year
dt.toLocalDate().lengthOfYear(); // 366
dt.range(ChronoField.DAY_OF_YEAR); // ValueRange(1 - 366)

// get other date-based fields like the aligned week of year
dt.get(ChronoField.ALIGNED_WEEK_OF_YEAR); // 9

// get week of week-based year
dt.get(IsoFields.WEEK_OF_WEEK_BASED_YEAR); // 8
dt.toLocalDate().isoWeekOfWeekyear();

// get other time-based fields
dt.get(ChronoField.SECOND_OF_DAY); // 86142
dt.get(ChronoField.MILLI_OF_SECOND); // 123
dt.get(ChronoField.HOUR_OF_AMPM); // 11
// any other date or time-based ChronoField can be passed to `get`
```

### Adding to and subtracting from a `LocalDateTime` instance

```javascript
var dt = LocalDateTime.parse('2016-02-26T23:55:42.123');

// add/subtract 366 days
dt.plusDays(366); // '2017-02-26T23:55:42.123'
dt.minusDays(366); // '2015-02-25T23:55:42.123'

// add/subtract 12 months
dt.plusMonths(12); // '2017-02-26'
dt.minusMonths(12); // '2015-02-26'

// add/subtract 4 weeks
dt.plusWeeks(4); // '2016-03-25T23:55:42.123'
dt.minusWeeks(4); // '2016-01-29T23:55:42.123'

// add/subtract 1 year to the parsed LocalDate and returns a new instance
dt.plusYears(1); // '2017-02-26T23:55:42.123'
dt.minusYears(1); // '2015-02-26T23:55:42.123'

// add/subtract 30 years
dt.plus(3, ChronoUnit.DECADES); // '2046-02-26T23:55:42.123'
dt.minus(3, ChronoUnit.DECADES); // '1986-02-26T23:55:42.123'

// add subtract a Period of 3 Months and 3 Days
dt.plus(Period.ofMonths(3).plusDays(3)); // '2016-05-29T23:55:42.123'
dt.minus(Period.ofMonths(3).plusDays(3)); // '2015-11-23T23:55:42.123'

// add/subtract 12 hours
dt.plusHours(12); // '2016-02-27T11:55:42.123'
dt.minusHours(12); // '2016-02-26T11:55:42.123'

// add/subtract 30 minutes
dt.plusMinutes(30); // '2016-02-27T00:25:42.123'
dt.minusMinutes(30); // '2016-02-26T23:25:42.123'

// add/subtract 30 seconds
dt.plusSeconds(30); // '2016-02-26T23:56:12.123'
dt.minusSeconds(30); // '2016-02-26T23:55:12.123'

// add/subtract 1 million nanoseconds (1 millisecond)
dt.plusNanos(1000000); // '2016-02-26T23:55:42.124'
dt.minusNanos(1000000); // '2016-02-26T23:55:42.122'

// add/subtract a time-based unit
dt.plus(1, ChronoUnit.MILLIS); // '2016-02-26T23:55:42.124'
dt.plus(1, ChronoUnit.HALF_DAYS); // '2016-02-26T11:55:42.123'

// add/subtract a duration of 30 hours and 45 minutes
dt.plus(Duration.ofHours(30).plusMinutes(45)); // '2016-02-28T06:40:42.123'
dt.minus(Duration.ofHours(30).plusMinutes(45)); // '2016-02-25T17:10:42.123'
```

### Alter specific fields of a `LocalDateTime` instance

```javascript
var dt = LocalDateTime.parse('2016-02-26T23:55:42.123');

// set the hour of day to 1
dt.withHour(1); // '2016-02-26T01:55:42.123'

// set the minute of hour to 1
dt.withMinute(1); // '2016-02-26T23:01:42.123'

// set the second of minute to 1
dt.withSecond(1); // '2016-02-26T23:55:01.123'

// set the nanosecond of second to 1
dt.withNano(0); // '2016-02-26T23:55:42'

// set the millisecond of second to 51
dt.with(ChronoField.MILLI_OF_SECOND, 51); // '2016-02-26T23:55:42.051'

// set by a custom TemporalAdjuster that adjusts to the next even second
var nextEvenSecond = {
  adjustInto: function(t) {
    return t.second() % 2 === 0 ? t.plusSeconds(2) : t.plusSeconds(1);
  },
};
dt.with(nextEvenSecond); // '2016-02-26T23:55:44.123'
dt.plusSeconds(1).with(nextEvenSecond); // '2016-02-26T23:55:44.123'
```

### Truncate a `LocalDateTime` instance

```javascript
var dt = LocalDateTime.parse('2016-02-26T23:55:42.123');

dt.truncatedTo(ChronoUnit.SECONDS); // '2016-02-26T23:55:42'
dt.truncatedTo(ChronoUnit.MINUTES); // '2016-02-26T23:55:00'
dt.truncatedTo(ChronoUnit.HOURS); // '2016-02-26T23:00'
dt.truncatedTo(ChronoUnit.HALF_DAYS); // '2016-02-26T12:00'
dt.truncatedTo(ChronoUnit.DAYS); // '2016-02-26T00:00'
```

### Compare `LocalDateTime` instances

```javascript
var dt1 = LocalDateTime.parse('2016-02-26T23:55:42.123');
var dt2 = dt1.plusHours(2);

dt1.isAfter(dt2); // false
dt1.isBefore(dt2); // true

dt1.equals(dt1.plusHours(0)); // true
dt1.equals(dt1.plusHours(1)); // false

dt1.compareTo(dt1) === 0; // true
dt1.compareTo(dt2) < 0; // true
dt2.compareTo(dt1) > 0; // true

// Warn! hashCode is equal if in insances are equal, but might be equal for unequal instances as well
dt1.hashCode(); // -2036645668
dt2.hashCode(); // 1459191821
dt1.hashCode() !== dt2.hashCode(); // true
```

### Distance between two `LocalDateTime` instances

```javascript
var dt1 = LocalDateTime.parse('2016-02-26T23:55:42.123');
var dt2 = dt1
  .plusYears(6)
  .plusMonths(12)
  .plusHours(2)
  .plusMinutes(42)
  .plusSeconds(12);

// obtain the duration between the two dates
dt1.until(dt2, ChronoUnit.YEARS); // 7
dt1.until(dt2, ChronoUnit.MONTHS); // 84
dt1.until(dt2, ChronoUnit.WEEKS); // 356
dt1.until(dt2, ChronoUnit.DAYS); // 2557
dt1.until(dt2, ChronoUnit.HOURS); // 61370
dt1.until(dt2, ChronoUnit.MINUTES); // 3682242
dt1.until(dt2, ChronoUnit.SECONDS); // 220934532
```

### Convert from a `moment` or JavaScript `Date`

```javascript
// obtain a LocalDateTime instance from a JavaScript Date

// the manual way
var t = LocalDateTime.ofInstant(
  Instant.ofEpochMilli(new Date().getTime())
);
// the recommended way with the JavaScript temporal
t = LocalDateTime.from(nativeJs(new Date()));
// converting from a moment works the same way
d = LocalDateTime.from(nativeJs(moment()));
```

## ZonedDateTime

A `ZonedDateTime` represents a date-time with a [time offset](https://en.wikipedia.org/wiki/UTC_offset) and/or a [time zone](https://en.wikipedia.org/wiki/Time_zone) in the [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601) calendar system.

On its own, `ZonedDateTime` only supports specifying **time offsets** such as `UTC` or `UTC+02:00`, plus the `SYSTEM` time zone ID.

### The `SYSTEM` zone ID

The `SYSTEM` zone ID is a non-standard ID that is specific to `js-joda`. It represents the default time zone of the current JavaScript runtime. The JavaScript spec does not provide an API this; it only provides the system default time offset for a point in the timeline (`Date.prototype.getTimezoneOffset()`).

You should not exchange `ZonedDateTime` instances using the `SYSTEM` zone ID between JavaScript environments (e.g. between server and client, or between two servers). The time offset on another machine won't necessarily be the same as yours. Before sending a `ZonedDateTime` to someone else, convert it to a fixed offset:

```javascript
// current time with default `SYSTEM`
ZonedDateTime.now().toString(); // e.g. 2016-03-18T12:38:23.561+01:00[SYSTEM]

// converted to a fixed time offset
ZonedDateTime.now()
  .withFixedOffsetZone()
  .toString(); // e.g. 2016-03-18T12:38:23.561+01:00
```

### Working with time zones

A **time zone** and a **time offset** are [not the same thing](https://en.wikipedia.org/wiki/UTC_offset#Time_zones_and_time_offsets). Some timezones change from standard time to [daylight savings time](https://en.wikipedia.org/wiki/Daylight_saving_time) and back every year:

- In the `Europe/Berlin` _time zone_, the _time offset_ is `UTC+2` during the summer, and `UTC+1` during the rest of the year.
- In the `Africa/Lagos` _time zone_, on the other hand, the _time offset_ is `UTC+1` all year round.

Calculations that might span time zones or daylight savings transitions need to reference the time zone, not just the offset.

The @js-joda/timezone package provides bindings to the the [IANA tz database](https://www.iana.org/time-zones), making `joda-js`'s calculations time zone aware. The `tz` database uses zone names like `Africa/Bujumbura`, `America/New_York`, and `Europe/Lisbon` (see the [full list](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)).

To specify time zones using these names, you just need to `require` @js-joda/timezone.

```javascript
var jsJoda = require('@js-joda/core');
require('@js-joda/timezone');

var zdt = ZonedDateTime.now(ZoneId.of('Europe/Paris'));
```

### Create a ZonedDateTime

```javascript
// get now with the default system time zone
ZonedDateTime.now().toString(); // e.g. 2016-03-18T12:38:23.561+01:00[SYSTEM]

// get now with the UTC time zone
ZonedDateTime.now(ZoneOffset.UTC).toString(); // e.g. 2016-03-18T11:38:23.561Z

// get now with a fixed offset time zone
ZonedDateTime.now(ZoneId.of('UTC-05:00')).toString(); // e.g. 2016-03-18T06:38:23.561-05:00[UTC-05:00]

// get now with a ZoneRegion (requires `@js-joda/timezone`)
ZonedDateTime.now(ZoneId.of('Europe/Paris')).toString(); // e.g. 2017-02-04T17:01:15.846+01:00[Europe/Paris]

// parse a date time with a time zone ISO String
ZonedDateTime.parse('2016-03-18T12:38:23.561+01:00[SYSTEM]');
ZonedDateTime.parse('2016-03-18T12:38:23.561+01:00');
ZonedDateTime.parse('2016-03-18T11:38:23.561Z');
ZonedDateTime.parse('2016-03-18T06:38:23.561-05:00[UTC-05:00]');
ZonedDateTime.parse('2017-02-04T17:01:15.846+01:00[Europe/Paris]');

// create from a LocalDate(Time) (requires `@js-joda/timezone`)
LocalDate.parse('2012-06-06')
  .atStartOfDay()
  .atZone(ZoneId.of('Europe/Paris')); // 2012-06-06T00:00+02:00[Europe/Paris]
ZonedDateTime.of(
  LocalDateTime.parse('2012-06-06T00:00'),
  ZoneId.of('Europe/Paris')
); // 2012-06-06T00:00+02:00[Europe/Paris]
ZonedDateTime.of(
  LocalDate.parse('2012-06-06'),
  LocalTime.MIDNIGHT,
  ZoneId.of('Europe/Paris')
); // 2012-06-06T00:00+02:00[Europe/Paris]

// create from an Instant
ZonedDateTime.ofInstant(Instant.now(), ZoneId.SYSTEM); // current system time
```

### Switch time zones

> These examples require `@js-joda/timezone`.

```javascript
var d = LocalDate.of(2016, 3, 18);
var zdt = d.atTime(LocalTime.NOON).atZone(ZoneId.of('America/New_York')); //2016-03-18T12:00-04:00[America/New_York]

// switch time zone retaining the local date-time if possible
zdt.withZoneSameLocal(ZoneId.of('Europe/Berlin')); // 2016-03-18T12:00+01:00[Europe/Berlin]

// switch time zone and retain the instant
zdt.withZoneSameInstant(ZoneId.of('Europe/Berlin')); // 2016-03-18T17:00+01:00[Europe/Berlin]
```

### Get and manipulate values from a `ZonedDateTime`

`ZonedDateTime` implements the same methods as `LocalDateTime` for getting or setting values. See [the examples above](#get-values-from-localdatetime) for `LocalDateTime`.

### Calculate values across daylight savings transitions

When adding to or subtracting from a `ZonedDateTime` instance, the calculation is different depending on whether date or time units are passed.

- Addition/subtraction of **date units** are made on the **local** timeline.
- Addition/subtraction of **time units** are made on the **instant** timeline.

This example shows the difference for a daylight saving transition.

```javascript
// assume the system default time zone is CET; we define a time as 2016-03-18 at 17:00 local time
var zdt = ZonedDateTime.parse('2016-03-18T17:00+01:00[Europe/Berlin]');

// adding a date unit of 2 weeks, crossing a daylight saving transition
zdt.plusWeeks(2); // 2016-04-01T17:00+02:00[Europe/Berlin] (still 17:00)

// adding a time unit of 2 weeks (2 * 7 * 24)
zdt.plusHours(2 * 7 * 24); // 2016-04-01T18:00+02:00[Europe/Berlin] (now 18:00)
```

## Period

`Period` is a **date-based** amount of time in the ISO-8601 calendar system, such as '2 years, 3 months and 4 days'.

```javascript
// parse and format ISO 8601 period strings
Period.parse('P1Y10M').toString(); // 'P1Y10M'

// obtain a Period of 10 years, 5 month and 30 days
Period.of(10, 5, 30).toString(); // 'P10Y5M30D'

// 10 years
Period.ofYears(10).toString(); // 'P10Y'

// add 45 days to a Period
Period.ofYears(10)
  .plusDays(45)
  .toString(); // 'P10Y45D'

// normalize a Period of years and month
Period.of(1, 37, 0)
  .normalized()
  .toString(); // 'P4Y1M'

// add/subtract from a Period
Period.ofYears(10)
  .plusMonths(10)
  .minusDays(42)
  .toString(); // 'P10Y10M-42D'

// add a Period to LocalDate
var p = Period.ofMonths(1);
LocalDate.parse('2012-12-12').plus(p); // '2013-01-12';
LocalDate.parse('2012-01-31').plus(p); // '2012-02-29';
LocalDateTime.parse('2012-05-31T12:00').plus(p); // '2012-06-30T12:00';

// calculate the Period between two Dates
Period.between(
  LocalDate.parse('2012-06-30'),
  LocalDate.parse('2012-08-31')
); // 'P2M1D'
```

## Duration

`Duration` is a **time-based** amount of time, such as '34.5 seconds'.

```javascript
// obtain a Duration of 10 hours
Duration.ofHours(10).toString(); // 'PT10H'

// obtain a Duration of 10 days (10 x 24 hours)
Duration.ofDays(10).toString(); // 'PT240H'

// add/subtract a duration from a LocalDateTime
var dt = LocalDateTime.parse('2012-12-24T12:00');

dt.plus(Duration.ofHours(10).plusMinutes(30)).toString(); // '2012-12-24T22:30'
dt.minus(Duration.ofHours(12).multipliedBy(10)).toString(); // '2012-12-19T12:00'

// calculate the durations beetween to time-based temporals
var dt1 = LocalDateTime.parse('2012-12-24T12:00');

Duration.between(dt1, dt1.plusHours(10)).toString(); // 'PT10H'
```

## Customizing js-joda

This package is extensible, allowing you to create your own custom temporal calculations. See the temporal interface documentation for more information.

### Custom temporal adjuster

```javascript
// implement a TemporalAdjuster that the next or same even day of month
var nextOrSameEvenDay = {
  adjustInto: function(t) {
    return t.dayOfMonth() % 2 === 0 ? t : t.plusDays(1);
  },
};

LocalDateTime.parse('2012-12-23T12:00').with(nextOrSameEvenDay); // '2012-12-24T12:00'
LocalDate.parse('2012-12-24').with(nextOrSameEvenDay); // '2012-12-24'
```

### Custom temporal fields and temporal units

See the source for temporal/IsoFields as an example how to implement custom fields and units. `IsoFields` implements fields and units for an ISO week-based year.

### Custom formatter and queries

The following example implements a parser for a local date with an optional local time. It returns either a `LocalDate` or a `LocalDateTime`, depending on the parsed fields.

```javascript
// build a custom date time formatter where the time field is optional
var OPTIONAL_FORMATTER = DateTimeFormatter.ofPattern(
  'yyyy-MM-dd['T'HH:mm[:ss]]'
);

// create a temporal query that create a new Temporal depending on the existing fields
dateOrDateTimeQuery = {
  queryFrom: function(temporal) {
    var date = temporal.query(TemporalQueries.localDate());
    var time = temporal.query(TemporalQueries.localTime());
    if (time == null) return date;
    else return date.atTime(time);
  }
};

localDate = OPTIONAL_FORMATTER.parse('2012-12-24', dateOrDateTimeQuery);
localDateTime = OPTIONAL_FORMATTER.parse(
  '2012-12-24T23:59',
  dateOrDateTimeQuery
);
```
