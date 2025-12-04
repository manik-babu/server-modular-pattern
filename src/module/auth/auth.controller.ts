import { pool } from "../../config/db";
import { Request, Response } from "express";
import authService from "./auth.service";
import bcrypt from 'bcryptjs';

const register = async (req: Request, res: Response) => {
    const { name, userName, password } = req.body;
    try {
        const exist = await pool.query(`SELECT * FROM users WHERE userName = $1`, [userName]);
        if (exist.rowCount != 0) {
            res.status(200).json({
                success: false,
                message: "User name already exits! please try another"
            })
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);


        const user = await authService.createUser(name, userName, hashedPassword);
        res.status(201).json({
            message: "Created!",
            user: user.rows[0]
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error!"
        })
    }
}
const login = async (req: Request, res: Response) => {
    const { userName, password } = req.body;
    try {
        const result = await authService.login(userName, password);
        if (result == null) {
            res.status(400).json({
                message: "Username or password incorrect"
            })
            return;
        }

        console.log({ result });
        res.status(200).json({
            token: result.token,
            user: result.user
        });
    } catch (error: any) {
        console.error('Server error: ', error.message)
        res.status(500).json({
            message: 'Internal server error!'
        });
    }
}

const authController = {
    register,
    login,
}
export default authController;