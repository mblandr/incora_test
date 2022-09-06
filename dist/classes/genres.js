export const genres = {
    names: ['horror', 'fantasy', 'history', 'triller', 'drama']
};
export const getGenres = () => {
    return genres.names;
};
export const addGenre = (name) => {
    const genreName = name.trim().toLowerCase();
    if (genres.names.includes(genreName))
        throw Error(`Genre ${genreName} already exists`);
    genres.names.push(genreName);
};
