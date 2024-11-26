import Koa, { BaseContext, Middleware, ParameterizedContext } from "koa";
import compose from "koa-compose";
import { IContextConnection, ICoreContext, ICoreState } from "../interface/koa";
import { IHttpConnectionConfig } from "../interface/httpConnection";
import { httpConnection } from "../connection/httpConnection";

export class Loader<TState extends ICoreState, TContext extends ICoreContext> {
  public app: Koa<TState, TContext>;

  constructor() {
    this.app = new Koa<TState, TContext>();
    var connection: IContextConnection = { http: {} };
    this.app.context.connection = connection;
  }

  loadHttpConnection(config: IHttpConnectionConfig) {
    this.app.context.connection.http[config.name] = new httpConnection(config.baseUrl);
  }
}
