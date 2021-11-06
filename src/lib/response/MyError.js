export class MyError extends Error {
	constructor({
		error,
		text,
	}) {
		super(text ?? error?.message);
		const columnNumber = this.columnNumber;
		const fileName = this.fileName;
		const lineNumber = this.lineNumber;
		const message = this.message;
		const name = this.name;
		const stack = this.stack;
		const toSource = this.toSource;

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