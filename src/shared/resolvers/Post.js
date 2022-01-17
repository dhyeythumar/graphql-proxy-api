import { sort } from "../utils.js";
import Post from "../lib/PostModule.js";

export default {
    postId: (parent, args) => {
        return parent.id;
    },
    comments: async (parent, args) => {
        const comments = await Post.fetchPostComments(parent.id);
        return sort(comments, "asc");
    },
};
