import { useState } from "react"
import { ProductDataType } from "../../types/product.type"
import { handleChangeProductItem, timestampFormat } from "../../helpers/utils"
import Thead from "./Thead"
import clsx from "clsx"
import { visibleHeaders } from "../../constraint/mockProducts"

type TableType = {
  products: ProductDataType[]
  setProducts: React.Dispatch<React.SetStateAction<ProductDataType[]>>
}

function Table({ products, setProducts }: TableType) {
  const [isEdit, setIsEdit] = useState<string | null>(null)
  const [editProduct, setEditProduct] = useState<Partial<ProductDataType>>({})

  const handleEdit = (id: string) => {
    setIsEdit(id)
    const findProduct = products.find((product) => product.id === id)
    if (findProduct) {
      setEditProduct(findProduct)
    }
  }

  const handleSave = (id: string) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === id
          ? {
              ...product,
              ...editProduct,
              updated_at: timestampFormat,
              updated_op: "admin",
            }
          : product,
      ),
    )
    setIsEdit(null)
  }

  const handleCancel = () => {
    setIsEdit(null)
    setEditProduct({})
  }

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProducts((prev) => prev.filter((product) => product.id !== id))
    }
  }

  return (
    <table className="w-full border-2 text-left">
      <Thead visibleHeaders={visibleHeaders} />
      <tbody>
        {products.map((product) => (
          <tr
            key={product.id}
            className="border-b border-gray-200 bg-white dark:border-(--color-eerie-black) dark:bg-(--color-eerie-black)/50"
          >
            {visibleHeaders.map((header) => (
              <td
                key={header.key}
                scope="row"
                className="px-6 py-4 font-medium whitespace-nowrap text-(--color-eerie-black) dark:text-white"
              >
                {isEdit === product.id ? (
                  <input
                    type={
                      header.key === "price" || header.key === "quantity"
                        ? "number"
                        : "text"
                    }
                    name={header.key}
                    value={
                      editProduct[header.key as keyof ProductDataType] ?? ""
                    }
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
                  (product[header.key] ?? "-")
                )}
              </td>
            ))}
            <td className="px-6 py-4">
              {isEdit === product.id ? (
                <div className="flex items-center justify-center gap-x-2">
                  <button
                    onClick={() => handleSave(product.id)}
                    className="button__df w-20"
                  >
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
                    className="w-20 bg-[#17c964] px-4 py-2 font-bold text-white hover:bg-[#17c964]/80"
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
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Table
