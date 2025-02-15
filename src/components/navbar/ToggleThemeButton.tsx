import { useEffect, useState } from "react"

function ToggleThemeButton() {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return (
        localStorage.getItem("theme") ||
        (window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light")
      )
    }
    return "light"
  })

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme)
    localStorage.setItem("theme", theme)
  }, [theme])

  return (
    <button
      onClick={() =>
        setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"))
      }
      className="rounded-full bg-white p-2 text-center dark:bg-(--color-rich-black) dark:text-white"
    >
      {theme === "dark" ? "🌙" : "☀️"}
    </button>
  )
}

export default ToggleThemeButton
