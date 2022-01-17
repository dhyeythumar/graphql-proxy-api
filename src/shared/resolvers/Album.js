import { sort } from "../utils.js";
import Album from "../lib/AlbumModule.js";

export default {
    albumId: (parent, args) => {
        return parent.id;
    },
    photos: async (parent, args) => {
        const photos = await Album.fetchAlbumPhotos(parent.id);
        return sort(photos, "asc");
    },
};
