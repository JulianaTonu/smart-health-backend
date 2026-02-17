import { Request } from "express";
import { fileUploader } from "../../helper/fileUploader";
import bcrypt from 'bcryptjs';
import { prisma } from "../../shared/prisma";

const createAdmin = async (req: Request) => {

    // 🖼 Upload profile photo (if exists)
    if (req.file) {
        const uploadResult = await fileUploader.uploadToCloudinary(req.file);
        req.body.admin.profilePhoto = uploadResult?.secure_url;
    }

    // Hashed Password 
    const hashedPassword = await bcrypt.hash(req.body.password, 10)

    const email = req.body.admin.email.toLowerCase().trim();

    //check duplicate
    const existingUser = await prisma.user.findUnique({
        where: { email }
    })
    if (existingUser) {
        throw new Error("Admin already exists")
    }

    //Transaction
    const result = await prisma.$transaction(async (tx) => {
        // create User
        await tx.user.create({
            data: {
                email,
                password: hashedPassword,
                role: "ADMIN",
            }
        })

        // create Admin
        const admin = await tx.admin.create({
            data:{
                ...req.body.admin,
                email,
            }
        })
        return admin
    })
    return result

}



export const AdminService = {
    createAdmin
}