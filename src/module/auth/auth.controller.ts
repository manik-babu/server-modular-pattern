import { pool } from "../../config/db";
import { Request, Response } from "express";
import authService from "./auth.service";

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
        const user = await authService.createUser(name, userName, password);
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

const authController = {
    register,
}
export default authController;