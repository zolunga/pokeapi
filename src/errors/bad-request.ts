import {CustomError} from "./custom-error";

export class BadRequest extends CustomError {
    statusCode: number = 400;

    constructor(private reason: string) {
        super(reason);
    }

    serializeErrors(): { message: string; field?: string }[] {
        return [{ message: this.reason }];
    }

}
