import { ProductDataType } from "../types/product.type"

function useDownloadCSV() {
  const convertToCSV = (data: ProductDataType[]) => {
    if (data.length === 0) return ""

    const headers = Object.keys(data[0]).join(",")
    const rows = data.map((item) =>
      Object.values(item)
        .map((value) => `"${value}"`)
        .join(","),
    )

    return [headers, ...rows].join("\n")
  }

  const downloadCSV = (data: ProductDataType[]) => {
    const csv = convertToCSV(data)
    if (!csv) return

    const blob = new Blob([csv], { type: "text/csv" })
    const url = URL.createObjectURL(blob)

    const link = document.createElement("a")
    link.href = url
    link.download = "products.csv"

    document.body.appendChild(link) 
    link.click()
    document.body.removeChild(link)
    
    URL.revokeObjectURL(url)
  }

  return {
    downloadCSV,
  }
}

export default useDownloadCSV
