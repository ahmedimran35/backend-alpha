/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request } from "express";
import { IStockPhotos, IStockPhotosFilters } from "./stockPhotos.interface";
import { IUploadFile } from "../../../interface/file";
import { FileUploadHelper } from "../../../helper/fileUploadHelper";

import { StockPhotos } from "./stockPhotos.model";
import { IPaginationOptions } from "../../../interface/pagination";
import { paginationHelpers } from "../../../helper/paginationHelper";

import { stockPhotosSearchableFields } from "./stockPhotos.constant";

import { IGenericResponse } from "../../../interface/common";
import API_Error from "../../../error/apiError";
import { StatusCodes } from "http-status-codes";
import { getFileType, sendArrayReturnObject } from "../../../utils/utils";
import { findAndStoreKeyword } from "../../../utils/storeKeyword";
import {
  checkSearchTermAndPushAndCondition,
  filterDataAndPushAndCondition,
  sortingConditionData
} from "../../../utils/searchTermAndFilteringOrSorting";
import { Upload } from "../../../utils/file";
import { User } from "../auth/auth.model";

const allStockPhotosByUserFromDB = async (
  filters: IStockPhotosFilters,
  pagination: IPaginationOptions
): Promise<IGenericResponse<IStockPhotos[]>> => {
  //* Destructuring Filter data
  const { searchTerm, ...filterData } = filters;
  //* Calculate Pagination Data
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(pagination);
  const andCondition: any = [];
  // searching asset
  if (searchTerm) {
    //* Check SearchTerm If Have SearchTerm Then Push And Condition
    await findAndStoreKeyword(searchTerm);
    checkSearchTermAndPushAndCondition(
      andCondition,
      stockPhotosSearchableFields,
      searchTerm
    );
  }

  //* Check filtering Data if Have Filtering Then Push And Condition
  if (Object.keys(filterData).length) {
    filterDataAndPushAndCondition(andCondition, filterData);
  }

  //* Check Sorting and Sort Order
  const sortConditions = sortingConditionData(sortBy, sortOrder);
  //*  Where Condition
  const whereConditions = andCondition.length > 0 ? { $and: andCondition } : {};
  // result
  const result = await StockPhotos.find(whereConditions)
    .skip(skip)
    .limit(limit)
    .sort(sortConditions);
  //* Count total Stock Photo
  const total = await StockPhotos.countDocuments(whereConditions);
  return {
    meta: {
      page,
      limit,
      total
    },
    data: result
  };
};

const getStockPhotosIdByUserFromDB = async (
  id: string
): Promise<IStockPhotos | null> => {
  //* Check design template is already exist
  const result = await StockPhotos.findById(id);
  //* If not  exist retune 404 error
  if (!result) {
    throw new API_Error(
      StatusCodes.NOT_FOUND,
      "The requested Stock Photo could not be found."
    );
  }
  //* Increase Every Click(Every API Call Increase One)
  result.click = result.click + 1;

  //* Save Data into database
  await result.save();
  return result;
};
const getStockPhotosIdByAdminFromDB = async (
  id: string
): Promise<IStockPhotos | null> => {
  //* Finding Stock Photo into database
  const result = await StockPhotos.findById(id);
  return result;
};

const allStockPhotosByAdminFromDB = async (
  filters: IStockPhotosFilters,
  pagination: IPaginationOptions
): Promise<IGenericResponse<IStockPhotos[]>> => {
  //* Destructuring Filter data
  const { searchTerm, ...filterData } = filters;

  //* Calculate Pagination Data
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(pagination);
  const andCondition: any = [];
  if (searchTerm) {
    //* Check SearchTerm If Have SearchTerm Then Push And Condition
    checkSearchTermAndPushAndCondition(
      andCondition,
      stockPhotosSearchableFields,
      searchTerm
    );
  }
  //* Check filtering Data if Have Filtering Then Push And Condition
  if (Object.keys(filterData).length) {
    filterDataAndPushAndCondition(andCondition, filterData);
  }
  //* Check Sorting and Sort Order
  const sortConditions = sortingConditionData(sortBy, sortOrder);
  const whereConditions = andCondition.length > 0 ? { $and: andCondition } : {};
  const result = await StockPhotos.find(whereConditions)
    .skip(skip)
    .limit(limit)
    .sort(sortConditions);
  //* Count total Stock Photo
  const total = await StockPhotos.countDocuments(whereConditions);
  return {
    meta: {
      page,
      limit,
      total
    },
    data: result
  };
};

