import { MyError, } from './MyError';

export class MyErrorApiAuth extends MyError {
	constructor({
		..._
	}) {
		super(_);
		Object.freeze(this);
	}
}