export interface TableHeadersType {
  key: keyof ProductDataType
  state: boolean
}

export interface ProductDataType {
  id: string
  name: string
  category: string
  price: number
  quantity: number
  created_at: string
  created_op: string
  updated_at: string
  updated_op: string
}
