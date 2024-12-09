import { IPlayGroundContext, IPlayGroundState } from "../interface/playground.ts";
import { ParameterizedContext } from "koa";
import { Feature } from "@backend/feature/feature.ts";
import { ZUser, ZDbUser } from "../../shared/interface/sendObject.interface.ts";

const getUsersFromDb = () => {
  const dbRequest = (): any[] => [
    { id: "ab12345", email: "abc@edu.stockholm.se", name: "Markus" },
    { id: "ab12345", email: "abc@edu.stockholm.se", name: "" },
    { id: "ab12345", email: "abc@edu.stockholm.se", name: null },
  ];

  const dbData = dbRequest();

  return dbData.filter((d) => ZDbUser.safeParse(d).success);
};

const sendObject = async (ctx: ParameterizedContext<IPlayGroundState, IPlayGroundContext>) => {
  const user = ZUser.safeParse(ctx.request.body);
  if (!user.success) {
    ctx.status = 400;
    ctx.body = user.error.issues;
    return;
  }

  const dbUsers = getUsersFromDb();

  ctx.status = 200;
};

export const sendObjectFeature = new Feature<IPlayGroundState, IPlayGroundContext>([{ path: "/sendObject", roles: [], method: "post", fn: sendObject }]);
