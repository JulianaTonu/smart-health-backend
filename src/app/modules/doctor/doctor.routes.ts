import express, { NextFunction, Request, Response } from 'express';
import { fileUploader } from '../../helper/fileUploader';
import { createDoctorValidationSchema } from './doctor.validation';
import { DoctorController } from './doctor.controller';
import { UserRole } from '@prisma/client';
import auth from '../../middlewares/auth';


const router = express.Router()

router.post("/create-doctor",
    auth(UserRole.ADMIN),
    fileUploader.upload.single("file"),
    (req:Request, res:Response, next:NextFunction) =>{
        req.body = createDoctorValidationSchema.parse(JSON.parse(req.body.data))
        next();
    },

    DoctorController.createDoctor
)

export const doctorRoutes = router;
