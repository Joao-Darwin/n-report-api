import { Router } from "express";
import Authentication from "../../controllers/Authentication";
import User from "../../controllers/User";

const authRouter = Router()

authRouter.post("/login", Authentication.login);
authRouter.post("/signup", Authentication.signup);

export default authRouter;