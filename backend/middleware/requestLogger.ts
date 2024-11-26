import { Next, ParameterizedContext, Middleware, DefaultState, DefaultContext } from "koa";

export function createRequestLoggerMiddleware<TState extends DefaultState, TContext extends DefaultContext>(): Middleware<TState, TContext> {
  return async function createRequestLogger(ctx: ParameterizedContext<TState, TContext>, next: Next) {
    console.log(ctx.request.path);
    await next();
  };
}
