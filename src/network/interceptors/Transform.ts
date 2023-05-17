import { AxiosResponse } from 'axios';

export function transformResponse(response: AxiosResponse) {
	return Promise.resolve(response);
}

export function transformError(error: any) {
	return Promise.reject(error);
}
