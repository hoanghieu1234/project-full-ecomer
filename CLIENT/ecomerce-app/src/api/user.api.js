import axiosClient from "./AxiosClient";
class userApi {
  static register(param) {
    const url = "api/user/register";
    return axiosClient.post(url, param);
  }
  static login(param) {
    const url = "api/user/login";
    return axiosClient.post(url, param);
  }

  static userAddToCart(param) {
    const url = "api/user/cart";
    return axiosClient.post(url, param);
  }
  static getCartItem(id) {
    const url = `api/user/cart/${id}`;
    return axiosClient.get(url);
  }
}

export default userApi;
