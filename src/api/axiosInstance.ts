import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

/**
 * Create new axios instance
 */
const config: AxiosRequestConfig = {
	baseURL: API_BASE_URL,
	timeout: 60000,
};
const axiosInstance: AxiosInstance = axios.create(config);

axiosInstance.interceptors.request.use(
	config => {
		const token = localStorage.getItem('swiftsalesAuthToken');
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	error => {
		// Do something with request error
		return Promise.reject(error);
	},
);

axiosInstance.interceptors.response.use(
	response => {
		if ((!response || !response.data) && response.status !== 204) {
			throw response;
		}
		if (response.data) {
			return response.data;
		}
		return response;
	},
	error => {
		if (error.response) {
			if (error.response.data) {
				throw error.response.data;
			}
			throw error.response;
		} else if (error.request) {
			throw new Error('There seems to be a connection problem.');
		}
		throw error;
	},
);

export default axiosInstance;
