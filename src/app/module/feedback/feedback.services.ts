import { SortOrder } from "mongoose";
import { paginationHelpers } from "../../../helper/paginationHelper";
import { IPaginationOptions } from "../../../interface/pagination";
import { feedBackSearchableFields } from "./feedback.constant";
import { IFeedBack, IFeedbackFilters } from "./feedback.interface";
import { Feedback } from "./feedback.model";
import { IGenericResponse } from "../../../interface/common";
import API_Error from "../../../error/apiError";
import { StatusCodes } from "http-status-codes";
import { Request } from "express";
import { IUploadFile } from "../../../interface/file";

import { User } from "../auth/auth.model";
import { Upload } from "../../../utils/file";

const insertFeedbackIntoDB = async (req: Request): Promise<IFeedBack> => {
  const sendingFile = req.file as IUploadFile;
  if (sendingFile) {
    const { result: UploadResult, url } = await Upload.feedbackFileUploadIntoR2(
      sendingFile,
      "feedback"
    );
    const payload = {
      file: url,
      key: UploadResult.Key,
      ...req.body
    };
    const result = await Feedback.create(payload);
    return result;
  } else {
    const payload = {
      ...req.body
    };
    const result = await Feedback.create(payload);
    return result;
  }
};

const getAllFeedbackFromDB = async (
  filters: IFeedbackFilters,
  paginationOptions: IPaginationOptions,
  userId: string
): Promise<IGenericResponse<IFeedBack[]>> => {
  const user = await User.findById(userId);
  if (!user) {
    throw new API_Error(
      StatusCodes.NOT_FOUND,
      "The requested user could not be found."
    );
  }
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];
  // Search needs $or for searching in specified fields
  if (searchTerm) {
    andConditions.push({
      $or: feedBackSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: "i"
        }
      }))
    });
  }
  // Filters needs $and to fullfill all the conditions
  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value
      }))
    });
  }

  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Feedback.find(whereConditions)
    .skip(skip)
    .limit(limit)
    .sort(sortConditions);
  const total = await Feedback.countDocuments(whereConditions);
  return {
    meta: {
      page,
      limit,
      total
    },
    data: result
  };
};
const getFeedBackByIdFromDB = async (id: string): Promise<IFeedBack | null> => {
  const result = await Feedback.findById(id);
  if (!result) {
    throw new API_Error(
      StatusCodes.NOT_FOUND,
      "The requested feedback could not be found."
    );
  }
  return result;
};

const updateFeedbackByIdIntoDB = async (
  id: string,
  data: Partial<IFeedBack>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<IFeedBack | null | any> => {
  const result = await Feedback.updateOne({ _id: id }, data, { new: true });
  return result;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const deleteFeedbackFromDB = async (id: string): Promise<any> => {
  const result = await Feedback.deleteOne({ _id: id });
  return result;
};

export const FeedbackService = {
  insertFeedbackIntoDB,
  getAllFeedbackFromDB,
  getFeedBackByIdFromDB,
  updateFeedbackByIdIntoDB,
  deleteFeedbackFromDB
};
