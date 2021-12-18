export class MyError extends Error {
	constructor({
		error,
		text,
	}) {
		super(text ?? error?.message);
		const columnNumber = super.columnNumber;
		const fileName = super.fileName;
		const lineNumber = super.lineNumber;
		const message = super.message;
		const name = super.name;
		const stack = super.stack;
		const toSource = super.toSource;

		Object.defineProperties(this, {
			columnNumber: { get: () => error?.columnNumber ?? columnNumber, },
			fileName: { get: () => error?.fileName ?? fileName, },
			lineNumber: { get: () => error?.lineNumber ?? lineNumber, },
			message: { get: () => error?.message ?? message, },
			name: { get: () => error?.name ?? name, },
			stack: { get: () => error?.stack ?? stack, },
			toSource: { value: () => error?.toSource?.() ?? toSource(), },
			error: { get: () => error, },
			text: { get: () => text, },
		});
	}
}