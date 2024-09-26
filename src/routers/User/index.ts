import { Router } from "express";
import UserController from "../../controllers/User";
import { authentication } from "../../middlewares/Authentication";
import Authorization from "../../middlewares/Authorization";
import multerConfig from "../../config/multer";
import multer from "multer";

const userRouter = Router();
const upload = multer(multerConfig);

userRouter.get("/profile", authentication, UserController.profile);
userRouter.put("/updatePass", authentication, UserController.updatePassword);
userRouter.put("/updateEmail", authentication, UserController.updateEmail);
userRouter.put("/self", authentication, upload.single('avatar'), UserController.updateSelf);
userRouter.delete("/self", authentication, UserController.removeSelf);
userRouter.post("/save", authentication, Authorization.authorizationAdmin, upload.single('avatar'), UserController.createAdminUser);
userRouter.get("/", authentication, Authorization.authorizationAdmin, UserController.findAll);
userRouter.get("/:id", authentication, Authorization.authorizationAdmin, UserController.findById);
userRouter.put("/:id", authentication, Authorization.authorizationAdmin, upload.single('avatar'), UserController.update);
userRouter.delete("/:id", authentication, Authorization.authorizationAdmin, UserController.remove);


export default userRouter;