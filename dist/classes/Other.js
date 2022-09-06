import Show from "./Show.js";
export class Movie extends Show {
    constructor(name, genre, releaseDate, duration) {
        if (duration <= 0)
            throw Error('Wrong duration');
        super(name, genre, releaseDate);
        this._duration = duration;
    }
    getDuration() {
        return this._duration;
    }
}
export class Episode extends Movie {
}
export class Series extends Movie {
    constructor(name, genre, releaseDate, duration) {
        super(name, genre, releaseDate, duration);
        this._episodes = [];
    }
    addEpisode(episode) {
        this._episodes.push(episode);
    }
    getEpisode(name) {
        if (this._episodes.length === 0)
            throw Error('No episodes yet');
        const episodeName = name.trim().toLowerCase();
        const items = this._episodes.filter((episode) => episode.name.toLowerCase() === episodeName);
        if (items.length !== 1)
            throw Error(`Wrong episode name ${name}`);
        return items[0];
    }
    insertEpisode(episode, index) {
        if (index <= 0 || index >= this._episodes.length || index % 1 !== 0)
            throw Error('Wrong episode index');
        this._episodes.splice(index, 0, episode);
    }
    getDuration() {
        return this._episodes.reduce((total, episode) => total + episode.getDuration(), 0);
    }
}
