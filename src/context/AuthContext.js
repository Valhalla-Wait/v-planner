import { createContext } from "react";

export const AuthContext = createContext({
  login:  async () => {},
  logout:  async () => {},
  check:  async () => {},
  setUser: () => {},
  isAuth: false,
  isLoading: false,
  user: {}
})