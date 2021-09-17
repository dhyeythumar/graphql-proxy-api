import { sort } from "../utils/common";
import Post from "../lib/PostModule";

export default {
    postId: (parent, args) => {
        return parent.id;
    },
    comments: async (parent, args) => {
        const comments = await Post.fetchPostComments(parent.id);
        return sort(comments, "asc");
    },
};
