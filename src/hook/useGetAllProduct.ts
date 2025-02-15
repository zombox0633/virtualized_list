import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootType } from "../redux/store"
import { useEffect } from "react"
import { fetchAllProduct } from "../redux/products/getAllProductSlice"

function useGetAllProduct() {
  const dispatch = useDispatch<AppDispatch>()
  const { data, loading, error } = useSelector(
    (state: RootType) => state.getAllProduct,
  )

  useEffect(() => {
    dispatch(fetchAllProduct())
  }, [dispatch])

  return {
    data,
    loading,
    error,
  }
}

export default useGetAllProduct
