import axios from "axios"
import { ApiResponseErrorType } from "../types/errorFromAPI.type"

export const statusMessageErrorApi: Record<number, { message: string }> = {
  400: { message: "Bad Request" },
  401: { message: "Unauthorized" },
  403: { message: "Forbidden" },
  404: { message: "Resource not found" },
  500: { message: "Internal Server Error" },
  503: { message: "Service Unavailable" },
  504: { message: "Gateway Timeout" },
}

export type OnHandleErrorFromAPIReturnType = [null, string]

export const checkErrorMessage = (error: unknown): string => {
  return error instanceof Error ? error.message : "Unknown error"
}

const DEFAULT_ERROR_MESSAGE =
  "An unexpected error occurred. Please try again later."

export const onHandleErrorFromAPI = (
  error: unknown,
): OnHandleErrorFromAPIReturnType => {
  if (axios.isCancel(error)) {
    return [null, "Request was cancelled"]
  }
  if (axios.isAxiosError<ApiResponseErrorType>(error)) {
    const status = error.response?.status ?? 503

    if (status in statusMessageErrorApi) {
      return [null, statusMessageErrorApi[status].message]
    } else {
      const responseMessage =
        error.response?.data.error?.message ?? DEFAULT_ERROR_MESSAGE
      return [null, responseMessage]
    }
  } else {
    return [null, (error as Error).message || DEFAULT_ERROR_MESSAGE]
  }
}
