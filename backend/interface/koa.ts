import { DefaultContext, DefaultState } from "koa";
import { IHttpConnection } from "./httpConnection.js";
import { IUser } from "@shared/interface/user.js";

export interface IContextConnection {
  http: { [name: string]: IHttpConnection };
}

export interface ICoreState extends DefaultState {
  user?: IUser;
  requestId?: string;
}

export interface ICoreContext extends DefaultContext {
  connection: IContextConnection;
}
