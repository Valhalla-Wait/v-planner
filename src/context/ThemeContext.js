import { createContext } from "react";

export const ThemeContext = createContext({
  setLight: () => {},
  setDark: () => {},
  toggle: () => {},
  get: () => {}
})