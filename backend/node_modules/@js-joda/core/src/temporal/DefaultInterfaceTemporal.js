import {MAX_SAFE_INTEGER, MIN_SAFE_INTEGER} from '../MathUtil';
import {requireInstance, requireNonNull} from '../assert';
import {TemporalAdjuster} from './TemporalAdjuster';
import {TemporalAmount} from './TemporalAmount';
import {TemporalUnit} from './TemporalUnit';
import {Temporal} from './Temporal';

export class DefaultInterfaceTemporal extends Temporal {
    /**
     * Returns an adjusted object of the same type as this object with the adjustment made.
     * This adjusts this date-time according to the rules of the specified adjuster. A simple adjuster might simply set the one of the fields, such as the year field. A more complex adjuster might set the date to the last day of the month. A selection of common adjustments is provided in {@link TemporalAdjusters}. These include finding the "last day of the month" and "next Wednesday". The adjuster is responsible for handling special cases, such as the varying lengths of month and leap years.
     *
     * Some example code indicating how and why this method is used:
     *
     * <pre>
     *   date = date.with(Month.JULY);        // most key classes implement TemporalAdjuster
     *   date = date.with(lastDayOfMonth());  // static import from TemporalAdjusters
     *   date = date.with(next(WEDNESDAY));   // static import from TemporalAdjusters and DayOfWeek
     * </pre>
     *
     * ### Specification for implementors
     * Implementations must not alter either this object. Instead, an adjusted copy of the original must be returned. This provides equivalent, safe behavior for immutable and mutable implementations.
     *
     * @param {TemporalAdjuster} adjuster - the adjuster to use, not null
     * @return {Temporal} an object of the same type with the specified adjustment made, not null
     * @throws DateTimeException - if unable to make the adjustment
     * @throws ArithmeticException - if numeric overflow occurs
     */
    withAdjuster(adjuster) {
        requireNonNull(adjuster, 'adjuster');
        requireInstance(adjuster, TemporalAdjuster, 'adjuster');
        return adjuster.adjustInto(this);
    }

    /**
     * Returns an object of the same type as this object with an amount added.
     * This adjusts this temporal, adding according to the rules of the specified amount. The amount is typically a {@link Period} but may be any other type implementing the {@link TemporalAmount} interface, such as {@link Duration}.
     *
     * Some example code indicating how and why this method is used:
     *
     * <pre>
     *   date = date.plus(period);                  // add a Period instance
     *   date = date.plus(duration);                // add a Duration instance
     *   date = date.plus(workingDays(6));          // example user-written workingDays method
     * </pre>
     *
     * Note that calling plus followed by minus is not guaranteed to return the same date-time.
     *
     * ### Specification for implementors
     * Implementations must not alter either this object. Instead, an adjusted copy of the original must be returned. This provides equivalent, safe behavior for immutable and mutable implementations.
     *
     * @param {TemporalAmount} amount - the amount to add, not null
     * @return {Temporal} an object of the same type with the specified adjustment made, not null
     * @throws DateTimeException - if the addition cannot be made
     * @throws ArithmeticException - if numeric overflow occurs
     */
    plusAmount(amount) {
        requireNonNull(amount, 'amount');
        requireInstance(amount, TemporalAmount, 'amount');
        return amount.addTo(this);
    }

    /**
     * Returns an object of the same type as this object with an amount subtracted.
     * This adjusts this temporal, subtracting according to the rules of the specified amount. The
     * amount is typically a {@link Period} but may be any other type implementing the {@link TemporalAmount} interface, such as Duration.
     *
     * Some example code indicating how and why this method is used:
     *
     * <pre>
     *   date = date.minus(period);                  // subtract a Period instance
     *   date = date.minus(duration);                // subtract a Duration instance
     *   date = date.minus(workingDays(6));          // example user-written workingDays method
     * </pre>
     *
     * Note that calling plus followed by minus is not guaranteed to return the same date-time.
     *
     * ### Specification for implementors
     * Implementations must not alter either this object. Instead, an adjusted copy of the original
     * must be returned. This provides equivalent, safe behavior for immutable and mutable
     * implementations.
     *
     * @param {TemporalAmount} amount - the amount to subtract, not null
     * @return {Temporal} an object of the same type with the specified adjustment made, not null
     * @throws DateTimeException - if the subtraction cannot be made
     * @throws ArithmeticException - if numeric overflow occurs
     */
    minusAmount(amount) {
        requireNonNull(amount, 'amount');
        requireInstance(amount, TemporalAmount, 'amount');
        return amount.subtractFrom(this);
    }

    /**
     * Returns an object of the same type as this object with the specified period subtracted.
     * This method returns a new object based on this one with the specified period subtracted. For example, on a {@link LocalDate}, this could be used to subtract a number of years, months or days. The returned object will have the same observable type as this object.
     *
     * In some cases, changing a field is not fully defined. For example, if the target object is a date representing the 31st March, then subtracting one month would be unclear. In cases like this, the field is responsible for resolving the result. Typically it will choose the previous valid date, which would be the last valid day of February in this example.
     *
     * If the implementation represents a date-time that has boundaries, such {@link as} LocalTime, then the permitted units must include the boundary unit, but no multiples of the boundary unit. For example, {@link LocalTime} must accept `DAYS` but not `WEEKS` or `MONTHS`.
     *
     * ### Specification for implementors
     * Implementations must behave in a manor equivalent to the default method behavior.
     * Implementations must not alter either this object or the specified temporal object. Instead, an adjusted copy of the original must be returned. This provides equivalent, safe behavior for immutable and mutable implementations.
     *
     * @param {number} amountToSubtract - the amount of the specified unit to subtract, may be negative
     * @param {TemporalUnit} unit - the unit of the period to subtract, not null
     * @return {Temporal} an object of the same type with the specified period subtracted, not null
     * @throws DateTimeException - if the unit cannot be subtracted
     * @throws ArithmeticException - if numeric overflow occurs
     */
    minusAmountUnit(amountToSubtract, unit) {
        requireNonNull(amountToSubtract, 'amountToSubtract');
        requireNonNull(unit, 'unit');
        requireInstance(unit, TemporalUnit, 'unit');
        return (amountToSubtract === MIN_SAFE_INTEGER ? this.plusAmountUnit(MAX_SAFE_INTEGER, unit).plusAmountUnit(1, unit) : this.plusAmount(-amountToSubtract, unit));
    }
}
