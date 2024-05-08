import axios from "axios";

const customAxios = axios.create({
  baseURL: "https://micromonitor.com",
});

export default class CustomAxios {
  static Get = (path: string, params?: {}, id?: string) => {
    const newPath = id ? path.replace("{}", id) : path;
    return customAxios.get(newPath, { params: params });
  };

  static Post = (path: string, data: any, params?: any, id?: string) => {
    const newPath = id ? path.replace("{}", id) : path;
    return customAxios.post(newPath, data, { params: params });
  };
}
