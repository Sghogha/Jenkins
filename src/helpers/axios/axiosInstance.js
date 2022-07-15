import Axios from "axios/index";
import { errorHandler, fetchFromStorage } from "../context";
import { identifiers } from "../constants/identifier";
import { Config } from "../context/config";

const axiosInstance = Axios.create({
  baseURL: Config.baseURL,
  headers: { "Content-Type": "application/json" },
});
axiosInstance.interceptors.request.use((config) => {
  const token = fetchFromStorage(identifiers.token);
  const clonedConfig = config;

  if (token) {
    clonedConfig.headers.common = {
      Authorization: `Bearer ${token?.token}`,
      "Content-Type": "application/json",
    };
  }

  return clonedConfig;
});

axiosInstance.interceptors.response.use(
  (config) => {
    return config;
  },
  (error) => {
    errorHandler(error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
