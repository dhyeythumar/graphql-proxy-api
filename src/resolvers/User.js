import { sort } from "../utils/common.js";
import User from "../lib/UserModule.js";

// 'parent' parameter carries the return value of the previous resolver execution level
export default {
    posts: async (parent, args) => {
        try {
            const posts = await User.fetchUserPosts(parent.id);
            return sort(posts, "asc");
        } catch (err) {
            console.log(err.message);
            throw new Error(err.message);
        }
    },
    albums: async (parent, args) => {
        try {
            const albums = await User.fetchUserAlbums(parent.id);
            return sort(albums, "asc");
        } catch (err) {
            console.log(err.message);
            throw new Error(err.message);
        }
    },
    todos: async (parent, args) => {
        try {
            const todos = await User.fetchUserTodos(parent.id);
            return sort(todos, "asc");
        } catch (err) {
            console.log(err.message);
            throw new Error(err.message);
        }
    },
};
