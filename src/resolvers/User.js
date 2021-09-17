import { fetchUserPosts } from "../utils/fetchPostData";

export default {
    posts: async (parent, args, context) => {
        try {
            return await fetchUserPosts(parent.id);
        } catch (err) {
            console.log(err);
            throw new Error(err);
        }
    },
};
