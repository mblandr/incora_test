import { getGenres } from './genres.js';

abstract class Show {
	constructor(name: string, genre: string, releaseDate: Date) {		
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

	private _name: string;
	public get name(): string {
		return this._name;
	}

	private _genre: string;
	public get genre(): string {
		return this._genre;
	}

	private _releaseDate: Date;
	public get releaseDate(): Date {
		return this._releaseDate;
	}

	public abstract getDuration(): number;
}

export default Show;