import { MyError, } from './MyError';

export class MyErrorApiRequest extends MyError {
	constructor({
		..._
	}) {
		super(_);
		Object.freeze(this);
	}
}