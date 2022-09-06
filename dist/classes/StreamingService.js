import { Series } from "./Other.js";
export default class StreamingServices {
    constructor(shows) {
        this._shows = shows;
        this._viewsByShowNames = new Map([]);
    }
    getShow(name) {
        const show = this._checkShowName(name);
        if (name.trim() === '')
            throw Error(`Empty name`);
        if (!show)
            throw Error(`Name ${name} not found`);
        return show;
    }
    _checkShowName(name) {
        const showName = name.trim().toLowerCase();
        if (showName.trim() === '')
            return false;
        const foundedShows = this._shows.filter((show) => {
            if (show.name.toLowerCase() === showName)
                return true;
            if (show instanceof Series) {
                try {
                    show.getEpisode(showName);
                    return true;
                }
                catch (_a) {
                    return false;
                }
            }
            return false;
        });
        return foundedShows.length === 1 ? foundedShows[0] : false;
    }
    watch(name) {
        const show = this.getShow(name);
        const shownTimes = this._viewsByShowNames.get(show.name) || 0;
        this._viewsByShowNames.set(show.name, shownTimes + 1);
    }
    addShow(show) {
        const foundItems = this._shows.filter((item) => item.name.toLowerCase() === show.name);
        if (foundItems.length > 0)
            throw Error(`Show with name ${show.name} already exists`);
        this._shows.push(show);
    }
    _getMostViedShows(filterFunc, count = 10) {
        if (this._shows.length === 0)
            return [];
        const map = this._viewsByShowNames;
        return this._shows
            .filter(filterFunc)
            .sort((a, b) => map.get(b.name) - map.get(a.name))
            .slice(0, count);
    }
    getMostViewedShowsOfYear(year) {
        return this._getMostViedShows((show) => show.releaseDate.getFullYear() === year);
    }
    getMostViewedShowsOfGenre(genre) {
        const genreName = genre.trim().toLowerCase();
        return this._getMostViedShows((show) => show.genre === genreName);
    }
}
