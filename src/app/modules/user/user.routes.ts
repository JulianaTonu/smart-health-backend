import express, { NextFunction, Request, Response } from 'express';
import { userController } from './user.controller';
import { fileUploader } from '../../helper/fileUploader';
import { UserValidation } from './user.validation';
import auth from '../../middlewares/auth';
import { UserRole } from '@prisma/client';

const router = express.Router();

router.get("/",
  auth(UserRole.ADMIN),
  userController.getALlFromDB)

router.post(
  "/create-patient",
  fileUploader.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = UserValidation
      .createPatientValidationSchema
      .parse(JSON.parse(req.body.data));

    next();
  },
  userController.createPatient
);


export const userRoutes = router;
