import {CustomError} from "./custom-error";

export class NotFound extends CustomError {
    statusCode = 404;
    constructor() {
        super('Not Found');
    }

    serializeErrors(): { message: string; field?: string }[] {
        return [{ message: 'not found on api' }];
    }
}
