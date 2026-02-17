import { Request } from "express";
import { fileUploader } from "../../helper/fileUploader";
import bcrypt from 'bcryptjs';
import { prisma } from "../../shared/prisma";



const createDoctor = async (req: Request) => {
    if (req.file) {
        const uploadResult = await fileUploader.uploadToCloudinary(req.file);
        req.body.doctor.profilePhoto = uploadResult?.secure_url;
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const email = req.body.doctor.email.toLowerCase().trim();

    const result = await prisma.$transaction(async (tx) => {
        // user table
        await tx.user.create({
            data: {
                email,
                password: hashedPassword,
                role: "DOCTOR",
            },
        })

        // doctor table
        const doctor = await tx.doctor.create({
            data: {
                ...req.body.doctor,
                email
            },
        })
        return doctor;
    })
    return result;

}

export const DoctorService = {
    createDoctor
}