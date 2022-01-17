import arc from "@architect/functions";
import path from "path";
import fs from "fs";
import { ApolloServer } from "apollo-server-lambda";
import {
    ApolloServerPluginLandingPageProductionDefault,
    ApolloServerPluginLandingPageLocalDefault,
} from "apollo-server-core";
import resolvers from "../src/resolvers/index.js";

const __dirname = path.resolve();

const ServerHandler = new ApolloServer({
    typeDefs: fs.readFileSync(
        path.join(__dirname, "../src/", "schema.graphql"),
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

export async function handler(event, context, callback) {
    try {
        const body = arc.http.helpers.bodyParser(event);
        // Body is now parsed, re-encode to JSON for Apollo
        event.body = JSON.stringify(body);
        return ServerHandler(event, context, callback);
    } catch (err) {
        console.error(err);
    }
}