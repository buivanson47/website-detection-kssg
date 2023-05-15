import { AxiosError, AxiosRequestConfig } from "axios";

export function addExtraInfo(config: AxiosRequestConfig) {
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
