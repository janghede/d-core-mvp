import { ICoreState, ICoreContext } from "@backend/interface/koa.js";
import { IHttpConnection } from "@backend/interface/httpConnection.js";

export interface IPlaygroundConnection {
  http: { jsonplaceholder: IHttpConnection };
}

export interface IPlayGroundState extends ICoreState {}

export interface IPlayGroundContext extends ICoreContext {
  connection: IPlaygroundConnection;
}
