const setupAPI = () => {
	switch (process.env.NODE_ENV) {
		case 'local':
			return 'http://swiftsales-api.local:8000';
		case 'development':
			return 'https://dev-api.swiftsales.fi';
		case 'production':
			return 'https://api.swiftsales.fi';
		default:
			return 'http://swiftsales-api.local:8000';
	}
};

const API_BASE_URL = JSON.stringify(setupAPI());
export default {
	API_BASE_URL,
};
