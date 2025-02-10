import express, { NextFunction, Request, Response } from "express";
import { Role } from "@prisma/client";
import { userValidation } from "./user.validation";
import { userController } from "./user.controller";
import auth from "../../middlewares/auth";
import { fileUploader } from "../../helpars/fileUploader";
import validateRequest from "../../middlewares/validateRequest";

const router = express.Router();

router.get("/", auth(Role.ADMIN), userController.getAllFromDB);

router.get("/me", auth(Role.ADMIN, Role.CUSTOMER), userController.getMyProfile);

router.post(
  "/create-admin",
  // auth(UserRole.ADMIN),
  fileUploader.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = userValidation.createAdmin.parse(JSON.parse(req.body.data));
    return userController.createAdmin(req, res, next);
  }
);
router.post(
  "/create-customer",
  fileUploader.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = userValidation.createCustomer.parse(JSON.parse(req.body.data));
    return userController.createCustomer(req, res, next);
  }
);

router.post(
  "/create-vendor",
  auth(Role.ADMIN),
  fileUploader.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = userValidation.createVendor.parse(JSON.parse(req.body.data));
    return userController.createVendor(req, res, next);
  }
);

router.patch(
  "/:id/status",
  auth(Role.ADMIN),
  validateRequest(userValidation.updateStatus),
  userController.changeProfileStatus
);

router.patch(
  "/update-my-profile",
  auth(Role.ADMIN, Role.CUSTOMER),
  fileUploader.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    return userController.updateMyProfie(req, res, next);
  }
);

export const userRoutes = router;
