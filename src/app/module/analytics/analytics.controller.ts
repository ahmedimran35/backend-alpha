import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { AnalyticService } from "./analytics.services";
import { StatusCodes } from "http-status-codes";

const GetAnalytic = catchAsync(async (req: Request, res: Response) => {
  const result = await AnalyticService.GetAnalyticIntoDB();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Fetched Successfully",
    data: result
  });
});

export const AnalyticController = { GetAnalytic };
