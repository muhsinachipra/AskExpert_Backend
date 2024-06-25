// backend\src\usecaseLayer\handler\errorResponse.ts


export default class ErrorResponse extends Error {
    status: number
    message: string;

    constructor(status: number, message: string) {
        super(message);
        this.status = status;
        this.message = message;
    }

    static badRequest(msg: string): ErrorResponse {
        return new ErrorResponse(400, msg)
    }

    static unauthorized(msg: string): ErrorResponse {
        return new ErrorResponse(401, msg)
    }

    static forbidden(msg: string): ErrorResponse {
        return new ErrorResponse(403, msg)
    }

    static notFound(msg: string = "Not Found"): ErrorResponse {
        return new ErrorResponse(404, msg)
    }

    static internalServerError(msg: string): ErrorResponse {
        return new ErrorResponse(500, msg)
    }
}