import { jsonPlaceholder } from "../base-axios";

export default {
    createPost: async (parent, args, context) => {
        try {
            const newPost = await jsonPlaceholder.post(
                "/posts",
                {
                    userId: args.userId,
                    title: args.title,
                    body: args.body,
                },
                {
                    "Content-type": "application/json; charset=UTF-8",
                }
            );
            return newPost.data;
        } catch (err) {
            console.log(err);
            throw new Error(err);
        }
    },
    updatePost: async (parent, args, context) => {
        try {
            const post = await jsonPlaceholder.get(`/posts/${args.postId}`);

            if (args.title) post.data.title = args.title;
            if (args.body) post.data.body = args.body;

            const updatedPost = await jsonPlaceholder.put(
                `/posts/${args.postId}`,
                {
                    userId: post.data.userId,
                    title: post.data.title,
                    body: post.data.body,
                },
                {
                    "Content-type": "application/json; charset=UTF-8",
                }
            );
            return updatedPost.data;
        } catch (err) {
            console.log(err);
            throw new Error(err);
        }
    },
    deletePost: async (parent, args, context) => {
        try {
            const deletedPost = await jsonPlaceholder.get(
                `/posts/${args.postId}`
            );

            await jsonPlaceholder.delete(`/posts/${args.postId}`);

            return deletedPost.data;
        } catch (err) {
            console.log(err);
            throw new Error(err);
        }
    },
};
