import path from "path";
import fs from "fs";
import { ApolloServer } from "apollo-server";
import {
    ApolloServerPluginLandingPageProductionDefault,
    ApolloServerPluginLandingPageLocalDefault,
} from "apollo-server-core";

import resolvers from "../src/resolvers/index";

const Server = new ApolloServer({
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
});

export default Server;

//! ---- For normal testing ----
// Server
//     .listen()
//     .then(() => {
//         console.log(`
//     🚀 Server ready at http://localhost:4000${server.graphqlPath}
//     📭  Query at https://studio.apollographql.com/dev
//     `);
//     })
//     .catch((err) => console.error);
