import { AxiosError, AxiosResponse } from "axios";

export function responseSuccess(response: AxiosResponse) {
  return response;
}

export const responseError = (error: AxiosError) => {
  const response = error.response;

  if (response && response.status === 401) {
    // Logout
    // useApplicationStore.setState({ unauthorized: true });
  }

  return Promise.reject(error);
};
