import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../config";


const auth = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    try {
        if (!token) {
            res.status(401).json({
                message: "Unauthorize person! please login first"
            });
            return;
        }
        const decoded_token: any = jwt.verify(token, config.jwt_secret!);
        if (!decoded_token) {
            res.status(401).json({
                message: "Unauthorize person! please login first"
            });
            return;
        }
        req.user = decoded_token;
        next();

    } catch (error: any) {
        console.error('Server error: ', error.message)
        res.status(500).json({
            message: 'Internal server error!'
        });
    }
}

export default auth;