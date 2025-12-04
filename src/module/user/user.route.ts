import { Router } from "express";
import userController from "./user.controller";
import auth from "../../middleware/auth";

//? app.use("/users", userRoute);
const router = Router();

router.get('/', userController.getUser);
router.get('/:id', userController.getSingleUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);




export default router;