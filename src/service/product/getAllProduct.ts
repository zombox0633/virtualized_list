import axios from "axios"
import { AxiosReturn } from "../../types/errorFromAPI.type"
import { ProductDataType } from "../../types/product.type"
import { onHandleErrorFromAPI } from "../../config/errorFromAPI"

async function getAllProduct(): AxiosReturn<ProductDataType[]> {
  try {
    //https://www.mockaroo.com/
    const response = await axios.get<ProductDataType[]>(
      `/public/productsData.json`,
    )
    return [response.data, null]
  } catch (error) {
    return onHandleErrorFromAPI(error)
  }
}

export default getAllProduct
