import axios, { AxiosResponse } from "axios";
import { AxiosInstance, AxiosRequestConfig } from "axios";
import { IHttpConnection } from "../interface/httpConnection";

export class httpConnection implements IHttpConnection {
  protected client: AxiosInstance;

  constructor(protected baseUrl: string) {
    let axiosConfig: AxiosRequestConfig = { baseURL: baseUrl };
    this.client = axios.create(axiosConfig);
  }

  async get<T, R = AxiosResponse<T>>(path: string): Promise<R> {
    return this.client.get(path);
  }
}
