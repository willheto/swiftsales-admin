export const bytesToMegabytes = (bytes: number): string => {
	return (bytes / (1024 * 1024)).toFixed(3);
};

export const getBase64 = async (file: any) => {
	try {
		const base64image = await new Promise((resolve, reject) => {
			const fileReader = new FileReader();
			fileReader.readAsDataURL(file);
			fileReader.onload = () => resolve(fileReader.result);
			fileReader.onerror = error => reject(error);
		});
		return base64image;
	} catch (error) {
		console.error(error);
		return;
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
