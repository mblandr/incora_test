import Show from "./Show.js";
import StreamingService from "./StreamingService.js";

class Subscription {
	private _streamingService: StreamingService;

	constructor(service: StreamingService) {
		this._streamingService = service;
	}

	public get streamingService() {
		return this._streamingService;
	}

	watch(name: string): void | never {
		this._streamingService.watch(name);
	}

	private _getRecommendation(recommendFunction: () => Show[]): Show | void {
		const items = recommendFunction();
		if (items.length === 0)
			return;

		items.sort(
			(a: Show, b: Show): number => b.getDuration() - a.getDuration()
		);

		const index = Math.floor(items.length * Math.random());
		return items[index];

	}

	getRecommendationTrending(): Show | void {
		return this._getRecommendation(
			() => {
				const year = new Date().getFullYear();
				return this._streamingService.getMostViewedShowsOfYear(year);
			}
		);
	}

	getRecommendationByGenre(genre: string): Show | void {
		const genreName = genre.trim().toLowerCase();
		return this._getRecommendation(
			() => this._streamingService.getMostViewedShowsOfGenre(genreName)
		);
	}
}

export default Subscription;