import { jsonPlaceholder } from "../base-axios";

//* fetch all Users
export const fetchUsers = async () => {
    try {
        const users = await jsonPlaceholder.get(`/users`);
        return users.data;
    } catch (err) {
        console.log(err.message);
        throw new Error(err.message);
    }
};

//* fetch a single User
export const fetchUser = async (userId) => {
    try {
        const user = await jsonPlaceholder.get(`/users/${userId}`);
        return user.data;
    } catch (err) {
        console.log(err.message);
        throw new Error(err.message);
    }
};

//* fetch User's Posts
//! returns [] if no data
export const fetchUserPosts = async (userId) => {
    try {
        const posts = await jsonPlaceholder.get(`/users/${userId}/posts`);
        return posts.data;
    } catch (err) {
        console.log(err.message);
        throw new Error(err.message);
    }
};

//* fetch User's Albums
//! returns [] if no data
export const fetchUserAlbums = async (userId) => {
    try {
        const albums = await jsonPlaceholder.get(`/users/${userId}/albums`);
        return albums.data;
    } catch (err) {
        console.log(err.message);
        throw new Error(err.message);
    }
};
