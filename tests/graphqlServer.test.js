import test from "tape";
import tiny from "tiny-json-http";
import Queries from "./queries.js";
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
    try {
        const res = await postReq(Queries[0]);
        t.ok(
            res.body.hasOwnProperty("data"),
            `Test passed "${Queries[0].name}" query`
        );
    } catch (err) {
        t.fail(`Test failed ${Queries[0].name} with ERROR :: ${err}`);
    }
});

test("test fragment query", async (t) => {
    t.plan(1);
    try {
        const res = await postReq(Queries[1]);
        t.ok(
            res.body.hasOwnProperty("data"),
            `Test passed "${Queries[1].name}" query`
        );
    } catch (err) {
        t.fail(`Test failed ${Queries[1].name} with ERROR :: ${err}`);
    }
});

test("teardown", async (t) => {
    t.plan(1);
    await sandbox.end();
    t.ok(true, "sandbox ended");
});
