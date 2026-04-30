export type UseMutationCallbacks<T = void, E = Error> = {
  // E 제네릭 추가
  onSuccess?: (data: T) => void;
  onError?: (error: E) => void;
  onMutate?: () => void;
  onSettled?: (data?: T, error?: E | null) => void;
};
export interface ApiResponse<T> {
  status: number;
  message: string;
  data: T;
}
