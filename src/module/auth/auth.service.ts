import { pool } from "../../config/db";


const createUser = async (name: string, userName: string, password: string) => {
    const user = await pool.query(`INSERT INTO users(name, userName, password) VALUES($1, $2, $3) RETURNING *`, [name, userName, password]);
    return user;
}

const authService = {
    createUser,
}
export default authService;