import { IFeature, IFeatureRouteConfig } from "../interface/feature";
import { ICoreState, ICoreContext } from "../interface/koa";
import Router from "koa-router";
import compose from "koa-compose";
import assert from "assert";

export class Feature<TState extends ICoreState, TContext extends ICoreContext> implements IFeature<TState, TContext> {
  private router: Router<TState, TContext>;
  constructor(public config?: Array<IFeatureRouteConfig<TState, TContext>>) {
    this.router = new Router<TState, TContext>({ prefix: "/api" });
  }

  configure() {
    if (this.config != null) {
      this.config.forEach((configItem) => {
        this.router.register(configItem.path, [configItem.method], compose([configItem.fn]));
      });
    }

    return this;
  }

  register<TReturn = unknown>(route: IFeatureRouteConfig<TState, TContext, TReturn>) {
    this.router.register(route.path, [route.method], compose([route.fn]));

    return this;
  }

  routes() {
    console.log(this.router.stack.map((i) => i.path));
    return this.router.routes();
  }
}
