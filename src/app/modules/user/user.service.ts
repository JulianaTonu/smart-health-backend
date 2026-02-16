import bcrypt from "bcryptjs";
import { createPatientInput } from "./user.interface";
import { prisma } from "../../shared/prisma";
import { fileUploader } from "../../helper/fileUploader";
import { Request } from "express";

const createPatient = async (req: Request) => {

  if (req.file) {
    const uploadResult = await fileUploader.uploadToCloudinary(req.file)
    console.log("uploadResult", uploadResult);
    req.body.patient.profilePhoto = uploadResult?.secure_url
  }

  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const email = req.body.patient.email.toLowerCase().trim();

  const result = await prisma.$transaction(async (tx) => {
    // 1. Create User
    await tx.user.create({
      data: {
        email,
        password: hashedPassword,
        role: "PATIENT"
      }
    });

    // 2️. Create Patient
    const patient = await tx.patient.create({
      data:{
        ...req.body.patient,
        email
      } 
    });

    return patient;
  });

  return result;
};



export const UserService = {
  createPatient
}