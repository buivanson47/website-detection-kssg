import { AxiosError, AxiosRequestConfig } from 'axios';

export function addExtraInfo(config: any) {
	// const token = useAccessTokenStore.getState().accessToken?.accessToken;
	config.headers = {
		...config.headers,
		// Authorization: `Bearer ${token ?? ''}`,
	};

	return config;
}

export function onRejected(error: AxiosError) {
	return Promise.reject(error);
}
