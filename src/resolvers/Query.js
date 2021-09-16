import { jsonPlaceholder } from "../base-axios";

// 'parent' parameter carries the return value of the previous resolver execution level
export default {
    info: () => `A simple fake GraphQL API server`,
    posts: async (parent, args, context) => {
        try {
            let posts;
            if (args.userId)
                posts = await jsonPlaceholder.get(
                    `/posts?userId=${args.userId}`
                );
            else posts = await jsonPlaceholder.get(`/posts`);
            posts = posts.data;

            if (args.sort.toString() == "desc")
                posts.sort((a, b) => {
                    return b.id - a.id;
                });
            else
                posts.sort((a, b) => {
                    return a.id - b.id;
                });

            return posts;
        } catch (err) {
            console.log(err);
            throw new Error(err);
        }
    },
    post: async (parent, args, context) => {
        try {
            const post = await jsonPlaceholder.get(`/posts/${args.postId}`);
            return post.data;
        } catch (err) {
            console.log(err);
            throw new Error(err);
        }
    },
};
