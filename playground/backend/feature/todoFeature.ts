import { IPlayGroundContext, IPlayGroundState } from "../interface/playground.ts";
import { ParameterizedContext } from "koa";
import { Feature } from "@backend/feature/feature.ts";

const getTodoItems = async (ctx: ParameterizedContext<IPlayGroundState, IPlayGroundContext>) => {
  ctx.body = (await ctx.connection.http.jsonplaceholder.get("/todos")).data;
};

export const todoFeature = new Feature<IPlayGroundState, IPlayGroundContext>([{ path: "/todo/list", roles: [], method: "get", fn: getTodoItems }]);
