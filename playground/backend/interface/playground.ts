import { ICoreState, ICoreContext } from "@backend/interface/koa.ts";
import { IHttpConnection } from "@backend/interface/httpConnection.ts";

export interface IPlaygroundConnection {
  http: { jsonplaceholder: IHttpConnection };
}

export interface IPlayGroundState extends ICoreState {}

export interface IPlayGroundContext extends ICoreContext {
  connection: IPlaygroundConnection;
}
