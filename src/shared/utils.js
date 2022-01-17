import axios from "axios";

//* Creating an instance of axios containing a URL so whenever there is a need to change the url it whould be this place only
export const jsonPlaceholder = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com/",
});

//* ip: array, sortType: "desc" | "asc"
export const sort = (ip, sortType) => {
    if (sortType.toString() == "desc")
        ip.sort((a, b) => {
            return b.id - a.id;
        });
    else
        ip.sort((a, b) => {
            return a.id - b.id;
        });

    return ip;
};
