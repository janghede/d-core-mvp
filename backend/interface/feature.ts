import { IMiddleware } from "koa-router";
import { ParameterizedContext } from "koa";
import { ICoreContext, ICoreState } from "./koa";

export interface IFeature<TState extends ICoreState, TContext extends ICoreContext> {
  config?: Array<IFeatureRouteConfig<TState, TContext>>;
  routes(): IMiddleware<TState, TContext>;
  configure(): this;
  register<TReturn = unknown>(route: IFeatureRouteConfig<TState, TContext, TReturn>): this;
}

export interface IFeatureRouteConfig<TState extends ICoreState, TContext extends ICoreContext, TReturn = unknown> {
  path: string;
  method: string;
  roles?: string[];
  fn: (ctx: ParameterizedContext<TState, TContext, TReturn>) => Promise<void>;
}
