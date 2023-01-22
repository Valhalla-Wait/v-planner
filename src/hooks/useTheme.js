import { useLayoutEffect, useState } from "react"

const isDarkThemeDefault = window?.matchMedia("(prefers-color-scheme: dark)")?.matches
const defaultTheme = isDarkThemeDefault ? "dark" : "light"

const useTheme = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || defaultTheme)
  
  useLayoutEffect(() => {
    document.documentElement.setAttribute("data-theme", theme)
    localStorage.setItem("theme", theme)
  }, [theme])

  const toggle = () => theme === "dark" ? setLight() : setDark()
  
  const setDark = () => setTheme("dark")
  const setLight = () => setTheme("light")
  
  const get = () => theme

  return { setDark, setLight, toggle, get }
}

export default useTheme