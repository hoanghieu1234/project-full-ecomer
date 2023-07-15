export const storeImage = {
  get test() {
    return new URL("./images/service.png", import.meta.url).href;
  },
  //nhung anh product
  get imageProduct() {
    return {
      get anh1() {
        return new URL("./images/smartphone.avif", import.meta.url).href;
      },
      get watch() {
        return new URL("./images/watch.jpg", import.meta.url).href;
      },
    };
  },
};
