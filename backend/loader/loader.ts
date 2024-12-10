import Koa, { BaseContext, Middleware, ParameterizedContext } from "koa";
import compose from "koa-compose";
import cors from "koa-cors";
import { koaBody } from "koa-body";
import { IContextConnection, ICoreContext, ICoreState } from "../interface/koa.js";
import { IHttpConnectionConfig } from "../interface/httpConnection.js";
import { httpConnection } from "../connection/httpConnection.js";
import { IFeature } from "../interface/feature.js";

export class Loader<TState extends ICoreState, TContext extends ICoreContext> {
  public app: Koa<TState, TContext>;

  constructor() {
    this.app = new Koa<TState, TContext>();
    var connection: IContextConnection = { http: {} };
    this.app.context.connection = connection;
    this.app.use(koaBody({ multipart: true }));
  }

  setCors(options?: cors.Options) {
    this.app.use(cors(options));
    return this;
  }

  loadHttpConnection(config: IHttpConnectionConfig) {
    this.app.context.connection.http[config.name] = new httpConnection(config.baseUrl);
    return this;
  }

  loadFeatures(features: IFeature<TState, TContext> | Array<IFeature<TState, TContext>>) {
    if (Array.isArray(features)) {
      features.forEach((feature) => this.app.use(feature.configure().routes()));
    } else {
      this.app.use(features.configure().routes());
    }

    return this;
  }
}
