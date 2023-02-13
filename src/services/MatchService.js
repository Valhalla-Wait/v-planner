import { $api } from "../http";

export default class MatchService {
    static like(vendorId) {
        return $api.put(`matches/liked-or-not?vendorId=${vendorId}&status=true`)
    }
}