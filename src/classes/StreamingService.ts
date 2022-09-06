import { Series } from "./Other.js";
import Show from "./Show.js";

export default class StreamingServices {
	private _shows: Show[];
	private _viewsByShowNames: Map<string, number>;

	constructor(shows: Show[]) {
		this._shows = shows;
		this._viewsByShowNames = new Map<string, number>([]);
	}


	public getShow(name: string): Show | never {
		const show = this._checkShowName(name);
		if (name.trim() === '')
			throw Error(`Empty name`);
		if (!show)
			throw Error(`Name ${name} not found`);
		return show;
	}

	private _checkShowName(name: string): Show | false {
		const showName = name.trim().toLowerCase();
		if (showName.trim() === '')
			return false
		const foundedShows = this._shows.filter(
			(show: Show): boolean => {
				if (show.name.toLowerCase() === showName) return true;
				if (show instanceof Series) {
					try {
						show.getEpisode(showName);
						return true;
					}
					catch { return false; }
				}
				return false;
			}
		);
		return foundedShows.length === 1 ? foundedShows[0] : false;
	}

	public watch(name: string): void | never {
		const show = this.getShow(name);
		const shownTimes = this._viewsByShowNames.get(show.name) || 0;
		this._viewsByShowNames.set(show.name, shownTimes + 1);

	}

	public addShow(show: Show): void | never {
		const foundItems: Show[] = this._shows.filter(
			(item: Show) => item.name.toLowerCase() === show.name
		);
		if (foundItems.length > 0)
			throw Error(`Show with name ${show.name} already exists`);
		this._shows.push(show);
	}

	private _getMostViedShows(filterFunc: (show: Show) => boolean, count = 10): Show[] {

		if (this._shows.length === 0)
			return [];

		const map = this._viewsByShowNames;
		return this._shows
			.filter(filterFunc)
			.sort(
				(a: Show, b: Show): number => map.get(b.name) - map.get(a.name)
			)
			.slice(0, count);
	}

	public getMostViewedShowsOfYear(year: number): Show[] {
		return this._getMostViedShows(
			(show: Show): boolean => show.releaseDate.getFullYear() === year
		);
	}

	public getMostViewedShowsOfGenre(genre: string): Show[] {
		const genreName = genre.trim().toLowerCase();
		return this._getMostViedShows(
			(show: Show): boolean => show.genre === genreName
		);
	}
}