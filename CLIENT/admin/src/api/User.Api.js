import axiosClient from "./AxiosClient";

class userApi {
  // login admin
  static login(param) {
    const url = "api/user/admin-login";
    return axiosClient.post(url, param);
  }
  // get all users
  static getAllUser(data) {
    const url = "api/user/all-users";
    return axiosClient.get(url, data);
  }
  // block admin
  static blockUser(id, data) {
    const url = `api/user/block-user/${id}`;
    return axiosClient.patch(url, data);
  }
  // Get user by id
  static getUserById(id, data) {
    const url = `api/user/${id}`;
    return axiosClient.get(url, data);
  }
  static searchUser(data) {
    const url = "api/user/search";
    return axiosClient.post(url, data);
  }
}

export default userApi;
