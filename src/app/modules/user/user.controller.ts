import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import { UserService } from "./user.service";
import sendResponse from "../../shared/sendResponse";

const createPatient = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.createPatient(req)
  // await UserService.createPatient(req);
  console.log("patient", req.body)

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Patient created successfully!",
    data: result
  })

})


// getAllFrom DB
const getALlFromDB = catchAsync(async (req: Request, res: Response) => {
  const { page, limit } = req.query;
  const result = await UserService.getAllFromDB({ page: Number(page), limit: Number(limit) });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User Retrive Successfully",
    data: result
  })
})



export const userController = {
  createPatient, getALlFromDB
}