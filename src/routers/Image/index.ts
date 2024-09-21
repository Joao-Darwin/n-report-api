import { Router } from "express";
import { authentication } from "../../middlewares/Authentication";
import ImageController from "../../controllers/Image";

const imageRouter = Router();

imageRouter.delete('/:id', authentication, ImageController.remove);

export default imageRouter;