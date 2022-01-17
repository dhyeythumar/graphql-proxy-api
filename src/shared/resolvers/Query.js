import User from "../lib/UserModule.js";
import Post from "../lib/PostModule.js";
import Comment from "../lib/CommentModule.js";
import Album from "../lib/AlbumModule.js";
import Photo from "../lib/PhotoModule.js";
import Todo from "../lib/TodoModule.js";
import { sort } from "../utils.js";

export default {
    info: () => `Simple GraphQL Proxy API for testing and prototyping`,
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
    todos: async (_, args) => {
        try {
            let todos;
            if (args.userId) todos = await User.fetchUserTodos(args.userId);
            else todos = await Todo.fetchTodos();

            return sort(todos, args.sort ? args.sort : "asc");
        } catch (err) {
            console.log(err.message);
            throw new Error(err.message);
        }
    },
    todo: async (_, args) => {
        try {
            const todo = await Todo.fetchTodo(args.todoId);
            return todo;
        } catch (err) {
            console.log(err.message);
            throw new Error(err.message);
        }
    },
};
