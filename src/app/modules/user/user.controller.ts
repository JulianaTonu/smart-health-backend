import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import { UserService } from "./user.service";
import sendResponse from "../../shared/sendResponse";
import pick from '../../helper/pick';

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
 
  const filters = pick(req.query, ["status","role","email","searchTerm"])
  const options = pick(req.query, ["page", "limit", "sortBy", "sortOrder"])



  const result = await UserService.getAllFromDB(filters, options);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User Retrieve Successfully",
    data: result
  })
})



export const userController = {
  createPatient, getALlFromDB
}