import { jsonPlaceholder } from "../utils/base-axios";

export default class AlbumModule {
    //* create an Album
    static async createAlbum(args) {
        try {
            const newAlbum = await jsonPlaceholder.post(
                "/albums",
                {
                    userId: args.userId,
                    title: args.title,
                },
                {
                    "Content-type": "application/json; charset=UTF-8",
                }
            );
            return newAlbum.data;
        } catch (err) {
            console.log(err.message);
            throw new Error(err.message);
        }
    }

    //* update an existing Album
    static async updateAlbum(args) {
        try {
            const album = await this.fetchAlbum(args.albumId);
            if (args.title) album.title = args.title;

            const updatedAlbum = await jsonPlaceholder.put(
                `/albums/${args.albumId}`,
                album,
                {
                    "Content-type": "application/json; charset=UTF-8",
                }
            );
            return updatedAlbum.data;
        } catch (err) {
            console.log(err.message);
            throw new Error(err.message);
        }
    }

    //* delete an existing Album
    static async deleteAlbum(args) {
        //! doesn't make sense to call this
        // await jsonPlaceholder.delete(`/albums/${args.albumId}`);
        return await this.fetchAlbum(args.albumId);
    }

    //* fetch Albums
    static async fetchAlbums() {
        try {
            const albums = await jsonPlaceholder.get(`/albums`);
            return albums.data;
        } catch (err) {
            console.log(err.message);
            throw new Error(err.message);
        }
    }

    //* fetch an Album
    static async fetchAlbum(albumId) {
        try {
            const album = await jsonPlaceholder.get(`/albums/${albumId}`);
            return album.data;
        } catch (err) {
            console.log(err.message);
            throw new Error(err.message);
        }
    }

    //* fetch Album's Photos
    //! returns [] if no data
    static async fetchAlbumPhotos(albumId) {
        try {
            const photos = await jsonPlaceholder.get(
                `/albums/${albumId}/photos`
            );
            return photos.data;
        } catch (err) {
            console.log(err.message);
            throw new Error(err.message);
        }
    }
}
