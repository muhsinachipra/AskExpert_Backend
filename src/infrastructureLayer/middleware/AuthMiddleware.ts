// backend\src\infrastructureLayer\middleware\authenticate.ts

import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { UserRepository } from '../database/repository/userRepository';
import { AdminRepository } from '../database/repository/adminRepository';
import { IUser } from '../../domainLayer/user';
import { IAdmin } from '../../domainLayer/admin';
import UserModel from '../database/model/userModel';
import AdminModel from '../database/model/adminModel';
import { ExpertRepository } from '../database/repository/expertRepository';
import ExpertModel from '../database/model/expertModel';
import { IExpert } from '../../domainLayer/expert';
import ErrorResponse from '../../usecaseLayer/handler/errorResponse';
import { DecodedToken } from '../types/jwtTypes';

// Augment the express Request type to include a user property
declare global {
    namespace Express {
        interface Request {
            user: IUser | IAdmin | IExpert;
            // user?: IUser | IAdmin | IExpert;
        }
    }
}

class AuthMiddleware {

    // user authentication
    static async authenticateUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        let token: string | undefined;

        // console.log('User protect');
        token = req.cookies.userjwt;

        if (token) {
            try {
                const decoded = jwt.verify(token, process.env.JWT_KEY as string) as DecodedToken;
                if (decoded.role !== 'user') {
                    return next(ErrorResponse.unauthorized('Not authorized, Invalid token'));
                }
                const userRepository = new UserRepository(UserModel);
                const user = await userRepository.findUser(decoded.email);
                if (user?.isBlocked) {
                    return next(ErrorResponse.unauthorized('Not authorized, user is blocked'));
                }
                if (user) {
                    req.user = user;
                    next();
                } else {
                    console.error('User not found');
                    return next(ErrorResponse.notFound('User not found'));
                }
            } catch (error) {
                console.error(error);
                return next(ErrorResponse.unauthorized('Not authorized, No token'));
            }
        } else {
            console.log('No token');
            return next(ErrorResponse.unauthorized('Not authorized, No token'));
        }
    }


    // admin authentication
    static async authenticateAdmin(req: Request, res: Response, next: NextFunction): Promise<void> {
        let token: string | undefined;

        // console.log('Admin protect');
        token = req.cookies.adminjwt;


        if (token) {
            try {
                const decoded = jwt.verify(token, process.env.JWT_KEY as string) as DecodedToken;
                if (decoded.role !== 'admin') {
                    return next(ErrorResponse.unauthorized('Not authorized, Invalid token'));
                }
                const adminRepository = new AdminRepository(AdminModel);
                const admin = await adminRepository.findAdmin(decoded.email);
                if (admin) {
                    req.user = admin;
                    next();
                } else {
                    console.error('Admin not found');
                    return next(ErrorResponse.notFound('User not found'));
                }
            } catch (error) {
                console.error(error);
                return next(ErrorResponse.unauthorized('Not authorized, No token'));
            }
        } else {
            console.log('No token');
            return next(ErrorResponse.unauthorized('Not authorized, No token'));
        }
    }

    // expert authentication
    static async authenticateExpert(req: Request, res: Response, next: NextFunction): Promise<void> {
        let token: string | undefined;

        // console.log('Expert protect');
        token = req.cookies.expertjwt;

        if (token) {
            try {
                const decoded = jwt.verify(token, process.env.JWT_KEY as string) as DecodedToken;
                if (decoded.role !== 'expert') {
                    return next(ErrorResponse.unauthorized('Not authorized, Invalid token'));
                }
                const expertRepository = new ExpertRepository(ExpertModel)
                const expert = await expertRepository.findExpert(decoded.email);
                if (expert?.isBlocked) {
                    return next(ErrorResponse.unauthorized('Not authorized, expert is blocked'));
                }
                if (!expert?.isVerified) {
                    return next(ErrorResponse.unauthorized('Not authorized, You are not verified yet'));
                }
                if (expert) {
                    req.user = expert;
                    next();
                } else {
                    console.error('Expert not found');
                    return next(ErrorResponse.notFound('User not found'));
                }
            } catch (error) {
                console.error(error);
                return next(ErrorResponse.unauthorized('Not authorized, No token'));
            }
        } else {
            console.log('No token');
            return next(ErrorResponse.unauthorized('Not authorized, No token'));
        }
    }

}

export default AuthMiddleware;
