import { useState } from "react"
import clsx from "clsx"
import { v4 as uuidv4 } from "uuid"
import { ProductDataType } from "../../types/product.type"
import { handleChangeProductItem, timestampFormat } from "../../helpers/utils"
import { visibleHeaders } from "../../constraint/mockProducts"

type FormNewProductPropsType = {
  setProducts: React.Dispatch<React.SetStateAction<ProductDataType[]>>
}

function FormNewProduct({ setProducts }: FormNewProductPropsType) {
  const [newProduct, setNewProduct] = useState<ProductDataType>({
    id: "",
    name: "",
    category: "",
    price: 0,
    quantity: 0,
    created_at: timestampFormat,
    created_op: "admin",
    updated_at: timestampFormat,
    updated_op: "admin",
  })

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    setProducts((prev) => [...prev, { ...newProduct, id: uuidv4() }])
    setNewProduct({
      id: "",
      name: "",
      category: "",
      price: 0,
      quantity: 0,
      created_at: timestampFormat,
      created_op: "admin",
      updated_at: timestampFormat,
      updated_op: "admin",
    })
  }

  return (
    <form onSubmit={handleSubmit} className="mb-2 flex gap-x-2 border-2 p-2">
      {visibleHeaders
        .filter((header) => header.state)
        .map((header) => (
          <input
            type={
              header.key === "price" || header.key === "quantity"
                ? "number"
                : "text"
            }
            name={header.key}
            value={newProduct[header.key]}
            placeholder={`Enter ${header.key}`}
            {...(header.key === "price" || header.key === "quantity"
              ? { min: 1 }
              : {})}
            required
            onChange={(e) =>
              handleChangeProductItem<ProductDataType>(e, setNewProduct)
            }
            className={clsx("input__df", {
              "hide-number-spin":
                header.key === "price" || header.key === "quantity",
            })}
          />
        ))}
      <button type="submit" className="button__df">
        Add New +
      </button>
    </form>
  )
}

export default FormNewProduct
