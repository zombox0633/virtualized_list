import dayjs from "dayjs"

export const timestampFormat = dayjs().format("YYYY-MM-DD HH:mm:ss")

export const handleChangeProductItem = <T>(
  event: React.ChangeEvent<HTMLInputElement>,
  setItem: React.Dispatch<React.SetStateAction<T>>,
) => {
  const { name, value } = event.target
  setItem((prev) => ({
    ...prev,
    [name as keyof T]:
      name === "price" || name === "quantity" ? Number(value) : value,
  }))
}
