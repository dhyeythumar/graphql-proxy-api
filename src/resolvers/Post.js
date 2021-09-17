import { sort } from "../utils/common";
import { fetchPostComments } from "../utils/fetchPostData";

export default {
    postId: (parent, args, context) => {
        return parent.id;
    },
    comments: async (parent, args, context) => {
        const comments = await fetchPostComments(parent.id);
        return sort(comments, "asc");
    },
};
