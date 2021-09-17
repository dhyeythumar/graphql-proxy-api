import { jsonPlaceholder } from "../base-axios";

//* fetch all Comments
export const fetchComments = async () => {
    try {
        const comments = await jsonPlaceholder.get(`/comments`);
        return comments.data;
    } catch (err) {
        console.log(err);
        throw new Error(err);
    }
};

//* fetch a single Comment
export const fetchComment = async (commentId) => {
    try {
        const comment = await jsonPlaceholder.get(`/comments/${commentId}`);
        return comment.data;
    } catch (err) {
        console.log(err);
        throw new Error(err);
    }
};