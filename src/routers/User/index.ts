import { Router } from "express";
import UserController from "../../controllers/User";
import { authentication } from "../../middlewares/Authentication";
import Authorization from "../../middlewares/Authorization";

const userRouter = Router();

userRouter.post("/save", authentication, Authorization.authorizationAdmin, UserController.createAdminUser);
userRouter.get("/", authentication, Authorization.authorizationAdmin, UserController.findAll);
userRouter.get("/:id", authentication, Authorization.authorizationAdmin, UserController.findById);
// userRouter.get("/me", authentication, UserController.findMe);
userRouter.put("/:id", authentication, Authorization.authorizationAdmin, UserController.update);
// userRouter.put("/me", authentication, UserController.updateMe);
userRouter.delete("/:id", authentication, Authorization.authorizationAdmin, UserController.remove)
// userRouter.delete("/me", authentication, UserController.removeMe);

export default userRouter;