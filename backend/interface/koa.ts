import { DefaultContext, DefaultState } from "koa";
import { IHttpConnection } from "./httpConnection.js";

export interface IStateUser {
  username: string;
}

export interface IContextConnection {
  http: { [name: string]: IHttpConnection };
}

export interface ICoreState extends DefaultState {
  user?: IStateUser;
  requestId?: string;
}

export interface ICoreContext extends DefaultContext {
  connection: IContextConnection;
}
