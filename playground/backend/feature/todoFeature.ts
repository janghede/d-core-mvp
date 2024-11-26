import { IPlayGroundContext, IPlayGroundState } from "../interface/playground";
import { ParameterizedContext } from "koa";
import { Feature } from "@backend/feature/feature";

const getTodoItems = async (ctx: ParameterizedContext<IPlayGroundState, IPlayGroundContext>) => {
  ctx.body = "hej";
};

export const todoFeature = new Feature<IPlayGroundState, IPlayGroundContext>([{ path: "/list", roles: [], method: "get", fn: getTodoItems }]);
