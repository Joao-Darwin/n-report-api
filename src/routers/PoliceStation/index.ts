import { Router } from "express";
import PoliceStationController from "../../controllers/PoliceStation";
import { authentication } from "../../middlewares/Authentication";
import Authorization from "../../middlewares/Authorization";

const policeStationRouter = Router();

policeStationRouter.get("/", authentication, PoliceStationController.findAll);
policeStationRouter.get("/:id", authentication, PoliceStationController.findById);
policeStationRouter.post("/save", authentication, Authorization.authorizationAdmin, PoliceStationController.createPoliceStation);
policeStationRouter.put("/:id", authentication, Authorization.authorizationAdmin, PoliceStationController.update);
policeStationRouter.delete("/:id", authentication, Authorization.authorizationAdmin, PoliceStationController.remove);

export default policeStationRouter;