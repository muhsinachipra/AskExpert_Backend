// backend\src\infrastructureLayer\middleware\rateLimiter.ts

import rateLimit from 'express-rate-limit';
import { Request, Response } from 'express';

const loginRateLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 15 minutes
    max: 5, // limit each IP to 5 requests per windowMs
    handler: (req: Request, res: Response) => {
        res.status(429).json({
            success: false,
            message: "Too many login attempts, please try again after 1 minutes"
        });
    },
    headers: true,
});

export default loginRateLimiter;
