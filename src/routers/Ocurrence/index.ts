import { Router } from "express";
import OcurrenceController from "../../controllers/Ocurrence";
import { authentication } from "../../middlewares/Authentication";

const ocurrenceRouter = Router();

ocurrenceRouter.post("/save", authentication, OcurrenceController.createOcurrence);
ocurrenceRouter.get("/", authentication, OcurrenceController.findAll);
ocurrenceRouter.get("/:id", authentication, OcurrenceController.findById);
ocurrenceRouter.put("/:id", authentication, OcurrenceController.update);
ocurrenceRouter.delete("/:id", authentication, OcurrenceController.remove);

export default ocurrenceRouter;