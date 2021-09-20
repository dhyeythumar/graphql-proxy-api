import { jsonPlaceholder } from "../utils/base-axios";

export default class PostModule {
    //* create a Post
    static async createPost(args) {
        try {
            const newPost = await jsonPlaceholder.post(
                "/posts",
                {
                    userId: args.userId,
                    title: args.title,
                    body: args.body,
                },
                {
                    "Content-type": "application/json; charset=UTF-8",
                }
            );
            return newPost.data;
        } catch (err) {
            console.log(err.message);
            throw new Error(err.message);
        }
    }

    //* update an existing Post
    static async updatePost(args) {
        try {
            const post = await this.fetchPost(args.postId);

            if (args.title) post.title = args.title;
            if (args.body) post.body = args.body;

            const updatedPost = await jsonPlaceholder.put(
                `/posts/${args.postId}`,
                post,
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

    //* delete an existing Post
    static async deletePost(args) {
        //! doesn't make sense to call this
        // await jsonPlaceholder.delete(`/posts/${args.postId}`);
        return await this.fetchPost(args.postId);
    }

    //* fetch Posts
    static async fetchPosts() {
        try {
            const posts = await jsonPlaceholder.get(`/posts`);
            return posts.data;
        } catch (err) {
            console.log(err.message);
            throw new Error(err.message);
        }
    }

    //* fetch a Post
    static async fetchPost(postId) {
        try {
            const post = await jsonPlaceholder.get(`/posts/${postId}`);
            return post.data;
        } catch (err) {
            console.log(err.message);
            throw new Error(err.message);
        }
    }

    //* fetch Post's Comments
    //! returns [] if no data
    static async fetchPostComments(postId) {
        try {
            const comments = await jsonPlaceholder.get(
                `/posts/${postId}/comments`
            );
            return comments.data;
        } catch (err) {
            console.log(err.message);
            throw new Error(err.message);
        }
    }
}
