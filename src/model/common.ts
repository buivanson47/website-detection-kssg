export interface Response<T> {
  data?: T;
  error?: ErrorResponse;
  responseCode?: string;
  message?: string;
}

export interface ErrorResponse {
  code?: number;
  message?: string;
}
