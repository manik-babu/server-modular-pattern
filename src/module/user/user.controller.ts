import { Request, Response } from "express";
import userService from "./user.service";

const getUser = async (req: Request, res: Response) => {
    // console.log(req.user);
    try {
        const users = await userService.getUser();
        res.status(200).json({
            data: users.rows
        });
    }
    catch (err: any) {
        console.log(err.message);
        res.status(500).json({
            message: "Internal server error!"
        })
    }
}
const getSingleUser = async (req: Request, res: Response) => {
    try {
        const user = await userService.getSingleUser(req.params.id as string);
        if (user.rowCount === 0) {
            return res.status(404).json({
                message: "User not found!"
            })
        }
        res.status(200).json({
            data: user.rows[0]
        });
    } catch (error) {
        res.send(500).json({
            message: "Internal server error!"
        });
    }
}
const updateUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name } = req.body;
    try {
        const user = await userService.updateUser(name, id as string);
        if (user.rowCount == 0) {
            return res.status(404).json({
                message: "User not found!",
                id
            })
        }
        res.status(202).json({
            message: "User updated successfully",
            user: user.rows[0]
        })
    }
    catch (error) {
        res.status(500).json({
            message: "Internal server error!"
        })
    }
}
const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const del = await userService.deleteUser(id as string);
        if (del.rowCount == 0) {
            return res.status(404).json({
                message: "User not found!"
            })
        }
        console.log(del);
        res.status(200).json({
            message: "User deleted!"
        })
    } catch (err) {
        res.status(500).json({
            message: "Internal server error!"
        })
    }
}


const userController = {
    getUser,
    getSingleUser,
    updateUser,
    deleteUser,
}
export default userController;