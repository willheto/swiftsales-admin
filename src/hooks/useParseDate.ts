import { format } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import { DateTime } from 'luxon';

const useParseDate = () => {
	const parseDate = (date: string) => {
		const dateTime = DateTime.fromFormat(date, 'yyyy-MM-dd HH:mm:ss', { zone: 'utc' });

		// conver to helsinki time
		const parsedDate = dateTime.setZone('Europe/Helsinki').toFormat('dd.MM.yyyy HH:mm');

		return parsedDate;
	};

	const parseDatePickerDateToAPIFormat = (date: string) => {
		console.log(date);
		const dt = DateTime.fromISO(date, { zone: 'utc' });
		return dt.toFormat('yyyy-LL-dd HH.mm');
	};

	const utcStringToLocalDate = (utcDateString: string): Date => {
		const date = new Date(utcDateString);
		return date;
	};

	const toUtc = (date: string | Date, toFormat: string = 'yyyy-MM-dd HH:mm:ss'): string => {
		if (date instanceof Date) {
			const utcDate = utcToZonedTime(date, 'UTC');
			return format(utcDate, toFormat);
		}
		return format(new Date(date), toFormat);
	};

	return { parseDate, parseDatePickerDateToAPIFormat, utcStringToLocalDate, toUtc };
};

export default useParseDate;
