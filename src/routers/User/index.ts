import { Router } from "express";
import UserController from "../../controllers/User"

const userRouter = Router();

userRouter.post("/save", UserController.create);
userRouter.post("/saveAdminUser", UserController.createAdminUser); // This endpoint will have permission middleware, to check if who's creating is other admin

export default userRouter;