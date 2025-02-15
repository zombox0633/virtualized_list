import { useState } from "react"

import Table from "../components/table/Table"
import { mockProductData } from "../constraint/mockProducts"
import { ProductDataType } from "../types/product.type"
import FormNewProduct from "../components/table/FormNewProduct"

function AdminPage() {
  const [products, setProducts] = useState<ProductDataType[]>(mockProductData)

  return (
    <div className="relative h-full w-full">
      <div>AdminPage</div>
      <section className="my-2">
        <div className="flex justify-between">
          <FormNewProduct setProducts={setProducts} />
          <button className="">download</button>
        </div>
        <Table products={products} setProducts={setProducts} />
      </section>
    </div>
  )
}

export default AdminPage
