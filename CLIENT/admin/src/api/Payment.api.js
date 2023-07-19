import axiosClient from "./AxiosClient";

class paymentApi {
  // get all product
  static getPayment(data) {
    const url = "api/payment";
    return axiosClient.get(url, data);
  }
}

export default paymentApi;
