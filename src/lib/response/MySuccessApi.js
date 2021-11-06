export class MySuccessApi extends Error {
	constructor({
		...data
	}) {
		super();
		Object.defineProperties(this, {
			data: { get: () => data, },
		});
		Object.freeze(this);
	}
}