import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://34.96.136.175:5000/api",
  withCredentials: true
});
