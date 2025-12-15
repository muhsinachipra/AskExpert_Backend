// backend\src\usecaseLayer\handler\errorHandler.ts

import { Next, Req, Res } from '../../infrastructureLayer/types/expressTypes';
import ErrorResponse from "./errorResponse";
import mongoose from 'mongoose';

const errorHandler = (err: Error | ErrorResponse, req: Req, res: Res, next: Next) => {
    console.log('--> usecaseLayer/handler/errorHandler.ts');

    // Handle Mongoose Validation Errors
    if (err instanceof mongoose.Error.ValidationError) {
        const errors = Object.values(err.errors).map(error => ({
            path: error.path,
            message: error.message,
        }));

        return res.status(400).json({
            success: false,
            status: 400,
            message: 'Mongoose Validation Error',
            errors,
        });
    }

    // Handle custom ErrorResponse errors
    if (err instanceof ErrorResponse) {
        return res.status(err.status).json({
            success: false,
            status: err.status,
            message: err.message,
        });
    }

    // Handle other errors
    return res.status(500).json({
        success: false,
        status: 500,
        message: err.message || "Something went wrong",
    });
};

export default errorHandler;
