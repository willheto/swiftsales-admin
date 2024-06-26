import React from 'react';
import { default as BaseDatePicker } from 'react-datepicker';
import { zonedTimeToUtc, utcToZonedTime } from 'date-fns-tz';
import { format, isValid, isAfter, isBefore, addMinutes, subMinutes } from 'date-fns';

import 'react-datepicker/dist/react-datepicker.css';

export function removeTimezone(date: Date): Date {
	const offset = date.getTimezoneOffset();

	return Math.sign(offset) !== -1 ? addMinutes(date, offset) : subMinutes(date, Math.abs(offset));
}

function DatePicker({
	id = 'datepicker',
	value,
	onChange,
	timeZone,
	minDate = '',
	maxDate = '',
	isInvalid = false,
	...rest
}) {
	/**
	 * Handle date input change.
	 *
	 * @param {string} value
	 */
	function handleChange(value) {
		if (value) {
			try {
				const zoned = zonedTimeToUtc(value, timeZone);
				if (isValid(zoned)) {
					const untimezoned = format(removeTimezone(new Date(zoned)), 'yyyy-MM-dd HH:mm:ss');
					onChange(untimezoned);
				} else {
					onChange(null);
				}
			} catch (error) {
				console.log(`[NewDatePicker] error`, error);
			}
		} else {
			onChange(null);
		}
	}

	/**
	 * Filter available times based on minDate.
	 *
	 * @param {Date} time
	 * @returns {boolean}
	 */
	const filterPassedTime = (time: Date) => {
		const zonedTime = removeTimezone(time);
		if (minDate && isBefore(zonedTime, utcToZonedTime(minDate, timeZone))) {
			return false;
		}
		if (maxDate && isAfter(zonedTime, utcToZonedTime(maxDate, timeZone))) {
			return false;
		}
		return true;
	};

	return (
		<BaseDatePicker
			selected={value ? utcToZonedTime(value + 'Z', timeZone) : null}
			onChange={handleChange}
			showTimeSelect
			autoComplete="off"
			id={id}
			dateFormat={!rest.showTimeSelect ? 'dd.MM.yyyy' : 'dd.MM.yyyy - HH:mm'}
			timeFormat="HH:mm"
			className={`form-control ${isInvalid && 'is-invalid'}`}
			timeIntervals={5}
			filterTime={filterPassedTime}
			minDate={minDate ? utcToZonedTime(minDate + 'Z', timeZone) : null}
			maxDate={maxDate ? utcToZonedTime(maxDate + 'Z', timeZone) : null}
			{...rest}
		/>
	);
}

export default DatePicker;
