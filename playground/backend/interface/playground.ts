import { ICoreState, ICoreContext } from "@backend/interface/koa";
import { IHttpConnection } from "@backend/interface/httpConnection";

export interface IPlaygroundConnection {
  http: { jsonplaceholder: IHttpConnection };
}

export interface IPlayGroundState extends ICoreState {}

export interface IPlayGroundContext extends ICoreContext {
  connection: IPlaygroundConnection;
}
