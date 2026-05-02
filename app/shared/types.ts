import { AxiosError } from "axios";

export type UseMutationCallbacks<T = void, E = Error> = {
  onSuccess?: (data: T) => void;
  onError?: (error: E) => void;
  onMutate?: () => void;
  onSettled?: (data?: T, error?: E | null) => void;
};

export interface UseQueryCallbacks<T> {
  onSuccess?: (data: T) => void;
  onError?: (error: ApiError) => void;
}
export interface ApiResponse<T> {
  status: number;
  message: string;
  data: T;
}

export interface ApiErrorResponse {
  message: string;
  error?: string;
  statusCode?: number;
}

export type ApiError = AxiosError<ApiErrorResponse>;
