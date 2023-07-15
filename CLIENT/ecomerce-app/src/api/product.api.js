import axiosClient from "./AxiosClient";

class productAPI {
  static getAllProducts(param) {
    const url = "/api/product";
    return axiosClient.get(url, param);
  }
  static getDetailProduct(param) {
    const url = `/api/product/${param}`;
    return axiosClient.get(url);
  }
}
export default productAPI;
