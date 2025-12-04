import { Router } from "express";
import authController from "./auth.controller";

//? app.use("/auth", authRouter);
const router = Router();

router.post('/register', authController.register);
router.post('/login', authController.login);


export const authRoute = router;