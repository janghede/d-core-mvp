import { ParameterizedContext } from "koa";
import { ICoreContext, ICoreState } from "./koa";

export interface IFeatureConfig<TState extends ICoreState, TContext extends ICoreContext, TReturn = unknown> {
  path: string;
  method: string;
  fn: (ctx: ParameterizedContext<TState, TContext, TReturn>) => Promise<void>;
}
