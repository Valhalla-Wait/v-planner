import { $api, $host } from "../http";

export default class AuthService {
  static async logout() {
    return $api.post("/");
  }

  static async check() {
    // return $host.get("/refresh")
    const user = localStorage.getItem("token");

    return {
      data: {
        accessToken: user,
        refreshToken: "refresh",
        user: JSON.parse(user),
      },
    };
  }
}
