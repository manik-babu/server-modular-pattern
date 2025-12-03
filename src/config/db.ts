import { Pool } from "pg";
import config from ".";
export const pool = new Pool({
    connectionString: config.connecting_str
})

const initDB = async () => {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users(
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            userName VARCHAR(100) UNIQUE NOT NULL,
            password VARCHAR(64) NOT NULL,
            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW()
            )
            `)
        console.log("Table created!")
    } catch (error) {
        console.error("DB error: ", error);
        throw new Error("Problem to create data table");
    }
}

export default initDB;