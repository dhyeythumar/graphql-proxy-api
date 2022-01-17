import test from "tape";
import tiny from "tiny-json-http";
import sandbox from "@architect/sandbox";

const postReq = async (queryObj) => {
    const variables = queryObj.variables ? queryObj.variables : {};
    return await tiny.post({
        url: URL,
        data: {
            query: queryObj.query,
            variables: variables,
        },
    });
};
const URL = "http://localhost:3333/";

test("setup", async (t) => {
    t.plan(1);
    await sandbox.start();
    t.ok(true, `sandbox started on ${URL}`);
});

test("test simple query", async (t) => {
    t.plan(1);
    const query = {
        name: "For basic server response/info",
        query: `query info {
                info
            }`,
    };
    try {
        const res = await postReq(query);
        t.ok(
            res.body.hasOwnProperty("data"),
            `Test passed "${query.name}" query`
        );
    } catch (err) {
        t.fail(`Test failed "${query.name}" with ERROR :: ${err}`);
    }
});

test("test fragment query", async (t) => {
    t.plan(1);
    const query = {
        name: "For fragment in GraphQL",
        query: `query userData ($userId: ID!) {
                user(userId: $userId) { ...userFragment }
            }
            fragment userFragment on User {
                name
                id
                username
                email
                phone
                ...websiteUserFragment
                posts { ...postsUserFragment }
            }
            fragment websiteUserFragment on User { website }
            fragment postsUserFragment on Post {
                postId
                userId
                title
                body
                comments {
                    commentId
                    postId
                    name
                    email
                    body
                }
            }`,
        variables: {
            userId: "10",
        },
    };
    try {
        const res = await postReq(query);
        t.ok(
            res.body.hasOwnProperty("data"),
            `Test passed "${query.name}" query`
        );
    } catch (err) {
        t.fail(`Test failed "${query.name}" with ERROR :: ${err}`);
    }
});

test("teardown", async (t) => {
    t.plan(1);
    await sandbox.end();
    t.ok(true, "sandbox ended");
});
