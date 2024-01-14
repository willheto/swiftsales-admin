const useParseDate = () => {
	const parseDate = (date: string) => {
		const dateObj = new Date(date);
		const day = dateObj.getDate();
		const month = dateObj.getMonth() + 1;
		const year = dateObj.getFullYear();
		const hour = dateObj.getHours();
		const minutes = dateObj.getMinutes();
		const seconds = dateObj.getSeconds();

		return `${day}/${month}/${year} ${hour}:${minutes}:${seconds}`;
	};

	return { parseDate };
};

export default useParseDate;