const stockPhotoInsertIntoDB = async (
  req: Request,
  userId: string
): Promise<IStockPhotos> => {
  //* Check Is already exist user if not found retune 404 error
  const isExistUser = await User.findById(userId);

  if (!isExistUser) {
    throw new API_Error(
      StatusCodes.NOT_FOUND,
      "The requested user could not be found."
    );
  }
  //* getting file upload request from frontend
  const sendingFile = req.file as IUploadFile;

  if (!sendingFile) {
    throw new API_Error(
      StatusCodes.NOT_FOUND,
      "No file has been selected. Please choose a file to proceed."
    );
  }
  //* image upload to r2 storage
  const { result, url } = await Upload.stockPhotoInsertFileInR2(
    sendingFile,
    "stock-photos"
  );

  //* getting file type
  const fileType = getFileType(sendingFile);

  // req.body.data = JSON.parse(req.body.data);

  //* send array or convert object
  const tags = sendArrayReturnObject(req.body.tags);

  //* set tags
  req.body.tags = tags;

  //* Assign Data
  const uploadData = {
    ...req.body,
    key: result.Key,
    url: url,
    type: fileType,
    uploadedBy: isExistUser._id
  };
  //* Store data into database
  const finalResult = await StockPhotos.create(uploadData);
  return finalResult;
};

const deleteStockPhotosByIdIntoDB = async (key: string): Promise<any> => {
  //* Delete Stock Photo file into r2 bucket
  await FileUploadHelper.deleteFileIntoR2Storage(key, "stock-photos");

  //* delete  into database
  const result = await StockPhotos.deleteOne({ key });
  return result;
};

const updateStockPhotosByIdIntoDB = async (
  id: string,
  req: Request,
  userId: string
): Promise<any> => {
  //* Check Is already exist user if not found retune 404 error
  const isExistUser = await User.findById(userId);

  if (!isExistUser) {
    throw new API_Error(
      StatusCodes.NOT_FOUND,
      "The requested user could not be found."
    );
  }

  //* Find Stock Photo
  const stockPhotoData = await StockPhotos.findById(id);

  if (!stockPhotoData) {
    throw new API_Error(
      StatusCodes.NOT_FOUND,
      "The requested Stock Photo could not be found."
    );
  }

  //* Check Icon Tag send
  if (req?.body?.tags && Array.isArray(req?.body?.tags)) {
    const tags = sendArrayReturnObject(req.body.tags);
    req.body.tags = tags;
  }
  //* Receive file
  const SendingFile = req.file as IUploadFile;
  let updatedData = {};

  //* If Update File Check
  if (SendingFile) {
    //* Upload file into R2 Bucket
    const updateDatedImage = await Upload.stockPhotoUpdateFileInR2(
      SendingFile,
      stockPhotoData?.key as string,
      "stock-photos"
    );

    //* Get file type
    const fileTypeImage = getFileType(SendingFile);

    //* Assign data
    updatedData = {
      ...req.body,
      key: updateDatedImage?.result.Key,
      url: updateDatedImage?.url,
      type: fileTypeImage,
      updatedBy: isExistUser?._id
    };

    //* Store data in database
    const result = await StockPhotos.findByIdAndUpdate(id, updatedData, {
      new: true
    });

    return result;
  } else {
    updatedData = {
      ...req.body,
      updatedBy: isExistUser?._id
    };

    const result = await StockPhotos.findByIdAndUpdate(id, updatedData, {
      new: true
    });

    return result;
  }
};

export const StockPhotosServices = {
  allStockPhotosByUserFromDB,
  getStockPhotosIdByUserFromDB,
  getStockPhotosIdByAdminFromDB,
  allStockPhotosByAdminFromDB,
  stockPhotoInsertIntoDB,
  deleteStockPhotosByIdIntoDB,
  updateStockPhotosByIdIntoDB
};
