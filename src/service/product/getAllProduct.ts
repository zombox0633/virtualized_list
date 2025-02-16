import axios from "axios"
import { AxiosReturn } from "../../types/errorFromAPI.type"
import { ProductDataType } from "../../types/product.type"
import { onHandleErrorFromAPI } from "../../config/errorFromAPI"

export type GetAllProductPropsType = {
  page: number
  limit: number
}

export type GetAllProductReturnType = {
  data: ProductDataType[]
  total: number
}

async function getAllProduct({
  page = 1,
  limit = 20,
}: GetAllProductPropsType): AxiosReturn<GetAllProductReturnType> {
  try {
    //https://www.mockaroo.com/
    const response = await axios.get<ProductDataType[]>(
      `/public/productsData.json`,
    )

    const total = response.data.length
    const startIndex = (page - 1) * limit
    const data = response.data.slice(startIndex, startIndex + limit)

    return [{ data, total }, null]
  } catch (error) {
    return onHandleErrorFromAPI(error)
  }
}

export default getAllProduct
