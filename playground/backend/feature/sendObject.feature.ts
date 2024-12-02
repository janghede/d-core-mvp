import { IPlayGroundContext, IPlayGroundState } from "../interface/playground.ts";
import { ParameterizedContext } from "koa";
import { Feature } from "@backend/feature/feature.ts";
import { ZUser } from "../../shared/interface/sendObject.interface.ts";

const sendObject = async (ctx: ParameterizedContext<IPlayGroundState, IPlayGroundContext>) => {
  const user = ZUser.safeParse(ctx.request.body);
  if (!user.success) {
    ctx.status = 400;
    ctx.body = user.error.issues;
    return;
  }

  ctx.status = 200;
};

export const sendObjectFeature = new Feature<IPlayGroundState, IPlayGroundContext>([{ path: "/sendObject", roles: [], method: "post", fn: sendObject }]);
