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

  static updateQuantity(id, data) {
    const url = `/api/user/cart/quantity/${id}`;
    return axiosClient.put(url, data);
  }
  static deleteProductInCart(id) {
    const url = `/api/user/cart/${id}`;
    return axiosClient.delete(url);
  }
}
export default productAPI;
