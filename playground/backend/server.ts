// Koa
import { IPlayGroundContext, IPlayGroundState } from "./interface/playground";
import { Loader } from "@backend/loader/loader";

// Connections
import jsonplaceholderHttpConnection from "./connection/jsonplaceholder.connection";

// Features
import { todoFeature } from "./feature/todoFeature";

let loader = new Loader<IPlayGroundState, IPlayGroundContext>();

loader.loadHttpConnection(jsonplaceholderHttpConnection).loadFeatures([todoFeature]);

console.log(`[server]: process.env.IS_PRIMARY: ${process.env.IS_PRIMARY} `);

//Start server
const port = process.env.PORT ?? 3003;
loader.app.listen(port, () => console.log(`Listing on port ${port}`));
