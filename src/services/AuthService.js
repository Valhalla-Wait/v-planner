import { $api, $host } from "../http";

import axios from "axios"

export default class AuthService {
  static async logout() {
    return $api.post("/");
  }

  // static async check() {
  //   // return $host.get("/refresh")
  //   const user = localStorage.getItem("token");



  //   return {
  //     data: {
  //       accessToken: user,
  //       refreshToken: "refresh",
  //       user: JSON.parse(user),
  //     },
  //   };
  // }

  static async check() {
    // return $api.get('/user/current')
    return axios({
      method: "get",
      url: `${process.env.REACT_APP_URL_TEST}/user/current`,
      headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
  }

  static async login(email, password) {
    return axios
      .post(`${process.env.REACT_APP_URL_TEST}/user/login`, {
        email,
        password,
      })
  }
}
