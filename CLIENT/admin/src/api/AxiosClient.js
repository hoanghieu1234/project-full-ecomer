import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:5000/",
  headers: {
    "Content-Type": "application/json",
  },
});

// Thêm một bộ đón chặn request
axiosClient.interceptors.request.use(
  function (config) {
    // Làm gì đó trước khi request dược gửi đi
    const accessToken = JSON.parse(localStorage.getItem("accessToken"));
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  function (error) {
    // Làm gì đó với lỗi request
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    console.log("axiosClient - response error", error.response);
    const { config, status, data } = error.response;

    if (config.url === "register" && status === 400) {
      throw new Error(data.message);
    }

    if (config.url === "api/user/login" && status === 401) {
      throw new Error(data.message);
    }
    // Do something with response error
    return Promise.reject(error);
  }
);

export default axiosClient;
