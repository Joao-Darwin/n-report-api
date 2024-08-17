import { Router } from "express";
import UserController from "../../controllers/User"

const userRouter = Router();

userRouter.post("/save", UserController.create);
userRouter.post("/saveAdminUser", UserController.createAdminUser); // This endpoint will have permission middleware, to check if who's creating is other admin
userRouter.get("/", UserController.findAll); // Add auth middleware and add permission middleware
userRouter.get("/:id", UserController.findById); // Add auth middleware and add permission middleware
// userRouter.get("/me", UserController.findMe); // Add auth middleware
userRouter.put("/:id", UserController.update); // Add auth middleware and add permission middleware
// userRouter.put("/me", UserController.updateMe); // Add auth middleware
userRouter.delete("/:id", UserController.remove) // Add auth middleware and add permission middleware
// userRouter.delete("/me", UserController.removeMe) // Add auth middleware

export default userRouter;