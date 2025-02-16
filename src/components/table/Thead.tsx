import { TableHeadersType } from "../../types/product.type"

type TheadPropsType = {
  visibleHeaders: TableHeadersType[]
}
function Thead({ visibleHeaders }: TheadPropsType) {
  return (
    <div className="border-b-2 bg-white uppercase dark:bg-(--color-eerie-black) dark:text-white">
      <div className="grid grid-cols-11 gap-x-2 px-2">
        <div className="py-3">INDEX</div>
        {visibleHeaders.map((header) => (
          <div
            key={header.key}
            className={"px-2 py-3 col-span-2"}
          >
            {header.key}
          </div>
        ))}
        <div className="col-span-2 px-2 py-3 text-center">{"Actions"}</div>
      </div>
    </div>
  )
}

export default Thead
