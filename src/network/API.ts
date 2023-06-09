import { AuthRequest, FileUpload, FileUploadResponse, Response } from '@/model';
import ApiManager from './APIManager';
import Endpoint from './Endpoint';
import axios, { AxiosRequestConfig } from 'axios';
import { useStore } from 'zustand';
import { useApiDomain } from '@/store';

interface ApiService {
	get<R, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R>;
	post<R, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>;
	put<R, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>;
	delete<R, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R>;
}

class HTTPClient implements ApiService {
	private instance: ApiService;

	constructor(instance: ApiService) {
		this.instance = instance;
	}

	get<R, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R> {
		return this.instance.get(url, config);
	}
	post<R, D = any>(url: string, params?: D, config?: AxiosRequestConfig<D>): Promise<R> {
		return this.instance.post(url, params, config);
	}

	put<R, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R> {
		return this.instance.put(url, data, config);
	}
	delete<R, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R> {
		return this.instance.delete(url, config);
	}
}

class API {
	client: HTTPClient;
	publicClient: HTTPClient;

	constructor() {
		const instance = ApiManager.getInstance();
		this.client = new HTTPClient(instance);

		const publicInstance = ApiManager.getInstance(false);
		this.publicClient = new HTTPClient(publicInstance);
	}

	login = (params: AuthRequest): Promise<Response<unknown>> => {
		return this.publicClient.post<Response<unknown>>(Endpoint.LOGIN, params);
	};

	uploadFile = (params: FileUpload): Promise<FileUploadResponse> => {
		return this.publicClient.post<FileUploadResponse>(Endpoint.UPLOAD, params);
	};
}

export default new API();
