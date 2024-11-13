/*
 * @copyright (c) 2016, Philipp Thürwächter & Pattrick Hüper
 * @license BSD-3-Clause (see LICENSE in the root directory of this source tree)
 */

import {assert, requireNonNull} from '../assert';
import {UnsupportedTemporalTypeException} from '../errors';

import {Instant} from '../Instant';
import {LocalDate} from '../LocalDate';
import {LocalTime} from '../LocalTime';
import {MathUtil} from '../MathUtil';
import {ZoneId} from '../ZoneId';

import {ChronoField} from './ChronoField';
import {TemporalQueries} from './TemporalQueries';
import {TemporalAccessor} from './TemporalAccessor';

/**
 * A wrapper around a native javascript Date instance that
 * implements TemporalAccessor functionality
 */
class NativeJsTemporal extends TemporalAccessor {

    /**
     * @param {!(Date|moment)} date - a javascript Date or a moment instance
     * @param {ZoneId} [zone=ZoneId.systemDefault()] - the zone of the temporal, defaults to ZoneId.systemDefault()
     * @private
     */
    constructor(date, zone=ZoneId.systemDefault()){
        super();
        this._zone = zone;
        if(date instanceof Date) {
            this._epochMilli = date.getTime();
            return;
        } else if(typeof date.toDate === 'function' &&  date.toDate() instanceof Date) {
            // it's a moment
            this._epochMilli = date.toDate().getTime();
            return;
        }
        assert(false, 'date must be either a javascript date or a moment');
    }

    /**
     * @param {TemporalQuery} query  the query to invoke, not null
     * @return {*} the query result, null may be returned (defined by the query)
     * @throws DateTimeException if unable to query
     */
    query(query) {
        requireNonNull(query, 'query');
        if (query === TemporalQueries.localDate()) {
            return LocalDate.ofInstant(Instant.ofEpochMilli(this._epochMilli), this._zone);
        } else if(query === TemporalQueries.localTime()){
            return LocalTime.ofInstant(Instant.ofEpochMilli(this._epochMilli), this._zone);
        } else if(query === TemporalQueries.zone()){
            return this._zone;
        }
        return super.query(query);
    }

    /**
     *
     * @param {TemporalField} field
     * @returns {number}
     */
    get(field) {
        return this.getLong(field);
    }

    /**
     *
     * @param {!TemporalField} field
     * @returns {number}
     */
    getLong(field) {
        requireNonNull(field, 'field');
        if (field instanceof ChronoField) {
            switch (field) {
                case ChronoField.NANO_OF_SECOND: return MathUtil.floorMod(this._epochMilli, 1000) * 1000000;
                case ChronoField.INSTANT_SECONDS: return MathUtil.floorDiv(this._epochMilli, 1000);
            }
            throw new UnsupportedTemporalTypeException('Unsupported field: ' + field);
        }
        return field.getFrom(this);
    }

    /**
     *
     * @param {TemporalField} field
     * @returns {boolean}
     */
    isSupported(field){
        return field === ChronoField.INSTANT_SECONDS || field === ChronoField.NANO_OF_SECOND;
    }
}

/**
 *
 * @param {!(Date|moment)} date - a javascript Date or a moment instance
 * @param {ZoneId} [zone=ZoneId.systemDefault()] - the zone of the temporal, defaults to ZoneId.systemDefault()
 * @returns {NativeJsTemporal}
 */
export function nativeJs(date, zone){
    return new NativeJsTemporal(date, zone);
}
