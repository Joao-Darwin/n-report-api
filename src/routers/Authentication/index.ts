import { Router } from "express";
import Authentication from "../../controllers/Authentication";
import { authentication } from "../../middlewares/Authentication";
import User from "../../controllers/User";

const authRouter = Router()

authRouter.post("/login", Authentication.login);
authRouter.post("/signup", Authentication.signup);
authRouter.put("/change-password", authentication, Authentication.changePassword);
authRouter.put("/change-email", authentication, Authentication.changeEmail);
authRouter.get("/me", authentication, Authentication.currentUser);

export default authRouter;