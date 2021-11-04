import { jsonPlaceholder } from "../utils/base-axios.js";

export default class PhotoModule {
    //* create a Photo
    static async createPhoto(args) {
        try {
            const newPhoto = await jsonPlaceholder.post(
                "/photos",
                {
                    albumId: args.albumId,
                    title: args.title,
                    url: args.url,
                    thumbnailUrl: args.thumbnailUrl,
                },
                {
                    "Content-type": "application/json; charset=UTF-8",
                }
            );
            return newPhoto.data;
        } catch (err) {
            console.log(err.message);
            throw new Error(err.message);
        }
    }

    //* update an existing Photo
    static async updatePhoto(args) {
        try {
            const photo = await this.fetchPhoto(args.photoId);
            if (args.title) photo.title = args.title;
            if (args.url) photo.url = args.url;
            if (args.thumbnailUrl) photo.thumbnailUrl = args.thumbnailUrl;

            const updatedPhoto = await jsonPlaceholder.put(
                `/photos/${args.photoId}`,
                photo,
                {
                    "Content-type": "application/json; charset=UTF-8",
                }
            );
            return updatedPhoto.data;
        } catch (err) {
            console.log(err.message);
            throw new Error(err.message);
        }
    }

    //* delete an existing Photo
    static async deletePhoto(args) {
        //! doesn't make sense to call this
        // await jsonPlaceholder.delete(`/photos/${args.photoId}`);
        return await this.fetchPhoto(args.photoId);
    }

    //* fetch Photos
    static async fetchPhotos() {
        try {
            const photos = await jsonPlaceholder.get(`/photos`);
            return photos.data;
        } catch (err) {
            console.log(err.message);
            throw new Error(err.message);
        }
    }

    //* fetch a Photo
    static async fetchPhoto(photoId) {
        try {
            const photo = await jsonPlaceholder.get(`/photos/${photoId}`);
            return photo.data;
        } catch (err) {
            console.log(err.message);
            throw new Error(err.message);
        }
    }
}
