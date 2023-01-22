import { useState } from "react";
import AuthService from "../services/AuthService";
import UserService from "../services/UserService";
import VendorService from "../services/VendorService";

const useAuth = () => {
  const [isAuth, setAuth] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [user, setUser] = useState({});

  const login = async (
    role,
    email,
    firstName,
    lastName,
    phone,
    avatar,
    nickname,
    partnersFirstName,
    partnersLastName,
    engagementDate,
    weddingDate,
    location,
    countGuest,
    budget,
    token
  ) => {
    try {
      const response =
        role === process.env.REACT_APP_ROLE_USER
          ? await UserService.login(
              email,
              firstName,
              lastName,
              phone,
              avatar,
              nickname,
              partnersFirstName,
              partnersLastName,
              engagementDate,
              weddingDate,
              location,
              countGuest,
              budget,
              token
            )
          : await VendorService.login(email, firstName);
      localStorage.setItem("token", token);
      setAuth(true);
      setUser(response.data.user);
    } catch (e) {
      console.log(e.response?.data?.message);
    }
  };

  const logout = async () => {
    try {
      await AuthService.logout();
      localStorage.removeItem("token");
      setAuth(false);
      setUser({});
    } catch (e) {
      console.log(e.response?.data?.message);
    }
  };

  const check = async () => {
    setLoading(true);
    try {
      const response = await AuthService.check();
      localStorage.setItem("token", response.data.accessToken);
      setAuth(true);
      setUser(response.data.user);
    } catch (e) {
      console.log(e.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return { login, logout, check, setUser, isAuth, isLoading, user };
};

export default useAuth;
