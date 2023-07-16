import axiosClient from "./AxiosClient";

class paymentAPI {
  static postCartToPayment(data) {
    const url = "/api/user/payment";
    return axiosClient.post(url, data);
  }
}
export default paymentAPI;
