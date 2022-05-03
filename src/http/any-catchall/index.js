import arc from "@architect/functions";
import path from "path";
import fs from "fs";
import { ApolloServer } from "apollo-server-lambda";
import {
    ApolloServerPluginLandingPageProductionDefault,
    ApolloServerPluginLandingPageGraphQLPlayground,
    // ApolloServerPluginLandingPageLocalDefault,
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
            : ApolloServerPluginLandingPageGraphQLPlayground(),
    ],
    introspection: true,
}).createHandler();

// TODO :: handling timeouts

export async function handler(event, context, callback) {
    try {
        // Support for AWS HTTP API syntax
        event.httpMethod = event.httpMethod
            ? event.httpMethod
            : event.requestContext.http.method;
        if (event.httpMethod === "OPTIONS")
            return {
                statusCode: 204,
                headers: {
                    "Access-Control-Request-Method": "OPTIONS, POST",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Max-Age": "86400", // cache preflight/cors request by browsers
                    "Cache-Control": "max-age=604800, public",
                    "Content-Type": "application/json; charset=utf8",
                    Connection: "Keep-Alive",
                    Server: "dhyey's GraphQL Proxy API",
                },
            };
        else if (event.httpMethod !== "POST")
            throw new Error(
                `${event.httpMethod} method is not allowed! Only POST is valid method for this GraphQL API.`
            );

        // Also support hte HTTP syntax...
        event.path = event.rawPath;
        // Body is now parsed, re-encode to JSON for Apollo
        event.body = JSON.stringify(arc.http.helpers.bodyParser(event));
        return ServerHandler(event, context, callback);
    } catch (err) {
        return {
            body: JSON.stringify({
                error: err.message,
            }),
            statusCode: 400,
            headers: {
                "Cache-Control": "max-age=604800, public",
                "Content-Type": "application/json; charset=utf8",
                Connection: "Keep-Alive",
                Server: "dhyey's GraphQL Proxy API",
            },
        };
    }
}
