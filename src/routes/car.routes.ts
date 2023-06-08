import { Router } from "express";
import { createCarController, listCarsController, uptadeCarController, deleteCarController, listCarByIdController } from "../controllers/cars";
import { verifySchemaMiddleware, ensureUuidIsValidMiddleware, ensurePosterCarExistsMiddleware } from "../middlewares";
import { carRequestSchema } from "../schemas/car.schema";

const carRouter = Router();

carRouter.post(
  "",
  verifySchemaMiddleware(carRequestSchema),
  createCarController
);

carRouter.get("",listCarsController)
carRouter.get("/:id",ensureUuidIsValidMiddleware,ensurePosterCarExistsMiddleware,listCarByIdController)
carRouter.patch("/:id", ensureUuidIsValidMiddleware,ensurePosterCarExistsMiddleware, uptadeCarController)
carRouter.delete("/:id", ensureUuidIsValidMiddleware,ensurePosterCarExistsMiddleware, deleteCarController)


export default carRouter;
