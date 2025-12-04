import express, { NextFunction, Request, Response } from 'express';
import initDB from './config/db';
import userRoute from './module/user/user.route';
import { authRoute } from './module/auth/auth.route';

const app = express();
app.use(express.json());
app.use(express.urlencoded());

// Initializing DB
initDB().catch((err: any) => console.log(err));


app.use('/users', userRoute);
app.use('/auth', authRoute);

app.get("/", async (req: Request, res: Response) => {
    res.status(200).json({
        message: "Hello world!"
    });
})
app.use((req: Request, res: Response) => {
    res.status(404).json({
        message: "Path not found!",
        path: req.url,
        method: req.method
    })
});


export default app;