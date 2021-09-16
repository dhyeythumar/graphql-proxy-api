import axios from "axios";

// Creating an instance of axios containing a URL so whenever there is a need to change the url it whould be this place only
export const jsonPlaceholder = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com/",
});
