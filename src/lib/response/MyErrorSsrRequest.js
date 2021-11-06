import { MyError, } from './MyError';

export class MyErrorSsrRequest extends MyError {
	constructor({
		status=404,
		..._
	}) {
		super(_);
		Object.defineProperties(this, {
			status: { get: () => status, },
		});
		Object.freeze(this);
	}
}