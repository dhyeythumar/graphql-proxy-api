import { sort } from "../utils/common";
import {
    fetchUsers,
    fetchUser,
    fetchUserPosts,
    fetchUserAlbums,
} from "../utils/fetchUserData";
import {
    fetchPosts,
    fetchPost,
    fetchPostComments,
} from "../utils/fetchPostData";
import { fetchComments, fetchComment } from "../utils/fetchCommentData";
import { fetchAlbums, fetchAlbum } from "../utils/fetchAlbumData";

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
    albums: async (parent, args) => {
        try {
            let albums;
            if (args.userId) albums = await fetchUserAlbums(args.userId);
            else albums = await fetchAlbums();

            return sort(albums, args.sort ? args.sort : "asc");
        } catch (err) {
            console.log(err.message);
            throw new Error(err.message);
        }
    },
    album: async (parent, args) => {
        try {
            const album = await fetchAlbum(args.albumId);
            return album;
        } catch (err) {
            console.log(err.message);
            throw new Error(err.message);
        }
    },
};
