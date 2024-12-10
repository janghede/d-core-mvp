// Koa
import { IPlayGroundContext, IPlayGroundState } from "./interface/playground.ts";
import { Loader } from "@backend/loader/loader.ts";

// Connections
import jsonplaceholderHttpConnection from "./connection/jsonplaceholder.connection.ts";

// Features
import { todoFeature } from "./feature/todoFeature.ts";
import { sendObjectFeature } from "./feature/sendObject.feature.ts";

let loader = new Loader<IPlayGroundState, IPlayGroundContext>();

loader.setCors().loadHttpConnection(jsonplaceholderHttpConnection).loadFeatures([todoFeature, sendObjectFeature]);

console.log(`[server]: process.env.IS_PRIMARY: ${process.env.IS_PRIMARY} `);

//Start server
const port = process.env.PORT ?? 3003;
loader.app.listen(port, () => console.log(`Listing on port ${port}`));
