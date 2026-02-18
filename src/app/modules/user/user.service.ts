import bcrypt from "bcryptjs";
import { createPatientInput } from "./user.interface";
import { prisma } from "../../shared/prisma";
import { fileUploader } from "../../helper/fileUploader";
import { Request } from "express";
import { paginationHelper } from "../../helper/paginationHelper";
import { Prisma } from "@prisma/client";
import { userSearchableFields } from "./user.constant";

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
      data: {
        ...req.body.patient,
        email
      }
    });

    return patient;
  });

  return result;
};


//getAll USers
const getAllFromDB = async (params: any, options: any) => {
  const { page, limit, skip, sortBy, sortOrder } = paginationHelper.calculatePagination(options)

  const { searchTerm, ...filterData } = params;

  const andConditions: Prisma.UserWhereInput[] = [];
  if (searchTerm) {
    andConditions.push({
      OR: userSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: "insensitive"
        }
      }))
    })
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map(key => (
        {
          [key]: {
            equals: (filterData as any)[key]
          }
        }
      ))
    })
  }

  console.log("andConditions", andConditions)
  const result = await prisma.user.findMany({
    skip,
    take: limit,

    where: {
      AND: andConditions

    },
    orderBy: {
      [sortBy]: sortOrder
    }
  });
  return result;
}


export const UserService = {
  createPatient,
  getAllFromDB
}