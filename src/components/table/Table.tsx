import Thead from "./Thead"

import { visibleHeaders } from "../../constraint/mockProducts"
import { ProductDataType } from "../../types/product.type"

import ProductRow from "./ProductRow"
import AutoSizer from "react-virtualized-auto-sizer"
import { FixedSizeList } from "react-window"

type TableType = {
  products: ProductDataType[] | null
}

function Table({ products }: TableType) {
  return (
    <div className="w-full border-2 text-left">
      <Thead visibleHeaders={visibleHeaders} />
      <div className="block min-h-[65vh]">
        <AutoSizer>
          {({ height, width }) => (
            <FixedSizeList
              height={height}
              width={width}
              itemCount={products ? products.length : 0}
              itemSize={50}
            >
              {({ index, style }) =>
                products && (
                  <ProductRow
                    key={products[index].id}
                    index={index}
                    visibleHeaders={visibleHeaders}
                    product={products[index]}
                    style={style}
                  />
                )
              }
            </FixedSizeList>
          )}
        </AutoSizer>
      </div>
    </div>
  )
}

export default Table
