export interface ApiErrorType {
  status?: number;
  name?: string;
  message?: string;
  details?: object | null;
}

export interface ApiResponseErrorType {
  data?: null;
  error?: ApiErrorType;
}

export type AxiosReturn<T> = Promise<[T, null] | [null, string]>;
