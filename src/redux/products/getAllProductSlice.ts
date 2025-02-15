import { createAsyncThunk } from "@reduxjs/toolkit"
import getAllProduct from "../../service/product/getAllProduct"
import { checkErrorMessage } from "../../config/errorFromAPI"
import createGenericSlice from "../createGenericSlice"
import { ProductDataType } from "../../types/product.type"

export const fetchAllProduct = createAsyncThunk(
  "getAllProductSlice/fetchAllProduct",
  async (_, { rejectWithValue }) => {
    try {
      const [success, error] = await getAllProduct()

      if (success) {
        return success
      } else {
        return rejectWithValue(error)
      }
    } catch (error) {
      return rejectWithValue(checkErrorMessage(error))
    }
  },
)

export const getAllProductSlice = createGenericSlice<ProductDataType[], void>({
  name: "getAllProduct",
  fetchThunk: fetchAllProduct,
})

export default getAllProductSlice
