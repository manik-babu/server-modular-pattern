import express, { NextFunction, Request, Response } from 'express';
import config from './config';
import fs from 'fs';
import path from 'path';
import initDB, { pool } from './config/db';
import userRoute from './module/user/user.route';
import { authRoute } from './module/auth/auth.route';

const app = express();
const port = Number(config.port) || 8080;
app.use(express.json());
app.use(express.urlencoded());

// Initializing DB
initDB().catch((err: any) => console.log(err));


app.use('/users', userRoute);
app.use('/auth', authRoute);

const logger = (req: Request, res: Response, next: NextFunction) => {
    const logFilePath = path.join(process.cwd(), './src/data/logger.log');
    const str = `[${new Date().toISOString()}] ${req.method} ${req.url}\n`;
    fs.appendFileSync(logFilePath, str);
    next();
}

app.get('/', logger, (req: Request, res: Response) => {
    res.send("Hello world! I am Manik");
})


app.listen(port, () => {
    console.log("Server running...");
})