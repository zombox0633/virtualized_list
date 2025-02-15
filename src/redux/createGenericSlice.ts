import {
  AsyncThunk,
  Dispatch,
  Draft,
  PayloadAction,
  createSlice,
} from "@reduxjs/toolkit"
import { initialStateType } from "./redux.type"

type AsyncThunkConfig = {
  state?: unknown
  dispatch?: Dispatch
  extra?: unknown
  rejectValue?: unknown
  serializedErrorType?: unknown
  pendingMeta?: unknown
  fulfilledMeta?: unknown
  rejectedMeta?: unknown
}

export type CreateGenericSliceType<T, Props = void> = {
  name: string
  fetchThunk: AsyncThunk<T, Props, AsyncThunkConfig>
}

function createGenericSlice<T, Props>({
  name,
  fetchThunk,
}: CreateGenericSliceType<T, Props>) {
  const initialState: initialStateType<T> = {
    data: null,
    loading: false,
    error: null,
  }

  const genericSlice = createSlice({
    name,
    initialState,
    reducers: {
      clearData: (state) => {
        state.data = null
        state.loading = false
        state.error = null
      },
    },
    extraReducers: (builder) => {
      builder.addCase(fetchThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      builder.addCase(
        fetchThunk.fulfilled,
        (state, action: PayloadAction<T | null>) => {
          state.loading = false
          state.data = action.payload as Draft<T>
        },
      )
      builder.addCase(
        fetchThunk.rejected,
        (state, action: PayloadAction<unknown>) => {
          state.loading = false
          if (typeof action.payload === "string") {
            state.error = action.payload
          } else {
            state.error = "An unknown error occurred"
          }
        },
      )
    },
  })

  return genericSlice
}

export default createGenericSlice
