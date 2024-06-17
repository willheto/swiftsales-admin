import axiosInstance from '../axiosInstance';

export const authenticate = async ({ token }: { token: string }) => {
	if (!token) {
		throw new Error('Missing token');
	}
	const url = `${API_BASE_URL}/user/auth`;
	const response = await axiosInstance.post(url, { token });
	return response;
};

export const login = async ({ email, password }: { email: string; password: string }): Promise<any> => {
	if (!email || !password) {
		throw new Error('Missing email or password');
	}

	const url = `${API_BASE_URL}/user/login`;
	const loginPayload = {
		email,
		password,
	};

	const response = await axiosInstance.post(url, loginPayload);

	// @ts-expect-error
	if (!response?.token) {
		throw new Error(response.data.error);
	}
	return response;
};

export const logout = async () => {
	const url = `${API_BASE_URL}/users/logout`;
	const response = await axiosInstance.post(url);
	return response;
};

export const register = async ({ email, password }: { email: string; password: string }) => {
	if (!email || !password) {
		throw new Error('Missing email or password');
	}

	const url = `${API_BASE_URL}/users`;
	const registerPayload = {
		email,
		password,
	};

	const response = await axiosInstance.post(url, registerPayload);

	if (!response?.data?.token) {
		throw new Error('Invalid response from the server');
	}
	return response;
};
