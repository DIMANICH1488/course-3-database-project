export class MySuccessItems extends Error {
	constructor({
		items,
		total,
		version,
	}) {
		super();
		Object.defineProperties(this, {
			items: { get: () => items, },
			total: { get: () => total, },
			version: { get: () => version, },
		});
		Object.freeze(this);
	}
}