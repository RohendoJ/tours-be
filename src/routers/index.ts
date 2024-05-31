import express from "express";
import { upload } from "../config";
import { authController, userController, tourController } from "../controllers";
import { authMiddleware } from "../middlewares";

export const router = express.Router();

router.post("/api/v1/auth/register", authController.register);
router.post("/api/v1/auth/login", authController.login);

router.use(authMiddleware);

router.get("/api/v1/users/profile", userController.getProfile);

router.post("/api/v1/tours", upload.single("image"), tourController.create);
router.get("/api/v1/tours", tourController.get);
router.get("/api/v1/tours/:id", tourController.getById);
router.patch(
  "/api/v1/tours/:id",
  upload.single("image"),
  tourController.update
);
router.delete("/api/v1/tours/:id", tourController.delete);
