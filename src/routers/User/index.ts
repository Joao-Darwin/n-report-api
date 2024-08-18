import { Router } from "express";
import UserController from "../../controllers/User";
import { authentication } from "../../middlewares/Authentication";
import Authorization from "../../middlewares/Authorization";

const userRouter = Router();

userRouter.get("/profile", authentication, UserController.profile);
// userRouter.put("/me", authentication, UserController.updateMe);
// userRouter.delete("/me", authentication, UserController.removeMe);
userRouter.post("/save", authentication, Authorization.authorizationAdmin, UserController.createAdminUser);
userRouter.get("/", authentication, Authorization.authorizationAdmin, UserController.findAll);
userRouter.get("/:id", authentication, Authorization.authorizationAdmin, UserController.findById);
userRouter.put("/:id", authentication, Authorization.authorizationAdmin, UserController.update);
userRouter.delete("/:id", authentication, Authorization.authorizationAdmin, UserController.remove)

export default userRouter;