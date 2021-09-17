import { jsonPlaceholder } from "../base-axios";
import { fetchUser } from "../utils/fetchUserData";
import { fetchPost } from "../utils/fetchPostData";

export default {
    createUser: async (parent, args, context) => {
        try {
            args = args.input;
            const newUser = await jsonPlaceholder.post(
                "/users",
                {
                    name: args.name,
                    username: args.username,
                    email: args.email,
                    phone: args.phone,
                    website: args.website,
                    address: {
                        street: args.address?.street,
                        suite: args.address?.suite,
                        city: args.address?.city,
                        zipcode: args.address?.zipcode,
                        geo: {
                            lat: args.address?.geo?.lat,
                            lng: args.address?.geo?.lng,
                        },
                    },
                    company: {
                        name: args.company?.name,
                        catchPhrase: args.company?.catchPhrase,
                        bs: args.company?.bs,
                    },
                },
                {
                    "Content-type": "application/json; charset=UTF-8",
                }
            );
            return newUser.data;
        } catch (err) {
            console.log(err);
            throw new Error(err);
        }
    },
    updateUser: async (parent, args, context) => {
        try {
            const oldUser = await fetchUser(args.userId);

            // merger new user data to old one
            const user = Object.assign(oldUser, args.input);

            const updatedUser = await jsonPlaceholder.put(
                `/users/${args.userId}`,
                user,
                {
                    "Content-type": "application/json; charset=UTF-8",
                }
            );
            return updatedUser.data;
        } catch (err) {
            console.log(err);
            throw new Error(err);
        }
    },
    deleteUser: async (parent, args, context) => {
        try {
            const user = await fetchUser(args.userId);

            //! doesn't make sense to call this
            // await jsonPlaceholder.delete(`/users/${args.userId}`);

            return user;
        } catch (err) {
            console.log(err);
            throw new Error(err);
        }
    },
    createPost: async (parent, args, context) => {
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
            console.log(err);
            throw new Error(err);
        }
    },
    updatePost: async (parent, args, context) => {
        try {
            const post = await fetchPost(args.postId);

            if (args.title) post.title = args.title;
            if (args.body) post.body = args.body;

            const updatedPost = await jsonPlaceholder.put(
                `/posts/${args.postId}`,
                {
                    userId: post.userId,
                    title: post.title,
                    body: post.body,
                },
                {
                    "Content-type": "application/json; charset=UTF-8",
                }
            );
            return updatedPost.data;
        } catch (err) {
            console.log(err);
            throw new Error(err);
        }
    },
    deletePost: async (parent, args, context) => {
        try {
            const deletedPost = await fetchPost(args.postId);

            //! doesn't make sense to call this
            // await jsonPlaceholder.delete(`/posts/${args.postId}`);

            return deletedPost;
        } catch (err) {
            console.log(err.message);
            throw new Error(err.message);
        }
    },
    createComment: async (parent, args, context) => {
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
    },
    updateComment: async (parent, args, context) => {
        try {
            const comment = await fetchComment(args.commentId);
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
    },
    deleteComment: async (parent, args, context) => {
        try {
            const comment = await fetchComment(args.commentId);

            //! doesn't make sense to call this
            // await jsonPlaceholder.delete(`/comments/${args.commentId}`);

            return comment;
        } catch (err) {
            console.log(err.message);
            throw new Error(err.message);
        }
    },
};
