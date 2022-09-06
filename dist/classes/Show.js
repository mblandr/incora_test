import { getGenres } from './genres.js';
class Show {
    constructor(name, genre, releaseDate) {
        const showName = name.trim();
        if (showName === '')
            throw Error('Empty name');
        const genreName = genre.trim().toLowerCase();
        if (!getGenres().includes(genreName))
            throw Error(`Genre ${genreName} not founds`);
        this._name = showName;
        this._genre = genreName;
        this._releaseDate = releaseDate;
    }
    get name() {
        return this._name;
    }
    get genre() {
        return this._genre;
    }
    get releaseDate() {
        return this._releaseDate;
    }
}
export default Show;
