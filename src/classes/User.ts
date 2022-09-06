import Subscription from "./Subscription.js";
import StreamingService from "./StreamingService.js";

export default class User {
	private _subscriptions: Subscription[];
	public get subscriptions() {
		return this._subscriptions;
	}

	constructor() {
		this._subscriptions = [];
	}

	public subscribe(streamingService: StreamingService): Subscription | never {
		const items = this._subscriptions.filter(
			(subscription: Subscription): boolean => subscription.streamingService === streamingService
		);
		if (items.length > 0)
			throw Error('User already subscribed!');

		const subscription = new Subscription(streamingService);
		this._subscriptions.push(subscription);
		return subscription;
	}
}