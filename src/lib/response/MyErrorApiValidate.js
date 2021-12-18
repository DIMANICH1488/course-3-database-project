import { MyError, } from './MyError';

export class MyErrorApiValidate extends MyError {
	constructor({
		errors = [],
		..._
	}) {
		super(_);
		Object.defineProperties(this, {
			errors: { get: () => [ ...errors, ], },
		});
		Object.freeze(this);
	}
}