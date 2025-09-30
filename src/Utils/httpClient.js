import axios from "axios";

const httpClient = axios.create({
  // baseURL: import.meta.env.VITE_Local,
  baseURL: "https://erp-backendapi-9upv.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

httpClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("SpondiasAuthToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
httpClient.interceptors.response.use(
  (response) => {
    if (response.status === 401) {
      alert("You are not authorized");
      localStorage.removeItem("SpondiasAuthToken");
      window.location.href = "/";
    }
    return response;
  },
  (error) => {
    if (error.response && error.response.data) {
      return Promise.reject(error.response.data);
    }
    return Promise.reject(error.message);
  }
);
export default httpClient;
