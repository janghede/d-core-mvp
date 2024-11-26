import { ICoreState, ICoreContext } from "../interface/koa";
import Router from "koa-router";
import compose from "koa-compose";
import assert from "assert";
import { IFeatureConfig } from "../interface/feature";

export class Feature<TState extends ICoreState, TContext extends ICoreContext> implements IFeatureConfig {
  private middlewares?: IMiddlewareOrder;
  private router: Router<TState, TContext>;
  constructor(public config?: Array<IFeatureRouteConfig<TState, TContext>>) {
    this.router = new Router<TState, TContext>({ prefix: "/api" });
  }

  withMiddleware(middlewares: IMiddlewareOrder) {
    this.middlewares = middlewares;
    return this;
  }

  configure() {
    if (this.config != null) {
      this.config.forEach((configItem) => {
        //Verify authentication and authorization if roles are configured
        if (configItem.roles != undefined) {
          if (this.middlewares == undefined) {
            throw new Error(
              `Authentication and authorization middlewares are required for feature configuration with roles configured. Feature route: ${configItem.path}`
            );
          } else {
            if (this.middlewares.authentication === undefined) {
              throw new Error(`Authentication middleware is required for feature configuration with roles configured. Feature route: ${configItem.path}`);
            }
            if (this.middlewares.authorization === undefined) {
              throw new Error(`Authroization middleware is required for feature configuration with roles configured. Feature route: ${configItem.path}`);
            }
          }
        }

        if (this.middlewares) {
          this.middlewares.preAuthentication = this.middlewares.preAuthentication ?? [];
          this.middlewares.postAuthentication = this.middlewares.postAuthentication ?? [];
          this.middlewares.postauthorization = this.middlewares.postauthorization ?? [];

          if (this.middlewares.authentication === undefined && this.middlewares.authorization === undefined) {
            assert(this.middlewares.postAuthentication.length == 0, "postAuthentication middlewares is not available without authentication");
            assert(this.middlewares.postauthorization.length == 0, "postauthorization middlewares is not available without authorization");

            this.router.register(configItem.path, [configItem.method], compose([...this.middlewares.preAuthentication, configItem.fn]));
          } else {
            if (this.middlewares.authentication === undefined || this.middlewares.authorization === undefined) {
              throw new Error("Both authentication and authorization middlewares needs to be set at the same time");
            }

            this.router.register(
              configItem.path,
              [configItem.method],
              [
                compose([
                  ...this.middlewares.preAuthentication,
                  this.middlewares.authentication,
                  ...this.middlewares.postAuthentication,
                  this.middlewares.authorization({ roles: configItem.roles ?? [], customAuthorizeMiddlewares: [] }),
                  ...this.middlewares.postauthorization,
                  configItem.fn,
                ]),
              ]
            );
          }
        } else {
          this.router.register(configItem.path, [configItem.method], compose([configItem.fn]));
        }
      });
    }

    return this;
  }

  register<TReturn = unknown>(route: IFeatureRouteConfig<TState, TContext, TReturn>) {
    //Verify authentication and authorization if roles are configured
    if (route.roles != undefined) {
      if (this.middlewares == undefined) {
        throw new Error(
          `Authentication and authorization middlewares are required for feature configuration with roles configured. Feature route: ${route.path}`
        );
      } else {
        if (this.middlewares.authentication === undefined) {
          throw new Error(`Authentication middleware is required for feature configuration with roles configured. Feature route: ${route.path}`);
        }
        if (this.middlewares.authorization === undefined) {
          throw new Error(`Authroization middleware is required for feature configuration with roles configured. Feature route: ${route.path}`);
        }
      }
    }

    if (this.middlewares) {
      this.middlewares.preAuthentication = this.middlewares.preAuthentication ?? [];
      this.middlewares.postAuthentication = this.middlewares.postAuthentication ?? [];
      this.middlewares.postauthorization = this.middlewares.postauthorization ?? [];

      if (this.middlewares.authentication === undefined && this.middlewares.authorization === undefined) {
        assert(this.middlewares.postAuthentication.length == 0, "postAuthentication middlewares is not available without authentication");
        assert(this.middlewares.postauthorization.length == 0, "postauthorization middlewares is not available without authorization");

        this.router.register(route.path, [route.method], compose([...this.middlewares.preAuthentication, route.fn]));
      } else {
        if (this.middlewares.authentication === undefined || this.middlewares.authorization === undefined) {
          throw new Error("Both authentication and authorization middlewares needs to be set at the same time");
        }

        this.router.register(
          route.path,
          [route.method],
          [
            compose([
              ...this.middlewares.preAuthentication,
              this.middlewares.authentication,
              ...this.middlewares.postAuthentication,
              this.middlewares.authorization({ roles: route.roles ?? [], customAuthorizeMiddlewares: [] }),
              ...this.middlewares.postauthorization,
              route.fn,
            ]),
          ]
        );
      }
    } else {
      this.router.register(route.path, [route.method], compose([route.fn]));
    }

    return this;
  }

  routes() {
    console.log(this.router.stack.map((i) => i.path));
    return this.router.routes();
  }
}
