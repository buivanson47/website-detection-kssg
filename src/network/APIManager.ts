import axios, { AxiosRequestConfig, AxiosRequestHeaders } from 'axios';
import * as TransformInterceptor from './interceptors/Transform';
import * as AccessTokenInterceptor from './interceptors/AccessToken';
import * as AuthInterceptor from './interceptors/Auth';

const getInstance = (baseURL: string, withToken = true, headers?: AxiosRequestHeaders) => {
	const instance = axios.create({
		baseURL: baseURL,
		timeout: 30000,
		headers: headers ?? {
			'Content-Type': 'application/json',
		},
	});

	instance.interceptors.response.use(AuthInterceptor.responseSuccess, AuthInterceptor.responseError);

	if (withToken) {
		instance.interceptors.request.use((config: AxiosRequestConfig) => {
			return AccessTokenInterceptor.addExtraInfo(config);
		}, AccessTokenInterceptor.onRejected);
	}

	// Transform at the end
	instance.interceptors.response.use(TransformInterceptor.transformResponse, TransformInterceptor.transformError);

	return instance;
};

const ApiManager = {
	getInstance: (baseUrl: string, withToken = true, headers?: AxiosRequestHeaders) => {
		const axiosInstance = getInstance(baseUrl, withToken, headers);
		return axiosInstance;
	},
};

export default ApiManager;
