import { body, param, query, oneOf, checkSchema, validationResult, } from 'express-validator';
import { MyErrorApiValidate, } from './response/MyErrorApiValidate';

export {
	body,
	param,
	query,
	checkSchema,
	validationResult,
};

export function validate (req, res, next) {
	const result = validationResult(req);
	if (!result.isEmpty()) {
		throw new MyErrorApiValidate({ errors: result.array(), });
	}
	next();
}

export const bodyInt = (key, min = 0) => body(key).custom(value => {
	return Number.isInteger(value) && value >= min
		? Promise.resolve()
		: Promise.reject(`${ key } expected as integer: ${ min }+`);
});

export const bodyIn = (key, scope = []) => body(key).custom(value => {
	return scope.includes(value)
		? Promise.resolve()
		: Promise.reject(`${ key } expected as integer in [${ scope }]`);
});

export const paramInt = (key, min = 0) => param(key).custom(value => {
	return Number.isInteger(+value) && +value >= min
		? Promise.resolve()
		: Promise.reject(`${ key } expected as integer: ${ min }+`);
});

export const paramIn = (key, scope = []) => param(key).custom(value => {
	return Number.isInteger(+value) && scope.includes(+value)
		? Promise.resolve()
		: Promise.reject(`${ key } expected as integer in [${ scope }]`);
});

export const queryInt = (key, min = 0) => query(key).custom(value => {
	return Number.isInteger(+value) && +value >= min
		? Promise.resolve()
		: Promise.reject(`${ key } expected as integer: ${ min }+`);
});

export const queryIn = (key, scope = []) => query(key).custom(value => {
	return Number.isInteger(+value) && scope.includes(+value)
		? Promise.resolve()
		: Promise.reject(`${ key } expected as integer in [${ scope }]`);
});

export const querySkip = queryInt('skip', 0);
export const queryTake = queryInt('take', 1);
export const queryWithDriver = queryIn('withDriver', [0, 1]);
export const queryWithOrder = queryIn('withOrder', [0, 1]);
export const queryWithFeedback = queryIn('withFeedback', [0, 1]);

