import { jsonPlaceholder } from "../base-axios";

//* fetch Albums
export const fetchAlbums = async () => {
    try {
        const albums = await jsonPlaceholder.get(`/albums`);
        return albums.data;
    } catch (err) {
        console.log(err.message);
        throw new Error(err.message);
    }
};

//* fetch a single Album
export const fetchAlbum = async (albumId) => {
    try {
        const album = await jsonPlaceholder.get(`/albums/${albumId}`);
        return album.data;
    } catch (err) {
        console.log(err.message);
        throw new Error(err.message);
    }
};