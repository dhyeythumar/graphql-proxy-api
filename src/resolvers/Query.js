import User from "../lib/UserModule";
import Post from "../lib/PostModule";
import Comment from "../lib/CommentModule";
import Album from "../lib/AlbumModule";
import { sort } from "../utils/common";

export default {
    info: () => `A simple fake GraphQL API server`,
    users: async (_, args) => {
        try {
            let users = await User.fetchUsers();
            return sort(users, args.sort ? args.sort : "asc");
        } catch (err) {
            console.log(err.message);
            throw new Error(err.message);
        }
    },
    user: async (_, args) => {
        try {
            const user = await User.fetchUser(args.userId);
            return user;
        } catch (err) {
            console.log(err.message);
            throw new Error(err.message);
        }
    },
    posts: async (_, args) => {
        try {
            let posts;
            if (args.userId) posts = await User.fetchUserPosts(args.userId);
            else posts = await Post.fetchPosts();

            return sort(posts, args.sort ? args.sort : "asc");
        } catch (err) {
            console.log(err.message);
            throw new Error(err.message);
        }
    },
    post: async (_, args) => {
        try {
            const post = await Post.fetchPost(args.postId);
            return post;
        } catch (err) {
            console.log(err.message);
            throw new Error(err.message);
        }
    },
    comments: async (_, args) => {
        try {
            let comments;
            if (args.postId)
                comments = await Post.fetchPostComments(args.postId);
            else comments = await Comment.fetchComments();

            return sort(comments, args.sort ? args.sort : "asc");
        } catch (err) {
            console.log(err.message);
            throw new Error(err.message);
        }
    },
    comment: async (_, args) => {
        try {
            const comment = await Comment.fetchComment(args.commentId);
            return comment;
        } catch (err) {
            console.log(err.message);
            throw new Error(err.message);
        }
    },
    albums: async (_, args) => {
        try {
            let albums;
            if (args.userId) albums = await User.fetchUserAlbums(args.userId);
            else albums = await Album.fetchAlbums();

            return sort(albums, args.sort ? args.sort : "asc");
        } catch (err) {
            console.log(err.message);
            throw new Error(err.message);
        }
    },
    album: async (_, args) => {
        try {
            const album = await Album.fetchAlbum(args.albumId);
            return album;
        } catch (err) {
            console.log(err.message);
            throw new Error(err.message);
        }
    },
    photos: async (_, args) => {
        try {
            let photos;
            if (args.albumId)
                photos = await Album.fetchAlbumPhotos(args.albumId);
            else photos = await Photo.fetchPhotos();

            return sort(photos, args.sort ? args.sort : "asc");
        } catch (err) {
            console.log(err.message);
            throw new Error(err.message);
        }
    },
    photo: async (_, args) => {
        try {
            const photo = await Photo.fetchPhoto(args.photoId);
            return photo;
        } catch (err) {
            console.log(err.message);
            throw new Error(err.message);
        }
    },
};
