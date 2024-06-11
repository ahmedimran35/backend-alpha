/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Request } from "express";
import { FileUploadHelper } from "../../../helper/fileUploadHelper";
import { IUploadFile } from "../../../interface/file";
import { getFileType } from "../course-add-learing/course-add-learning.utilis";
import { IIcons } from "./icon.interface";
import { parseTags, sendArrayReturnObject } from "../../../utils/utils";
import { Icons } from "./icon.model";
import { ICourseAndLearningFilters } from "../course-add-learing/course-add-learning.interface";
import { IPaginationOptions } from "../../../interface/pagination";
import { IGenericResponse } from "../../../interface/common";
import { paginationHelpers } from "../../../helper/paginationHelper";
import { iconsSearchableFields } from "./icon.constant";
import { StatusCodes } from "http-status-codes";
import API_Error from "../../../error/apiError";

import { findAndStoreKeyword } from "../../../utils/storeKeyword";
import {
  checkSearchTermAndPushAndCondition,
  filterDataAndPushAndCondition,
  sortingConditionData
} from "../../../utils/searchTermAndFilteringOrSorting";
import { Upload } from "../../../utils/file";
import { User } from "../auth/auth.model";
//* Insert Bulk Icon Business Logic-------
const iconBulkUploadSystem = async (req: Request, userId: string) => {
  //* Check Is already exist user if not found retune 404 error
  const isExistUser = await User.findById(userId);

  if (!isExistUser) {
    throw new API_Error(
      StatusCodes.NOT_FOUND,
      "The requested user could not be found."
    );
  }
  const files = req.files as any;
  const titles = req.body.titles;

  const categories = req.body.categories;

  const tags = req.body.tags;

  const metaTitles = req.body.metaTitles;

  const metaDescriptions = req.body.metaDescriptions;

  const uploadedUserEmails = req.body.uploadedUserEmails;
  const alternativeTexts = req.body.alternativeTexts;
  const subCategories = req.body.subCategories;
  const styles = req.body.styles;
  //* File Retune Promise
  const promise = files?.map(async (file: any, index: number) => {
    const { result, url } = await Upload.iconInsertFileInR2(file, "icons");
    const newFile = new Icons({
      title: titles[index],
      category: categories[index],
      url: url,
      type: getFileType(file),
      key: result.Key,
      tags: parseTags(tags[index]),
      metaTitle: metaTitles[index],
      metaDescription: metaDescriptions[index],
      uploadedUserEmail: uploadedUserEmails[index],
      alternativeText: alternativeTexts[index],
      subCategory: subCategories[index],
      style: styles[index],
      uploadedBy: isExistUser._id
    });

    await newFile.save();

    return newFile;
  });

  const results = await Promise.all(promise);

  return results;
};

const iconsInsertIntoDB = async (
  req: Request,
  userId: string
): Promise<IIcons> => {
  //* Check Is already exist user if not found retune 404 error
  const isExistUser = await User.findById(userId);

  if (!isExistUser) {
    throw new API_Error(
      StatusCodes.NOT_FOUND,
      "The requested user could not be found."
    );
  }
  //* File Received
  //@ts-ignore
  const imageUploadFile = req.file as IUploadFile;

  if (!imageUploadFile) {
    throw new API_Error(
      StatusCodes.NOT_FOUND,
      "No file has been selected. Please choose a file to proceed."
    );
  }

  //* image upload to r2 storage
  const { result, url } = await Upload.iconInsertFileInR2(
    imageUploadFile,
    "icons"
  );

  //* get file type
  const fileTypeImage = getFileType(imageUploadFile);
  //* Parsing Data
  // req.body.data = req?.body?.data;

  //*   send array or convert object
  const tags = sendArrayReturnObject(req.body.tags);
  //*  set tags
  req.body.tags = tags;
  let uploadData = {};
  //* Assign Data
  uploadData = {
    ...req.body,
    key: result.Key,
    url: url,
    type: fileTypeImage,
    uploadedBy: isExistUser._id
  };
  //* Store data into database
  const finalResult = await Icons.create(uploadData);
  return finalResult;
};

