import { useLayoutEffect, useState } from "react"

const isDarkThemeDefault = window?.matchMedia("(prefers-color-scheme: dark)")?.matches
const defaultTheme = isDarkThemeDefault ? "dark" : "light"

const useTheme = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || defaultTheme)

  useLayoutEffect(() => {
    document.documentElement.setAttribute("data-theme", theme)
    if (theme !== "admin") {
      localStorage.setItem("theme", theme)
    }
  }, [theme])

  const toggle = () => theme === "dark" ? setLight() : setDark()

  const setDark = () => setTheme("dark")
  const setLight = () => setTheme("light")
  const setAdmin = () => setTheme("admin")
  const setThemeBeforeAdmin = () => {
    const prevTheme = localStorage.getItem("theme")
    setTheme(prevTheme)
  }

  const get = () => theme

  return { setDark, setLight, setAdmin, setThemeBeforeAdmin, toggle, get }
}

export default useTheme