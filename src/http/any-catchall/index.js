import arc from "@architect/functions";
import path from "path";
import fs from "fs";
import { ApolloServer } from "apollo-server-lambda";
import {
    ApolloServerPluginLandingPageProductionDefault,
    ApolloServerPluginLandingPageLocalDefault,
} from "apollo-server-core";
import resolvers from "@architect/shared/resolvers/index.js";

const __dirname = path.resolve();

const ServerHandler = new ApolloServer({
    typeDefs: fs.readFileSync(
        path.join(__dirname, "./", "schema.graphql"),
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
