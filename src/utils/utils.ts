export const bytesToMegabytes = (bytes: number): string => {
	return (bytes / (1024 * 1024)).toFixed(3);
};

export const getBase64 = async (file: any): Promise<string> => {
	try {
		const base64image = await new Promise((resolve, reject) => {
			const fileReader = new FileReader();
			fileReader.readAsDataURL(file);
			fileReader.onload = () => resolve(fileReader.result);
			fileReader.onerror = error => reject(error);
		});
		if (typeof base64image === 'string') {
			return base64image;
		}
		throw new Error('Error converting file to base64');
	} catch (error) {
		console.error(error);
		return '';
	}
};

export const getDirtyValues = (dirtyFields: any, values: any) => {
	const dirtyValues = {};
	Object.keys(dirtyFields).forEach(dirtyField => {
		dirtyValues[dirtyField] = values[dirtyField];
	});
	return dirtyValues;
};

export const capitalizeFirstLetter = (string: string) => {
	return string.charAt(0).toUpperCase() + string.slice(1);
};
