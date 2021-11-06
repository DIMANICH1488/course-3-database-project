import { MyError, } from './MyError';

export class MyErrorApiValidate extends MyError {
	constructor({
		..._
	}) {
		super(_);
		Object.freeze(this);
	}
}