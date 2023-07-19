import axiosClient from "./AxiosClient";

class PaymentAPI {
  static postCartToPayment(data) {
    const url = "api/payment";
    return axiosClient.post(url, data);
  }
  static deleteCartToPayment(id) {
    const url = `api/payment/${id}`;
    return axiosClient.delete(url);
  }
}
export default PaymentAPI;
