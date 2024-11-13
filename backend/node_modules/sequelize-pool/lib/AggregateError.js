"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AggregateError = void 0;
class AggregateError extends Error {
    constructor(errors) {
        super();
        this.errors = errors;
        this.name = 'AggregateError';
    }
    toString() {
        const message = `AggregateError of:\n${this.errors
            .map((error) => error === this
            ? '[Circular AggregateError]'
            : error instanceof AggregateError
                ? String(error).replace(/\n$/, '').replace(/^/gm, '  ')
                : String(error).replace(/^/gm, '    ').substring(2))
            .join('\n')}\n`;
        return message;
    }
}
exports.AggregateError = AggregateError;
//# sourceMappingURL=AggregateError.js.map