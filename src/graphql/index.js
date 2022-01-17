import arc from "@architect/functions";
import { promisify } from "util";
import path, { resolve } from "path";
import fs from "fs";
import { ApolloServer } from "apollo-server-lambda";
import {
    ApolloServerPluginLandingPageProductionDefault,
    ApolloServerPluginLandingPageLocalDefault,
} from "apollo-server-core";

const __dirname = path.resolve();

const readdir = promisify(fs.readdir);
async function* getFiles(dir) {
    const dirents = await readdir(dir, { withFileTypes: true });
    for (const dirent of dirents) {
        const res = resolve(dir, dirent.name);
        if (dirent.isDirectory()) {
            yield* getFiles(res);
        } else {
            yield res;
        }
    }
}

(async () => {
    try {
        for await (const f of getFiles("../../var")) {
            console.log(f);
        }
    } catch (err) {
        console.error(err);
    }
})();

console.info("__dirname", __dirname);

import resolvers from "../resolvers/index.js";

const ServerHandler = new ApolloServer({
    typeDefs: fs.readFileSync(
        path.join(__dirname, "../", "schema.graphql"),
        "utf8"
    ),
    resolvers,
    plugins: [
        process.env.NODE_ENV === "production"
            ? ApolloServerPluginLandingPageProductionDefault({ footer: false })
            : ApolloServerPluginLandingPageLocalDefault({ footer: false }),
    ],
    introspection: true,
}).createHandler();

// TODO :: handling timeouts

export async function handler(event, context, callback) {
    try {
        const body = arc.http.helpers.bodyParser(event);
        // Support for AWS HTTP API syntax
        event.httpMethod = event.httpMethod
            ? event.httpMethod
            : event.requestContext.http.method;
        // Also support hte HTTP syntax...
        event.path = event.rawPath;
        // Body is now parsed, re-encode to JSON for Apollo
        event.body = JSON.stringify(body);
        return ServerHandler(event, context, callback);
    } catch (err) {
        console.error(err);
    }
}
