import { useState } from "react"
import { useDispatch } from "react-redux"
import clsx from "clsx"

import {
  deleteProductRedux,
  updateProductRedux,
} from "../../redux/products/getAllProductSlice"
import { handleChangeProductItem, timestampFormat } from "../../helpers/utils"
import { ProductDataType, TableHeadersType } from "../../types/product.type"

type ProductRowPropsType = {
  index: number
  visibleHeaders: TableHeadersType[]
  product: ProductDataType
  style: React.CSSProperties
}

function ProductRow({
  index,
  product,
  visibleHeaders,
  style,
}: ProductRowPropsType) {
  const dispatch = useDispatch()

  const [isEdit, setIsEdit] = useState<string | null>(null)
  const [editProduct, setEditProduct] = useState<Partial<ProductDataType>>({})

  const handleEdit = (id: string) => {
    setIsEdit(id)
    setEditProduct(product)
  }

  const handleSave = () => {
    const updatedProduct: ProductDataType = {
      ...(editProduct as ProductDataType),
      updated_at: timestampFormat,
      updated_op: "admin",
    }
    dispatch(updateProductRedux(updatedProduct))

    setIsEdit(null)
  }

  const handleCancel = () => {
    setIsEdit(null)
    setEditProduct({})
  }

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteProductRedux(id))
    }
  }

  return (
    <div
      style={style}
      className="grid grid-cols-11 items-center px-2 gap-x-2 border-b border-gray-200 bg-white dark:border-(--color-eerie-black) dark:bg-(--color-eerie-black)/50"
    >
      <div className="col-auto text-(--color-eerie-black) dark:text-white">
        {index + 1}
      </div>
      {visibleHeaders.map((header) => (
        <div
          key={header.key}
          className={"px-2 text-(--color-eerie-black) dark:text-white col-span-2"}
        >
          {isEdit === product.id ? (
            <input
              type={
                header.key === "price" || header.key === "quantity"
                  ? "number"
                  : "text"
              }
              name={header.key}
              value={editProduct[header.key as keyof ProductDataType] ?? ""}
              placeholder={`Enter ${header.key}`}
              {...(header.key === "price" || header.key === "quantity"
                ? { min: 1 }
                : {})}
              required
              onChange={(e) =>
                handleChangeProductItem<Partial<ProductDataType>>(
                  e,
                  setEditProduct,
                )
              }
              className={clsx("input__df", {
                "hide-number-spin":
                  header.key === "price" || header.key === "quantity",
              })}
            />
          ) : (
            <p className="truncate">{product[header.key] ?? "-"}</p>
          )}
        </div>
      ))}
      <div className=" flex justify-center px-2 col-span-2">
        {isEdit === product.id ? (
          <div className="flex items-center justify-center gap-x-2">
            <button onClick={handleSave} className="button__df w-20">
              Save
            </button>
            <button
              onClick={handleCancel}
              className="w-20 bg-[#f5a524] px-4 py-2 font-bold text-white hover:bg-[#f5a524]/80"
            >
              Cancel
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-x-2">
            <button
              onClick={() => handleEdit(product.id)}
              className="w-20 bg-[#3f3f46] px-4 py-2 font-bold text-white hover:bg-[#3f3f46]/80"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(product.id)}
              className="w-20 bg-[#f31260] px-4 py-2 font-bold text-white hover:bg-[#f31260]/80"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductRow
