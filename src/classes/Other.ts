import Show from "./Show.js";

export class Movie extends Show {

	constructor(name: string, genre: string, releaseDate: Date, duration: number) {
		if (duration <= 0)
			throw Error('Wrong duration')
		super(name, genre, releaseDate)
		this._duration = duration
	}

	private _duration: number;

	public getDuration(): number {
		return this._duration
	}
}

export class Episode extends Movie {

}

export class Series extends Movie {
	private _episodes: Episode[];
	constructor(name: string, genre: string, releaseDate: Date, duration: number) {
		super(name, genre, releaseDate, duration);
		this._episodes = [];
	}

	public addEpisode(episode: Episode): void {
		this._episodes.push(episode);
	}

	public getEpisode(name: string): Episode | never {
		if (this._episodes.length === 0)
			throw Error('No episodes yet');

		const episodeName = name.trim().toLowerCase();
		const items = this._episodes.filter(
			(episode: Episode): boolean => episode.name.toLowerCase() === episodeName
		);
		if (items.length !== 1)
			throw Error(`Wrong episode name ${name}`);
		return items[0];
	}

	public insertEpisode(episode: Episode, index: number): void {
		if (index <= 0 || index >= this._episodes.length || index % 1 !== 0)
			throw Error('Wrong episode index');
		this._episodes.splice(index, 0, episode);
	}

	public getDuration(): number {
		return this._episodes.reduce(
			(total: number, episode: Episode) => total + episode.getDuration(),
			0
		)
	}

}