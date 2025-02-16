import AutoSizer from "react-virtualized-auto-sizer"
import { FixedSizeList } from "react-window"
import { visibleHeaders } from "../../constraint/mockProducts"

import Thead from "./Thead"
import ProductRow from "./ProductRow"
import useGetAllProduct from "../../hook/useGetAllProduct"

import { ProductDataType } from "../../types/product.type"
import InfiniteLoader from "react-window-infinite-loader"

type TableType = {
  products: ProductDataType[] | null
}

function Table({ products }: TableType) {
  const { totalItems, loadMoreItems, loading } = useGetAllProduct()
  const hasMoreItems = products ? products.length < totalItems : false

  const isItemLoaded = (index: number) => {
    if (products) {
      return index < products.length
    }

    return false
  }

  return (
    <div className="w-full border-2 text-left">
      <Thead visibleHeaders={visibleHeaders} />
      <div className="block min-h-[65vh]">
        {products ? (
          <AutoSizer>
            {({ height, width }) => (
              <InfiniteLoader
                isItemLoaded={isItemLoaded}
                itemCount={hasMoreItems ? products.length + 1 : products.length}
                loadMoreItems={loadMoreItems}
              >
                {({ onItemsRendered, ref }) => (
                  <FixedSizeList
                    height={height}
                    width={width}
                    itemCount={hasMoreItems ? products.length + 1 : products.length}
                    itemSize={60}
                    onItemsRendered={onItemsRendered}
                    ref={ref}
                  >
                    {({ index, style }) =>
                      isItemLoaded(index) ? (
                        <ProductRow
                          key={products[index].id}
                          index={index}
                          visibleHeaders={visibleHeaders}
                          product={products[index]}
                          style={style}
                        />
                      ) : (
                        <div
                          style={style}
                          className="flex items-center justify-center text-gray-500"
                        >
                          {loading ? "Loading..." : ""}
                        </div>
                      )
                    }
                  </FixedSizeList>
                )}
              </InfiniteLoader>
            )}
          </AutoSizer>
        ) : (
          <div className="flex items-center justify-center text-gray-500">
            {loading ? "Loading..." : "No Products Available"}
          </div>
        )}
      </div>
    </div>
  )
}

export default Table
