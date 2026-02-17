import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import { DoctorService } from "./doctor.service";
import sendResponse from "../../shared/sendResponse";

export const createDoctor = catchAsync(async(req:Request, res:Response) =>{
    const result = await DoctorService.createDoctor(req)
    sendResponse(res, {
        statusCode:201,
        success :true ,
        message :"Doctor Created Successfully",
        data: result,
    })
})

export const DoctorController = {
    createDoctor
}