import { pool } from "../../config/db";

const createUser = async (name: string, userName: string, password: string) => {
    const user = await pool.query(`INSERT INTO users(name, userName, password) VALUES($1, $2, $3) RETURNING *`, [name, userName, password]);
    return user;
}
const getUser = async () => {
    const users = await pool.query(`SELECT * FROM users`);
    return users;
}
const getSingleUser = async (id: string) => {
    const user = await pool.query(`SELECT * FROM users WHERE id = $1`, [id]);
    return user;
}
const updateUser = async (name: string, id: string) => {
    const user = await pool.query(`UPDATE users SET name = $1 WHERE id = $2 RETURNING *`, [name, id]);
    return user;
}
const deleteUser = async (id: string) => {
    const del = await pool.query(`DELETE FROM users WHERE id = $1 RETURNING *`, [id]);
    return del;
}

const userService = {
    createUser,
    getUser,
    getSingleUser,
    updateUser,
    deleteUser,
}
export default userService;