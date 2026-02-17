import express, { NextFunction, Request, Response } from 'express';
import { fileUploader } from '../../helper/fileUploader';
import { createDoctorValidationSchema } from './doctor.validation';
import { DoctorController } from './doctor.controller';


const router = express.Router()

router.post("/create-doctor",

    fileUploader.upload.single("file"),
    (req:Request, res:Response, next:NextFunction) =>{
        req.body = createDoctorValidationSchema.parse(JSON.parse(req.body.data))
        next();
    },

    DoctorController.createDoctor
)

export const doctorRoutes = router;
