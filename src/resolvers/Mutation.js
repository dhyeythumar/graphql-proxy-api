import User from "../lib/UserModule.js";
import Post from "../lib/PostModule.js";
import Comment from "../lib/CommentModule.js";
import Album from "../lib/AlbumModule.js";
import Photo from "../lib/PhotoModule.js";
import Todo from "../lib/TodoModule.js";

export default {
    // ---
    createUser: async (_, args) => await User.createUser(args.input),
    updateUser: async (_, args) => await User.updateUser(args),
    deleteUser: async (_, args) => await User.deleteUser(args),
    // ---
    createPost: async (_, args) => await Post.createPost(args),
    updatePost: async (_, args) => await Post.updatePost(args),
    deletePost: async (_, args) => await Post.deletePost(args),
    // ---
    createComment: async (_, args) => await Comment.createComment(args),
    updateComment: async (_, args) => await Comment.updateComment(args),
    deleteComment: async (_, args) => await Comment.deleteComment(args),
    // ---
    createAlbum: async (_, args) => await Album.createAlbum(args),
    updateAlbum: async (_, args) => await Album.updateAlbum(args),
    deleteAlbum: async (_, args) => await Album.deleteAlbum(args),
    // ---
    createPhoto: async (_, args) => await Photo.createPhoto(args),
    updatePhoto: async (_, args) => await Photo.updatePhoto(args),
    deletePhoto: async (_, args) => await Photo.deletePhoto(args),
    // ---
    createTodo: async (_, args) => await Todo.createTodo(args),
    updateTodo: async (_, args) => await Todo.updateTodo(args),
    deleteTodo: async (_, args) => await Todo.deleteTodo(args),
};
