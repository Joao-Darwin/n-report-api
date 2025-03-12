import { Router } from "express";
import OcurrenceController from "../../controllers/Ocurrence";
import { authentication } from "../../middlewares/Authentication";
import uploadsConfig from "../../config/multer";
import multer from "multer";

const ocurrenceRouter = Router();
const upload = multer(uploadsConfig);

ocurrenceRouter.post("/save", authentication, OcurrenceController.createOcurrence);
ocurrenceRouter.get("/", authentication, OcurrenceController.findAll);
ocurrenceRouter.get("/self", authentication, OcurrenceController.findAllSelf);
ocurrenceRouter.get("/count/all", authentication, OcurrenceController.ocurrenceCount);
ocurrenceRouter.get("/count/self", authentication, OcurrenceController.ocurrenceCountSelf);
ocurrenceRouter.get("/count/murders", authentication, OcurrenceController.murderCount);
ocurrenceRouter.get("/count/thefts", authentication, OcurrenceController.theftCount);
ocurrenceRouter.get("/:id", authentication, OcurrenceController.findById);
ocurrenceRouter.put("/:id", authentication, OcurrenceController.update);
ocurrenceRouter.delete("/:id", authentication, OcurrenceController.remove);

export default ocurrenceRouter;