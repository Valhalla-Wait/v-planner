import { createContext } from "react";

export const SidebarContext = createContext({
  toggle: () => {},
  destroy: () => {},
  isActive: false
})