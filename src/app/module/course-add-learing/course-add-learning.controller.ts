import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../shared/catchAsync";

import { Request, Response } from "express";
import sendResponse from "../../../shared/sendResponse";
import pick from "../../../shared/pick";
import { courseAndLearningFilterableFields } from "./course-add-learning.constant";
import { paginationFields } from "../../../constants/pagination";
import { CourseAndLearningService } from "./course-add-learning.services";
import {
  IAllAssetRetuneResult,
  ICourseAndLearning
} from "./course-add-learning.interface";
import { JwtPayload } from "jsonwebtoken";

const courseAndLearningInsert = catchAsync(
  async (req: Request, res: Response) => {
    const user = (req as JwtPayload).user;
    const result =
      await CourseAndLearningService.courseAndLearningsInsertIntoDB(
        req,
        user?.userId as string
      );
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Course And Learning Upload Successfully",
      data: result
    });
  }
);
// user
const allCourseAndLearningByUser = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, courseAndLearningFilterableFields);

    const paginationOptions = pick(req.query, paginationFields);
    const result =
      await CourseAndLearningService.allCourseAndLearningsByUserFromDB(
        filters,
        paginationOptions
      );
    sendResponse<ICourseAndLearning[]>(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "All courseAndLearning Fetch successfully !",
      meta: result.meta,
      data: result.data
    });
  }
);
const getCourseAndLearningIdByUser = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await CourseAndLearningService.getCourseAndLearningIdByUserFromDB(
        req.params.id
      );
    sendResponse<ICourseAndLearning>(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Single courseAndLearning Fetch successfully !",

      data: result
    });
  }
);
const getCourseAndLearningIdAdmin = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await CourseAndLearningService.getCourseAndLearningIdAdminFromDB(
        req.params.id
      );
    sendResponse<ICourseAndLearning>(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Single courseAndLearning Fetch successfully !",

      data: result
    });
  }
);

const deleteCourseAndLearningById = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await CourseAndLearningService.deleteCourseAndLearningByIdIntoDB(
        req.query.key as string,
        req.query.previewKey as string
      );

    sendResponse<ICourseAndLearning>(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: " courseAndLearning Delete successfully !",

      data: result
    });
  }
);
const updateCourseAndLearningById = catchAsync(
  async (req: Request, res: Response) => {
    const user = (req as JwtPayload).user;
    const result =
      await CourseAndLearningService.updateCourseAndLearningByIdIntoDB(
        req.params.id,
        req,
        user?.userId as string
      );
    sendResponse<ICourseAndLearning>(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Update courseAndLearning successfully !",

      data: result
    });
  }
);

const allCourseAndLearningByAdmin = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, courseAndLearningFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);
    const result =
      await CourseAndLearningService.allCourseAndLearningByAdminFromDB(
        filters,
        paginationOptions
      );
    sendResponse<ICourseAndLearning[]>(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "All courseAndLearning Fetch successfully !",
      meta: result.meta,
      data: result.data
    });
  }
);
const getAllSearchQueryAssetOperation = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, courseAndLearningFilterableFields);

    const paginationOptions = pick(req.query, paginationFields);
    const result =
      await CourseAndLearningService.getAllSearchQueryAssetOperationFromDB(
        filters,
        paginationOptions
      );
    sendResponse<IAllAssetRetuneResult>(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "All Category Data Fetch successfully !",
      data: result
    });
  }
);
export const CourseAndLearningController = {
  getAllSearchQueryAssetOperation,
  courseAndLearningInsert,
  allCourseAndLearningByUser,
  getCourseAndLearningIdByUser,
  getCourseAndLearningIdAdmin,
  deleteCourseAndLearningById,
  updateCourseAndLearningById,
  allCourseAndLearningByAdmin
};