//* Get All Icon From User Business Logic------
const allIconsByUserFromDB = async (
  filters: ICourseAndLearningFilters,
  pagination: IPaginationOptions
): Promise<IGenericResponse<IIcons[]>> => {
  //* Destructuring Filter data
  const { searchTerm, ...filterData } = filters;
  //* Calculate Pagination Data
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(pagination);
  const andCondition: any = [];
  if (searchTerm) {
    //* Check SearchTerm If Have SearchTerm Then Push And Condition
    await findAndStoreKeyword(searchTerm);
    checkSearchTermAndPushAndCondition(
      andCondition,
      iconsSearchableFields,
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

  const result = await Icons.find(whereConditions)
    .skip(skip)
    .limit(limit)
    .sort(sortConditions);

  //* Count total Icon
  const total = await Icons.countDocuments(whereConditions);
  return {
    meta: {
      page,
      limit,
      total
    },
    data: result
  };
};
//* Get Single Icon From User Business Logic------
const getIconsIdByUserFromDB = async (id: string): Promise<IIcons | null> => {
  const result = await Icons.findById(id);
  //* If Not Icon find Throw Array Not Found
  if (!result) {
    throw new API_Error(
      StatusCodes.NOT_FOUND,
      "The requested icon could not be found."
    );
  }
  //* Increase Every Click(Every API Call Increase One)
  result.click = result.click + 1;
  //* Save Data into database
  await result.save();
  return result;
};
// Get Single Icon From Admin Business Logic------
const getIconsIdAdminFromDB = async (id: string): Promise<IIcons | null> => {
  //* Finding icon into database
  const result = await Icons.findById(id);
  return result;
};

// Get ALL Icon From Admin  Business Logic----
const allIconsByAdminFromDB = async (
  filters: ICourseAndLearningFilters,
  pagination: IPaginationOptions
): Promise<IGenericResponse<IIcons[]>> => {
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
      iconsSearchableFields,
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
  const result = await Icons.find(whereConditions)
    .skip(skip)
    .limit(limit)
    .sort(sortConditions);
  //* Count total Icon
  const total = await Icons.countDocuments(whereConditions);
  return {
    meta: {
      page,
      limit,
      total
    },
    data: result
  };
};

const updateIconsByIdIntoDB = async (
  id: string,
  req: Request,
  userId: string
): Promise<any> => {
  const isExistUser = await User.findById(userId);

  if (!isExistUser) {
    throw new API_Error(
      StatusCodes.NOT_FOUND,
      "The requested user could not be found."
    );
  }
  //* find Icon
  const icon = await Icons.findById(id);

  //* If Not exist icon retune 404 error
  if (!icon) {
    throw new API_Error(
      StatusCodes.NOT_FOUND,
      "The requested icon could not be found."
    );
  }

  //* Check Icon Tag send
  if (req?.body?.tags && Array.isArray(req?.body?.tags)) {
    const tags = sendArrayReturnObject(req.body.tags);
    req.body.tags = tags;
  }
  const SendingFile = req.file as IUploadFile;
  let updatedData = {};
  //* If Update File Check
  if (SendingFile) {
    //* Upload Icon file into R2 Bucket
    const updateDatedImage = await Upload.iconUpdateFileInR2(
      SendingFile,
      icon.key,
      "icons"
    );

    // delete req.body.data.public_id
    //* Assign to Variable
    updatedData = {
      ...req.body,
      key: updateDatedImage?.result.Key,
      url: updateDatedImage?.url,
      updatedBy: isExistUser?._id
    };
    //* Store Icon data in database
    const result = await Icons.findByIdAndUpdate(id, updatedData, {
      new: true
    });

    return result;
  }

  updatedData = {
    ...req.body,
    updatedBy: isExistUser?._id
  };

  const result = await Icons.findByIdAndUpdate(id, updatedData, { new: true });

  return result;
};

const deleteIconsByIdIntoDB = async (key: string): Promise<any> => {
  //* Delete icon file into r2 bucket
  await FileUploadHelper.deleteFileIntoR2Storage(key, "icons");
  //* delete icon into database
  const result = await Icons.deleteOne({ key });
  return result;
};
export const IconsService = {
  iconsInsertIntoDB,
  allIconsByUserFromDB,
  getIconsIdByUserFromDB,
  getIconsIdAdminFromDB,
  deleteIconsByIdIntoDB,
  updateIconsByIdIntoDB,
  allIconsByAdminFromDB,
  iconBulkUploadSystem
};
