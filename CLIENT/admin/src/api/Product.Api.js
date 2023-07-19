import axiosClient from "./AxiosClient";

class productApi {
  // get all product
  static getAllProduct(data) {
    const url = "api/product";
    return axiosClient.get(url, data);
  }
  // delete product
  static deleteProduct(params) {
    const url = `api/product/${params.id}`;
    return axiosClient.delete(url, params);
  }
  // create product
  static createProduct(data) {
    const url = "api/product";
    return axiosClient.post(url, data);
  }
  // update product
  static updateProduct(params) {
    console.log("product", params);
    const url = `api/product/${params.id}`;
    return axiosClient.patch(url, params);
  }
}

export default productApi;
