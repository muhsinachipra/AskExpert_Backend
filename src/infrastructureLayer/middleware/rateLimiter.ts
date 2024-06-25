// backend\src\infrastructureLayer\middleware\rateLimiter.ts

import rateLimit from 'express-rate-limit';
import { NextFunction, Request, Response } from 'express';
import ErrorResponse from '../../usecaseLayer/handler/errorResponse';

const loginRateLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minutes
    max: 5, // limit each IP to 5 requests per windowMs
    handler: (req: Request, res: Response, next: NextFunction) => {
        return next(ErrorResponse.tooManyRequests('Too many login attempts, please try again after 1 minutes'));
    },
    headers: true,
});

export default loginRateLimiter;
