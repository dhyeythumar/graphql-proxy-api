import { sort } from "../utils/common";
import Album from "../lib/AlbumModule";

export default {
    albumId: (parent, args) => {
        return parent.id;
    },
    photos: async (parent, args) => {
        const photos = await Album.fetchAlbumPhotos(parent.id);
        return sort(photos, "asc");
    },
};
