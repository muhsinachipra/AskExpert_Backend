// backend\src\infrastructureLayer\middleware\rateLimiter.ts

import rateLimit from 'express-rate-limit';

const loginRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // limit each IP to 5 requests per windowMs
    message: "Too many login attempts, please try again after 15 minutes",
    headers: true,
});

export default loginRateLimiter;
