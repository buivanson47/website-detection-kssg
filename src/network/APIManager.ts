import axios, { AxiosRequestConfig, AxiosRequestHeaders } from 'axios';
import * as TransformInterceptor from './interceptors/Transform';
import * as AccessTokenInterceptor from './interceptors/AccessToken';
import * as AuthInterceptor from './interceptors/Auth';
import { useApiDomain } from '@/store';

const getInstance = (withToken = true, headers?: AxiosRequestHeaders) => {
	const instance = axios.create({
		timeout: 30000,
		headers: headers ?? {
			'Content-Type': 'application/json',
		},
	});

	instance.interceptors.response.use(AuthInterceptor.responseSuccess, AuthInterceptor.responseError);
	instance.interceptors.request.use(
		async (config) => {
			config.baseURL = useApiDomain.getState().apiDomain;
			return config;
		},
		(error) => Promise.reject(error),
	);

	if (withToken) {
		instance.interceptors.request.use((config: AxiosRequestConfig) => {
			return AccessTokenInterceptor.addExtraInfo(config);
		}, AccessTokenInterceptor.onRejected);
	}

	instance.interceptors.response.use(TransformInterceptor.transformResponse, TransformInterceptor.transformError);

	return instance;
};

const ApiManager = {
	getInstance: (withToken = true, headers?: AxiosRequestHeaders) => {
		const axiosInstance = getInstance(withToken, headers);
		return axiosInstance;
	},
};

export default ApiManager;
