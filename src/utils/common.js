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
