import User from "../lib/UserModule";
import Post from "../lib/PostModule";
import Comment from "../lib/CommentModule";
import Album from "../lib/AlbumModule";

export default {
    createUser: async (_, args) => await User.createUser(args.input),
    updateUser: async (_, args) => await User.updateUser(args),
    deleteUser: async (_, args) => await User.deleteUser(args),
    createPost: async (_, args) => await Post.createPost(args),
    updatePost: async (_, args) => await Post.updatePost(args),
    deletePost: async (_, args) => await Post.deletePost(args),
    createComment: async (_, args) => await Comment.createComment(args),
    updateComment: async (_, args) => await Comment.updateComment(args),
    deleteComment: async (_, args) => await Comment.deleteComment(args),
    createAlbum: async (_, args) => await Album.createAlbum(args),
    updateAlbum: async (_, args) => await Album.updateAlbum(args),
    deleteAlbum: async (_, args) => await Album.deleteAlbum(args),
};
