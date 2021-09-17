import { jsonPlaceholder } from "../base-axios";

//* fetch all Users
export const fetchUsers = async () => {
    try {
        const users = await jsonPlaceholder.get(`/users`);
        return users.data;
    } catch (err) {
        console.log(err);
        throw new Error(err);
    }
};

//* fetch a single User
export const fetchUser = async (userId) => {
    try {
        const user = await jsonPlaceholder.get(`/users/${userId}`);
        return user.data;
    } catch (err) {
        console.log(err);
        throw new Error(err);
    }
};

//* fetch User's all Posts
//! returns [] if no data
export const fetchUserPosts = async (userId) => {
    try {
        const posts = await jsonPlaceholder.get(`/users/${userId}/posts`);
        return posts.data;
    } catch (err) {
        console.log(err);
        throw new Error(err);
    }
};
