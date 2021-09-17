import { sort } from "../utils/common";
import { fetchUserPosts, fetchUserAlbums } from "../utils/fetchUserData";

export default {
    posts: async (parent, args, context) => {
        try {
            const posts = await fetchUserPosts(parent.id);
            return sort(posts, "asc");
        } catch (err) {
            console.log(err.message);
            throw new Error(err.message);
        }
    },
    albums: async (parent, args, context) => {
        try {
            const albums = await fetchUserAlbums(parent.id);
            return sort(albums, "asc");
        } catch (err) {
            console.log(err.message);
            throw new Error(err.message);
        }
    },
};
