import { pool } from "../../config/db";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import config from "../../config";


const createUser = async (name: string, userName: string, password: string) => {
    const user = await pool.query(`INSERT INTO users(name, userName, password) VALUES($1, $2, $3) RETURNING *`, [name, userName, password]);
    return user;
}
const login = async (userName: string, password: string) => {
    const result = await pool.query(`SELECT * FROM users WHERE userName = $1`, [userName]);
    if (result.rowCount == 0) {
        return null;
    }

    const user = result.rows[0];
    const isMatchPass = await bcrypt.compare(password, user.password);
    if (!isMatchPass) {
        return null;
    }
    const secret = config.jwt_secret;
    const token = jwt.sign({ username: user.username }, secret as string, {
        expiresIn: '7d'
    });
    return { user, token };
}

const authService = {
    createUser,
    login,
}
export default authService;