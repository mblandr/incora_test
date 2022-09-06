import Subscription from "./Subscription.js";
export default class User {
    constructor() {
        this._subscriptions = [];
    }
    get subscriptions() {
        return this._subscriptions;
    }
    subscribe(streamingService) {
        const items = this._subscriptions.filter((subscription) => subscription.streamingService === streamingService);
        if (items.length > 0)
            throw Error('User already subscribed!');
        const subscription = new Subscription(streamingService);
        this._subscriptions.push(subscription);
        return subscription;
    }
}
