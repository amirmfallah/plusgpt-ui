import axios, { AxiosRequestConfig } from "axios";
axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL;

async function _get<T>(url: string, options?: AxiosRequestConfig): Promise<T> {
  const response = await axios.get(url, { ...options });
  return response.data;
}

async function _post(url: string, data?: any) {
  const response = await axios.post(url, JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
}

async function _postMultiPart(
  url: string,
  formData: FormData,
  options?: AxiosRequestConfig
) {
  const response = await axios.post(url, formData, {
    ...options,
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
}

async function _put(url: string, data?: any) {
  const response = await axios.put(url, JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
}

async function _putS3(url: string, data?: any) {
  const instance = axios.create({
    headers: { "Content-Type": "application/pdf" },
  });
  delete instance.defaults.headers.common["Authorization"];
  const response = await instance.put(url, data);
  return response.data;
}

async function _delete<T>(url: string): Promise<T> {
  const response = await axios.delete(url);
  return response.data;
}

async function _deleteWithOptions<T>(
  url: string,
  options?: AxiosRequestConfig
): Promise<T> {
  const response = await axios.delete(url, { ...options });
  return response.data;
}

async function _patch(url: string, data?: any) {
  const response = await axios.patch(url, JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
}

export default {
  get: _get,
  post: _post,
  postMultiPart: _postMultiPart,
  put: _put,
  delete: _delete,
  deleteWithOptions: _deleteWithOptions,
  patch: _patch,
  putS3: _putS3,
};
