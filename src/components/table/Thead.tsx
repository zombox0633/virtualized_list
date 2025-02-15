import { TableHeadersType } from "../../types/product.type"

type TheadPropsType = {
  visibleHeaders: TableHeadersType[]
}
function Thead({ visibleHeaders }: TheadPropsType) {
  return (
    <thead className="border-2 bg-white uppercase dark:bg-(--color-eerie-black) dark:text-white">
      <tr>
        {visibleHeaders.map((header) => (
          <th key={header.key} scope="col" className="px-6 py-3">
            {header.key}
          </th>
        ))}
        <th className="px-6 py-3 text-center">{"Actions"}</th>
      </tr>
    </thead>
  )
}

export default Thead
