import { Request ,Response} from "express";
import catchAsync from "../../shared/catchAsync";
import { AdminService } from "./admin.service";
import sendResponse from "../../shared/sendResponse";

 const createAdmin = catchAsync(async(req:Request, res:Response )=>{
    const result = await AdminService.createAdmin(req)

    sendResponse(res,{
        statusCode: 201,
        success:true,
        message:" Admin Created Successfully!",
        data:result,
    });
 });

 export const AdminController = {
    createAdmin
 }