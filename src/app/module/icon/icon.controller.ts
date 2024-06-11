import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { IconsService } from "./icon.services";
import sendResponse from "../../../shared/sendResponse";
import { StatusCodes } from "http-status-codes";
import pick from "../../../shared/pick";
import { iconsFilterableFields } from "./icon.constant";
import { paginationFields } from "../../../constants/pagination";
import { IIcons } from "./icon.interface";
import { JwtPayload } from "jsonwebtoken";

const iconsInsert = catchAsync(async (req: Request, res: Response) => {
  const user = (req as JwtPayload).user;
  const result = await IconsService.iconsInsertIntoDB(
    req,
    user?.userId as string
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Icon uploaded successfully.",
    data: result
  });
});

const iconBulkUploadSystem = catchAsync(async (req: Request, res: Response) => {
  const user = (req as JwtPayload).user;
  const result = await IconsService.iconBulkUploadSystem(
    req,
    user?.userId as string
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Bulk Icon added successfully!",
    data: result
  });
});
// user
const allIconsByUser = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, iconsFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);
  const result = await IconsService.allIconsByUserFromDB(
    filters,
    paginationOptions
  );
  sendResponse<IIcons[]>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "All icons have been successfully retrieved.",
    meta: result.meta,
    data: result.data
  });
});
const getIconsIdByUser = catchAsync(async (req: Request, res: Response) => {
  const result = await IconsService.getIconsIdByUserFromDB(req.params.id);
  sendResponse<IIcons>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Icon retrieved successfully.",

    data: result
  });
});
const getIconsByIdFromSEO = catchAsync(async (req: Request, res: Response) => {
  const result = await IconsService.getIconsIdAdminFromDB(req.params.id);
  sendResponse<IIcons>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Icon retrieved successfully.",

    data: result
  });
});

const deleteIconById = catchAsync(async (req: Request, res: Response) => {
  const result = await IconsService.deleteIconsByIdIntoDB(
    req.query.key as string
  );
  sendResponse<IIcons>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Icons have been successfully deleted.",

    data: result
  });
});
const updateIconsById = catchAsync(async (req: Request, res: Response) => {
  const user = (req as JwtPayload).user;
  const result = await IconsService.updateIconsByIdIntoDB(
    req.params.id,
    req,
    user?.userId as string
  );
  sendResponse<IIcons>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Icons have been successfully updated.",

    data: result
  });
});

const allIconsBySEO = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, iconsFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);
  const result = await IconsService.allIconsByAdminFromDB(
    filters,
    paginationOptions
  );
  sendResponse<IIcons[]>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "All icons have been successfully retrieved.",
    meta: result.meta,
    data: result.data
  });
});

export const IconsController = {
  iconsInsert,
  allIconsByUser,
  getIconsIdByUser,
  getIconsByIdFromSEO,
  deleteIconById,
  updateIconsById,
  allIconsBySEO,
  iconBulkUploadSystem
};
