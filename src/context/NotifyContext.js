import { createContext } from "react"

export const NotifyContext = createContext({
  set: () => {},
  getAll: () => {},
})