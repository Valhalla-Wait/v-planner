import { $api } from "../http";

export default class VendorService {
  static async changeCredentials(email, password) {
    return $api.put('/vendors/change-credentials', { email, password })
  }
}