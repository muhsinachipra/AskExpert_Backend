// backend\src\infrastructureLayer\types\jwtTypes.ts

import { JwtPayload } from 'jsonwebtoken';

export interface DecodedToken extends JwtPayload {
    id: string;
    email: string;
    role: string;
    name: string;
}