import { MyError, } from './MyError';

export class MyErrorApiAccess extends MyError {
	constructor({
		..._
	}) {
		super(_);
		Object.freeze(this);
	}
}