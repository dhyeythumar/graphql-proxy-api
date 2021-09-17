import { jsonPlaceholder } from "../base-axios";

//* fetch all Posts
export const fetchPosts = async () => {
    try {
        const posts = await jsonPlaceholder.get(`/posts`);
        return posts.data;
    } catch (err) {
        console.log(err);
        throw new Error(err);
    }
};

//* fetch a single Post
export const fetchPost = async (postId) => {
    try {
        const post = await jsonPlaceholder.get(`/posts/${postId}`);
        return post.data;
    } catch (err) {
        console.log(err);
        throw new Error(err);
    }
};

//* fetch Post's all Comments
//! returns [] if no data
export const fetchPostComments = async (postId) => {
    try {
        const comments = await jsonPlaceholder.get(`/posts/${postId}/comments`);
        return comments.data;
    } catch (err) {
        console.log(err);
        throw new Error(err);
    }
};
