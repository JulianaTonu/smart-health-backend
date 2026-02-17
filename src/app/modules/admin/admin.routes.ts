import express, { Response, Request, NextFunction } from 'express';
import { AdminController } from './admin.controller';
import { fileUploader } from '../../helper/fileUploader';
import { createAdminValidationSchema } from './admin.validation';

const router = express.Router();

router.post("/create-admin",
    fileUploader.upload.single("file"),
    (req: Request, res: Response, next: NextFunction) => {
        req.body = createAdminValidationSchema.parse(JSON.parse(req.body.data))
        next();
    },

    AdminController.createAdmin
)


export const adminRoutes = router;