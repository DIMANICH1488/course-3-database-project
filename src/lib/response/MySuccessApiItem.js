export class MySuccessApiItem extends Error {
	constructor({
		item,
		version,
	}) {
		super();
		Object.defineProperties(this, {
			item: { get: () => item, },
			version: { get: () => version, },
		});
		Object.freeze(this);
	}
}