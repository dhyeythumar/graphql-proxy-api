import axios from "axios";
import Queries from "./Queries.js";

let URL = "http://localhost:4000/";
if (process.env.NODE_ENV === "production")
    URL = "https://graphql-proxy-api.vercel.app/";

const makeAxiosReq = async (queryObj) => {
    const variables = queryObj.variables ? queryObj.variables : {};
    return await axios({
        method: "post",
        url: URL,
        data: {
            query: queryObj.query,
            variables: variables,
        },
    });
};

(() => {
    Queries.forEach(async (queryObj) => {
        const res = await makeAxiosReq(queryObj);
        if (res.status === 200) console.log(`[Test passed] ${queryObj.name}`);
        else console.log(`[Test failed] ${queryObj.name} with ERROR :: `, err);
        // console.log(res.data.data);
    });
})();
