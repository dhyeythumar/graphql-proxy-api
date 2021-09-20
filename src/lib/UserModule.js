import { jsonPlaceholder } from "../utils/base-axios";

export default class UserModule {
    //* create a User
    static async createUser(args) {
        try {
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
            console.log(err.message);
            throw new Error(err.message);
        }
    }

    //* update a User
    static async updateUser(args) {
        try {
            const oldUser = await this.fetchUser(args.userId);

            // merge new user data to old
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
            console.log(err.message);
            throw new Error(err.message);
        }
    }

    //* delete a User
    static async deleteUser(args) {
        //! doesn't make sense to call this
        // await jsonPlaceholder.delete(`/users/${args.userId}`);
        return await this.fetchUser(args.userId);
    }

    //* fetch Users
    static async fetchUsers() {
        try {
            const users = await jsonPlaceholder.get(`/users`);
            return users.data;
        } catch (err) {
            console.log(err.message);
            throw new Error(err.message);
        }
    }

    //* fetch a User
    static async fetchUser(userId) {
        try {
            const user = await jsonPlaceholder.get(`/users/${userId}`);
            return user.data;
        } catch (err) {
            console.log(err.message);
            throw new Error(err.message);
        }
    }

    //* fetch User's Posts
    //! returns [] if no data
    static async fetchUserPosts(userId) {
        try {
            const posts = await jsonPlaceholder.get(`/users/${userId}/posts`);
            return posts.data;
        } catch (err) {
            console.log(err.message);
            throw new Error(err.message);
        }
    }

    //* fetch User's Albums
    //! returns [] if no data
    static async fetchUserAlbums(userId) {
        try {
            const albums = await jsonPlaceholder.get(`/users/${userId}/albums`);
            return albums.data;
        } catch (err) {
            console.log(err.message);
            throw new Error(err.message);
        }
    }

    //* fetch User's Todos
    //! returns [] if no data
    static async fetchUserTodos(userId) {
        try {
            const todos = await jsonPlaceholder.get(`/users/${userId}/todos`);
            return todos.data;
        } catch (err) {
            console.log(err.message);
            throw new Error(err.message);
        }
    }
}
