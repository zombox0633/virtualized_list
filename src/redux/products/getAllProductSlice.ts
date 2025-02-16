import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit"
import getAllProduct from "../../service/product/getAllProduct"
import { checkErrorMessage } from "../../config/errorFromAPI"
import { ProductDataType } from "../../types/product.type"

type ProductState = {
  data: ProductDataType[]
  loading: boolean
  error: string | null
}

const initialState: ProductState = {
  data: [],
  loading: false,
  error: null,
}

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

const getAllProductSlice = createSlice({
  name: "getAllProduct",
  initialState,
  reducers: {
    addProductRedux: (state, action: PayloadAction<ProductDataType>) => {
      state.data.unshift(action.payload)
    },
    updateProductRedux: (state, action: PayloadAction<ProductDataType>) => {
      const index = state.data.findIndex(
        (product) => product.id === action.payload.id,
      )
      if (index !== -1) {
        state.data[index] = action.payload
      }
    },
    deleteProductRedux: (state, action: PayloadAction<string>) => {
      state.data = state.data.filter((product) => product.id !== action.payload)
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllProduct.pending, (state) => {
      state.loading = true
      state.error = null
    })
    builder.addCase(
      fetchAllProduct.fulfilled,
      (state, action: PayloadAction<ProductDataType[]>) => {
        state.loading = false
        state.data = action.payload
      },
    )
    builder.addCase(fetchAllProduct.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload as string
    })
  },
})

export const { addProductRedux, updateProductRedux, deleteProductRedux } =
  getAllProductSlice.actions
export default getAllProductSlice.reducer
