const setupAPI = () => {
	switch (process.env.NODE_ENV) {
		case 'local':
			return 'http://192.168.33.10';
		case 'development':
			return 'https://dev-api.swiftsales.fi';
		case 'production':
			return 'https://api.swiftsales.fi';
		default:
			return 'http://192.168.33.10';
	}
};

const setupFront = () => {
	switch (process.env.NODE_ENV) {
		case 'local':
			return 'http://localhost:9003';
		case 'development':
			return 'https://dev.swiftsales.fi';
		case 'production':
			return 'https://swiftsales.fi';
		default:
			return 'http://http://localhost:9003';
	}
};

const API_BASE_URL = JSON.stringify(setupAPI());
const FRONT_BASE_URL = JSON.stringify(setupFront());

export default {
	API_BASE_URL,
	FRONT_BASE_URL,
};
