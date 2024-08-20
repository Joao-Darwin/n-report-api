import { Router } from "express";
import { authentication } from "../../middlewares/Authentication";
import Authorization from "../../middlewares/Authorization";
import Permission from "../../controllers/Permission";

const permissionRouters = Router();

permissionRouters.post("/", authentication, Authorization.authorizationAdmin, Permission.create);
permissionRouters.get("/", authentication, Authorization.authorizationAdmin, Permission.findAll);

export default permissionRouters;