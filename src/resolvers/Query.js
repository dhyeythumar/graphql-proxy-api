import { sort } from "../utils/common";
import { fetchUsers, fetchUser, fetchUserPosts } from "../utils/fetchUserData";
import {
    fetchPosts,
    fetchPost,
    fetchPostComments,
} from "../utils/fetchPostData";
import { fetchComments, fetchComment } from "../utils/fetchCommentData";

// 'parent' parameter carries the return value of the previous resolver execution level
export default {
    info: () => `A simple fake GraphQL API server`,
    users: async (parent, args, context) => {
        try {
            let users = await fetchUsers();

            return sort(users, args.sort ? args.sort : "asc");
        } catch (err) {
            console.log(err.message);
            throw new Error(err.message);
        }
    },
    user: async (parent, args, context) => {
        try {
            const user = await fetchUser(args.userId);
            return user;
        } catch (err) {
            console.log(err.message);
            throw new Error(err.message);
        }
    },
    posts: async (parent, args, context) => {
        try {
            let posts;
            if (args.userId) posts = await fetchUserPosts(args.userId);
            else posts = await fetchPosts();

            return sort(posts, args.sort ? args.sort : "asc");
        } catch (err) {
            console.log(err.message);
            throw new Error(err.message);
        }
    },
    post: async (parent, args, context) => {
        try {
            const post = await fetchPost(args.postId);
            return post;
        } catch (err) {
            console.log(err.message);
            throw new Error(err.message);
        }
    },
    comments: async (parent, args, context) => {
        try {
            let comments;
            if (args.postId) comments = await fetchPostComments(args.postId);
            else comments = await fetchComments();

            return sort(comments, args.sort ? args.sort : "asc");
        } catch (err) {
            console.log(err.message);
            throw new Error(err.message);
        }
    },
    comment: async (parent, args, context) => {
        try {
            const comment = await fetchComment(args.commentId);
            return comment;
        } catch (err) {
            console.log(err.message);
            throw new Error(err.message);
        }
    },
};
