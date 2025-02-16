import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import getAllProduct, {
  GetAllProductPropsType,
} from "../../service/product/getAllProduct"
import { checkErrorMessage } from "../../config/errorFromAPI"
import { ProductDataType } from "../../types/product.type"

type ProductState = {
  data: ProductDataType[]
  totalItems: number
  loading: boolean
  error: string | null
}

const initialState: ProductState = {
  data: [],
  totalItems: 0,
  loading: false,
  error: null,
}

export const fetchAllProduct = createAsyncThunk(
  "getAllProductSlice/fetchAllProduct",
  async (
    { page = 1, limit = 20 }: GetAllProductPropsType,
    { rejectWithValue },
  ) => {
    try {
      const [success, error] = await getAllProduct({ page, limit })

      if (success?.data) {
        return { data: success.data, total: success.total }
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
    builder.addCase(fetchAllProduct.fulfilled, (state, action) => {
      state.loading = false
      state.totalItems = action.payload.total

      if (state.data.length === 0 || action.meta.arg.page === 1) {
        state.data = action.payload.data
      } else {
        state.data = [...state.data, ...action.payload.data]
      }
    })
    builder.addCase(fetchAllProduct.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload as string
    })
  },
})

export const { addProductRedux, updateProductRedux, deleteProductRedux } =
  getAllProductSlice.actions
export default getAllProductSlice.reducer
