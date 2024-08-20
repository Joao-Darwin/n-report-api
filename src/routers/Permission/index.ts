import { Router } from "express";
import { authentication } from "../../middlewares/Authentication";
import Authorization from "../../middlewares/Authorization";
import Permission from "../../controllers/Permission";

const permissionRouters = Router();

permissionRouters.post("/", authentication, Authorization.authorizationAdmin, Permission.create);

export default permissionRouters;