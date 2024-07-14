import axios from "axios";

const customAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

customAxios.interceptors.request.use((config) => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : "";
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default class CustomAxios {
  static Get = (path: string, params?: {}, id?: string) => {
    const newPath = id ? path.replace("{}", id) : path;
    return customAxios.get(newPath, { params: params });
  };

  static Post = (path: string, data: any, params?: any) => {
    return customAxios.post(path, data, { params: params });
  };

  static Put = (path: string, data: any, params?: {}, id?: string) => {
    const newPath = id ? path.replace("{}", id) : path;
    return customAxios.put(newPath, data, { params: params });
  };

  static Delete = (path: string, id: string) => {
    const newPath = path.replace("{}", id);
    return customAxios.delete(newPath);
  };
}
