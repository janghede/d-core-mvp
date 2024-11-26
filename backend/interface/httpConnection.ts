import { AxiosResponse } from "axios";

export interface IHttpConnectionConfig {
  name: string;
  baseUrl: string;
}

export interface IHttpConnection {
  get<T, R = AxiosResponse<T>>(path: string): Promise<R>;
}
