import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../shared/catchAsync";

import { Request, Response } from "express";
import sendResponse from "../../../shared/sendResponse";
import pick from "../../../shared/pick";
import { DesignTemplateService } from "./design-template.services";
import { designTemplateFilterableFields } from "./design-template.constant";
import { paginationFields } from "../../../constants/pagination";
import { IDesignTemplate } from "./design-template.interface";
import { JwtPayload } from "jsonwebtoken";

const DesignTemplateInsert = catchAsync(async (req: Request, res: Response) => {
  const user = (req as JwtPayload).user;
  const result = await DesignTemplateService.DesignTemplatesInsertIntoDB(
    req,
    user?.userId as string
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Course and learning materials uploaded successfully.",
    data: result
  });
});
// user
const allDesignTemplateByUser = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, designTemplateFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);
    const result = await DesignTemplateService.allDesignTemplateByUserFromDB(
      filters,
      paginationOptions
    );
    sendResponse<IDesignTemplate[]>(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "All design templates have been successfully retrieved.",
      meta: result.meta,
      data: result.data
    });
  }
);
const getDesignTemplateIdByUser = catchAsync(
  async (req: Request, res: Response) => {
    const result = await DesignTemplateService.getDesignTemplateIdByUserFromDB(
      req.params.id
    );
    sendResponse<IDesignTemplate>(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Design Template retrieved successfully.",

      data: result
    });
  }
);
const getDesignTemplateIdAdmin = catchAsync(
  async (req: Request, res: Response) => {
    const result = await DesignTemplateService.getDesignTemplateIdAdminFromDB(
      req.params.id
    );
    sendResponse<IDesignTemplate>(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Design Template retrieved successfully.",

      data: result
    });
  }
);

const deleteDesignTemplateById = catchAsync(
  async (req: Request, res: Response) => {
    const result = await DesignTemplateService.deleteDesignTemplateByIdIntoDB(
      req.query.key as string,
      req.query.previewKey as string
    );
    sendResponse<IDesignTemplate>(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Design Template have been successfully deleted.",

      data: result
    });
  }
);
const updateDesignTemplateById = catchAsync(
  async (req: Request, res: Response) => {
    const user = (req as JwtPayload).user;
    const result = await DesignTemplateService.updateDesignTemplateByIdIntoDB(
      req.params.id,
      req,
      user?.userId as string
    );
    sendResponse<IDesignTemplate>(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Design Template have been successfully updated.",

      data: result
    });
  }
);

const allDesignTemplateByAdmin = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, designTemplateFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);
    const result = await DesignTemplateService.allDesignTemplateByAdminFromDB(
      filters,
      paginationOptions
    );
    sendResponse<IDesignTemplate[]>(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "All DesignTemplate Fetch successfully !",
      meta: result.meta,
      data: result.data
    });
  }
);
export const DesignTemplateController = {
  DesignTemplateInsert,
  allDesignTemplateByUser,
  getDesignTemplateIdByUser,
  getDesignTemplateIdAdmin,
  deleteDesignTemplateById,
  updateDesignTemplateById,
  allDesignTemplateByAdmin
};
