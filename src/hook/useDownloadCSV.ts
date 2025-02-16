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

  const downloadCSV_FULL = async () => {
    try {
      const response = await fetch("/public/productsData.json")
      if (!response.ok) throw new Error("Failed to load JSON file")

      const jsonData: ProductDataType[] = await response.json()
      const csv = convertToCSV(jsonData)
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
    } catch (error) {
      console.log(error)
      return
    }
  }

  return {
    downloadCSV,
    downloadCSV_FULL,
  }
}

export default useDownloadCSV
