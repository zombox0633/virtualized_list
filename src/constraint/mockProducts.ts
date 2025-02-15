import { ProductDataType, TableHeadersType } from "../types/product.type"

export const tableHeaders: TableHeadersType[] = [
  { key: "id", state: false },
  // { key: "sku", state: true },
  { key: "name", state: true },
  { key: "category", state: true },
  { key: "price", state: true },
  { key: "quantity", state: true },
  { key: "created_at", state: false },
  { key: "created_op", state: false },
  { key: "updated_at", state: false },
  { key: "updated_op", state: false },
]

export const visibleHeaders = tableHeaders.filter((header) => header.state)

export const mockProductData: ProductDataType[] = [
  {
    id: "cfcf6afe-7e0f-4b81-855b-549937077a3a",
    // sku: "tc1",
    name: "test1",
    category: "test category",
    price: 100,
    quantity: 10,
    created_at: "2025-02-15 14:35:20",
    created_op: "earth",
    updated_at: "2025-02-15 14:35:20",
    updated_op: "earth",
  },
  {
    id: "020b6ecf-2da0-4914-bb9b-f0726ff3512e",
    // sku: "tc1",
    name: "test2",
    category: "test category",
    price: 100,
    quantity: 10,
    created_at: "2025-02-15 14:35:20",
    created_op: "earth",
    updated_at: "2025-02-15 14:35:20",
    updated_op: "earth",
  },
]
