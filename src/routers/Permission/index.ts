import { Router } from "express";
import { authentication } from "../../middlewares/Authentication";
import Authorization from "../../middlewares/Authorization";
import Permission from "../../controllers/Permission";

const permissionRouters = Router();

permissionRouters.post("/", authentication, Authorization.authorizationAdmin, Permission.create);
permissionRouters.get("/", authentication, Authorization.authorizationAdmin, Permission.findAll);
permissionRouters.get("/:id", authentication, Authorization.authorizationAdmin, Permission.findById);
permissionRouters.put("/:id", authentication, Authorization.authorizationAdmin, Permission.update);
permissionRouters.delete("/:id", authentication, Authorization.authorizationAdmin, Permission.remove);

export default permissionRouters;