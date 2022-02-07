import axios from "axios";
export const axiosInstance = axios.create({
  baseURL: "https://blog-hoang.herokuapp.com/api/",
});
