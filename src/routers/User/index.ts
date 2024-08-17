import { Router } from "express";
import UserController from "../../controllers/User";
import { authenticationMiddleware } from "../../middlewares/AuthenticationMiddleware";

const userRouter = Router();

userRouter.post("/saveAdminUser", authenticationMiddleware, UserController.createAdminUser); // add permission middleware
userRouter.get("/", authenticationMiddleware, UserController.findAll); // add permission middleware
userRouter.get("/:id", authenticationMiddleware, UserController.findById); // add permission middleware
// userRouter.get("/me", authenticationMiddleware, UserController.findMe);
userRouter.put("/:id", authenticationMiddleware, UserController.update); // add permission middleware
// userRouter.put("/me", authenticationMiddleware, UserController.updateMe);
userRouter.delete("/:id", authenticationMiddleware, UserController.remove) // add permission middleware
// userRouter.delete("/me", authenticationMiddleware, UserController.removeMe);

export default userRouter;