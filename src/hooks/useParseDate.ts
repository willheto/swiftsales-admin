import { DateTime } from 'luxon';

const useParseDate = () => {
	const parseDate = (date: string) => {
		const dateTime = DateTime.fromFormat(date, 'yyyy-MM-dd HH:mm:ss', { zone: 'utc' });

		// conver to helsinki time
		const parsedDate = dateTime.setZone('Europe/Helsinki').toFormat('dd.MM.yyyy HH:mm');

		return parsedDate;
	};

	return { parseDate };
};

export default useParseDate;
