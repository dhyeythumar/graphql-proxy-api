import { jsonPlaceholder } from "../utils/base-axios";

export default class CommentModule {
    //* create a Comment
    static async createComment(args) {
        try {
            const newComment = await jsonPlaceholder.post(
                "/comments",
                {
                    postId: args.postId,
                    name: args.name,
                    email: args.email,
                    body: args.body,
                },
                {
                    "Content-type": "application/json; charset=UTF-8",
                }
            );
            return newComment.data;
        } catch (err) {
            console.log(err.message);
            throw new Error(err.message);
        }
    }

    //* update a Comment
    static async updateComment(args) {
        try {
            const comment = await this.fetchComment(args.commentId);
            if (args.body) comment.body = args.body;

            const updatedPost = await jsonPlaceholder.put(
                `/comments/${args.commentId}`,
                comment,
                {
                    "Content-type": "application/json; charset=UTF-8",
                }
            );
            return updatedPost.data;
        } catch (err) {
            console.log(err.message);
            throw new Error(err.message);
        }
    }

    //* delete a Comment
    static async deleteComment(args) {
        //! doesn't make sense to call this
        // await jsonPlaceholder.delete(`/comments/${args.commentId}`);
        return await this.fetchComment(args.commentId);
    }

    //* fetch Comments
    static async fetchComments() {
        try {
            const comments = await jsonPlaceholder.get(`/comments`);
            return comments.data;
        } catch (err) {
            console.log(err.message);
            throw new Error(err.message);
        }
    }

    //* fetch a Comment
    static async fetchComment(commentId) {
        try {
            const comment = await jsonPlaceholder.get(`/comments/${commentId}`);
            return comment.data;
        } catch (err) {
            console.log(err.message);
            throw new Error(err.message);
        }
    }
}
