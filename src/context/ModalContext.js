import { createContext } from "react";

export const ModalContext = createContext({
  start: () => {},
  destroy: () => {},
  setContent: () => {},
  content: null,
  isActive: false,
})