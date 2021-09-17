import { sort } from "../utils/common";
import { fetchUsers, fetchUser } from "../utils/fetchUserData";
import { fetchPosts, fetchPost, fetchUserPosts } from "../utils/fetchPostData";

// 'parent' parameter carries the return value of the previous resolver execution level
export default {
    info: () => `A simple fake GraphQL API server`,
    users: async (parent, args, context) => {
        try {
            let users = await fetchUsers();

            return sort(users, args.sort ? args.sort : "asc");
        } catch (err) {
            console.log(err);
            throw new Error(err);
        }
    },
    user: async (parent, args, context) => {
        try {
            const user = await fetchUser(args.userId);
            return user;
        } catch (err) {
            console.log(err);
            throw new Error(err);
        }
    },
    posts: async (parent, args, context) => {
        try {
            let posts;
            if (args.userId) posts = await fetchUserPosts(args.userId);
            else posts = await fetchPosts();

            return sort(posts, args.sort ? args.sort : "asc");
        } catch (err) {
            console.log(err);
            throw new Error(err);
        }
    },
    post: async (parent, args, context) => {
        try {
            const post = await fetchPost(args.postId);
            return post;
        } catch (err) {
            console.log(err);
            throw new Error(err);
        }
    },
};
