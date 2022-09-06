class Subscription {
    constructor(service) {
        this._streamingService = service;
    }
    get streamingService() {
        return this._streamingService;
    }
    watch(name) {
        this._streamingService.watch(name);
    }
    _getRecommendation(recommendFunction) {
        const items = recommendFunction();
        if (items.length === 0)
            return;
        items.sort((a, b) => b.getDuration() - a.getDuration());
        const index = Math.floor(items.length * Math.random());
        return items[index];
    }
    getRecommendationTrending() {
        return this._getRecommendation(() => {
            const year = new Date().getFullYear();
            return this._streamingService.getMostViewedShowsOfYear(year);
        });
    }
    getRecommendationByGenre(genre) {
        const genreName = genre.trim().toLowerCase();
        return this._getRecommendation(() => this._streamingService.getMostViewedShowsOfGenre(genreName));
    }
}
export default Subscription;
