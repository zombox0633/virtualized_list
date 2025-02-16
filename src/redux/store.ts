import { configureStore } from "@reduxjs/toolkit"
import getAllProductSlice from "./products/getAllProductSlice"

export const store = configureStore({
  reducer: {
    getAllProduct: getAllProductSlice,
  },
})

export type RootType = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
