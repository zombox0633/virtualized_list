import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootType } from "../redux/store"
import { useEffect, useState } from "react"
import { fetchAllProduct } from "../redux/products/getAllProductSlice"

function useGetAllProduct() {
  const dispatch = useDispatch<AppDispatch>()
  const { data, totalItems, loading, error } = useSelector(
    (state: RootType) => state.getAllProduct,
  )

  const [page, setPage] = useState<number>(1)
  const limit = 20

  useEffect(() => {
    dispatch(fetchAllProduct({ page, limit }))
  }, [dispatch, page])

  const loadMoreItems = () => {
    if (data.length < totalItems && !loading) {
      setPage((prev) => prev + 1)
    }
  }

  return {
    data,
    totalItems,
    loading,
    error,
    loadMoreItems,
  }
}

export default useGetAllProduct
