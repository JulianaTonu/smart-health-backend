import bcrypt from "bcryptjs";
import { createPatientInput } from "./user.interface";
import { prisma } from "../../shared/prisma";

const createPatient = async (payload: createPatientInput) => {
  const hashedPassword = await bcrypt.hash(payload.password, 10);

  const result = await prisma.$transaction(async (tx) => {
    // 1. Create User
    await tx.user.create({
      data: {
        email: payload.email,
        password: hashedPassword,
        role: "PATIENT"
      }
    });

    // 2️. Create Patient
    const patient = await tx.patient.create({
      data: {
        email: payload.email,   // FK linking via email
        name: payload.name,
        contact: payload.contact,
        address: payload.address
      }
    });

    return patient;  
  });

  return result; 
};



export const UserService = {
    createPatient
}