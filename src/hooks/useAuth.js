import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AuthService from "../services/AuthService";
import UserService from "../services/UserService";
import VendorService from "../services/VendorService";
import { loginAction } from "../Store/Actions/AuthAction";

const useAuth = () => {
  const [isAuth, setAuth] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null)
  const [user, setUser] = useState({});

  const dispatch = useDispatch()

  // const login = async (
  //   role,
  //   email,
  //   firstName,
  //   lastName,
  //   phone,
  //   avatar,
  //   nickname,
  //   partnersFirstName,
  //   partnersLastName,
  //   engagementDate,
  //   weddingDate,
  //   location,
  //   countGuest,
  //   budget,
  //   token
  // ) => {
  //   try {
  //     const response =
  //       role === process.env.REACT_APP_ROLE_USER
  //         ? await UserService.login(
  //           email,
  //           firstName,
  //           lastName,
  //           phone,
  //           avatar,
  //           nickname,
  //           partnersFirstName,
  //           partnersLastName,
  //           engagementDate,
  //           weddingDate,
  //           location,
  //           countGuest,
  //           budget,
  //           token
  //         )
  //         : await VendorService.login(email, firstName);
  //     localStorage.setItem("token", token);
  //     console.log('token', token)
  //     setAuth(true);
  //     setUser(response.data.user);
  //   } catch (e) {
  //     console.log(e.response?.data?.message);
  //   }
  // };

  const login = async (email, password) => {
    setLoading(true)
    AuthService.login(email, password)
      .then(res => {
        localStorage.setItem("token", res.data.result.jwt)
        check()
      })
      .catch(err => {
        setError(err)
        console.log(err)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const logout = async () => {
    localStorage.removeItem("token");
    setAuth(false);
    setUser({});
  };

  const check = async () => {
    setLoading(true);
    try {
      const response = await AuthService.check()
      setAuth(true);
      const data = response.data.result

      if (data.roleModel.role === process.env.REACT_APP_ROLE_USER) {
        let userData = UserService.login(
          data.email,
          data.firstName,
          data.surname,
          data.phoneNumber,
          null,
          data.username,
          data.clientModel.partnerFirstName,
          data.clientModel.partnerLastName,
          data.clientModel.engagementDate,
          data.clientModel.weddingDate,
          data.clientModel.weddingAddress,
          data.clientModel.amountOfGuests,
          data.clientModel.budget,
        )
        setUser(userData.data.user);
      } else {
        let vendorData = VendorService.login(data.email, data.firstName, data.surname, data.phoneNumber, null);
        setUser(vendorData.data.user)
      }

    } catch (e) {
      console.log(e);
      setError(e)
    } finally {
      setLoading(false);
    }
  };

  return { login, logout, check, setUser, isAuth, isLoading, user };
};

export default useAuth;
