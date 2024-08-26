import { Router } from "express";
import OcurrenceController from "../../controllers/Ocurrence";
import { authentication } from "../../middlewares/Authentication";
import uploadsConfig from "../../config/multer";
import multer from "multer";

const ocurrenceRouter = Router();
const upload = multer(uploadsConfig);

ocurrenceRouter.post("/save", authentication, upload.array("images"), OcurrenceController.createOcurrence);
ocurrenceRouter.get("/", authentication, OcurrenceController.findAll);
ocurrenceRouter.get("/:id", authentication, OcurrenceController.findById);
ocurrenceRouter.put("/:id", authentication, OcurrenceController.update);
ocurrenceRouter.delete("/:id", authentication, OcurrenceController.remove);

export default ocurrenceRouter;