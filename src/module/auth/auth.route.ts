import { Router } from "express";
import authController from "./auth.controller";

//? app.use("/auth", authRouter);
const router = Router();

router.post('/register', authController.register);
export const authRoute = router;