export type initialStateType<T> = {
  data: T | null
  loading: boolean
  error: string | null
}
