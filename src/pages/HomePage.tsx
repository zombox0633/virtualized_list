import FormNewProduct from "../components/table/FormNewProduct"
import Table from "../components/table/Table"
import useDownloadCSV from "../hook/useDownloadCSV"
import useGetAllProduct from "../hook/useGetAllProduct"

function HomePage() {
  const { downloadCSV_FULL } = useDownloadCSV()
  const { data } = useGetAllProduct()

  return (
    <div className="relative h-full w-full">
      <section>
        <div className="my-2 flex items-center justify-between">
          <FormNewProduct />
          <button
            type="button"
            onClick={downloadCSV_FULL}
            disabled={!data || data.length === 0}
            className="h-12 w-auto bg-[#17c964] px-4 py-2 font-bold text-white hover:bg-[#17c964]/80 disabled:bg-[#17c964]/70"
          >
            Download CSV
          </button>
        </div>
        <Table products={data} />
      </section>
    </div>
  )
}

export default HomePage
