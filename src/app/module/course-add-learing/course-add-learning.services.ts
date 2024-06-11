/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Request } from "express";
import { IPaginationOptions } from "../../../interface/pagination";
import { paginationHelpers } from "../../../helper/paginationHelper";

import { IGenericResponse } from "../../../interface/common";
import API_Error from "../../../error/apiError";
import { StatusCodes } from "http-status-codes";
import {
  IAllAssetRetuneResult,
  ICourseAndLearning,
  ICourseAndLearningFilters
} from "./course-add-learning.interface";
import { CourseAndLearning } from "./course-add-learning.model";

import {
  allAssetSearchableFields,
  courseAndLearningSearchableFields
} from "./course-add-learning.constant";

import { IR2Response, IUploadFile } from "../../../interface/file";
import { FileUploadHelper } from "../../../helper/fileUploadHelper";
import { sendArrayReturnObject } from "../../../utils/utils";
import { DesignTemplate } from "../design-template/design-template.model";
import { Icons } from "../icon/icon.model";
import { StockPhotos } from "../stockPhotos/stockPhotos.model";

import { findAndStoreKeyword } from "../../../utils/storeKeyword";
import {
  checkSearchTermAndPushAndCondition,
  filterDataAndPushAndCondition,
  sortingConditionData
} from "../../../utils/searchTermAndFilteringOrSorting";
import { Upload } from "../../../utils/file";
import { User } from "../auth/auth.model";

//add--

const allCourseAndLearningsByUserFromDB = async (
  filters: ICourseAndLearningFilters,
  pagination: IPaginationOptions
): Promise<IGenericResponse<ICourseAndLearning[]>> => {
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
      courseAndLearningSearchableFields,
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
  const result = await CourseAndLearning.find(whereConditions)
    .skip(skip)
    .limit(limit)
    .sort(sortConditions);

  //* Count total Course and learning
  const total = await CourseAndLearning.countDocuments(whereConditions);
  return {
    meta: {
      page,
      limit,
      total
    },
    data: result
  };
};

const getCourseAndLearningIdByUserFromDB = async (
  id: string
): Promise<ICourseAndLearning | null> => {
  //* Check design template is already exist
  const result = await CourseAndLearning.findById(id);

  //* If not  exist retune 404 error
  if (!result) {
    throw new API_Error(
      StatusCodes.NOT_FOUND,
      "The requested Course and learning could not be found."
    );
  }
  //* Increase Every Click(Every API Call Increase One)
  result.click = result.click + 1;
  //* Save Data into database
  await result.save();
  return result;
};
const getCourseAndLearningIdAdminFromDB = async (
  id: string
): Promise<ICourseAndLearning | null> => {
  //* Finding Course and learning into database
  const result = await CourseAndLearning.findById(id);
  return result;
};

const allCourseAndLearningByAdminFromDB = async (
  filters: ICourseAndLearningFilters,
  pagination: IPaginationOptions
): Promise<IGenericResponse<ICourseAndLearning[]>> => {
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
      courseAndLearningSearchableFields,
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
  const result = await CourseAndLearning.find(whereConditions)
    .skip(skip)
    .limit(limit)
    .sort(sortConditions);

  //* Count total Course and learning
  const total = await CourseAndLearning.countDocuments(whereConditions);
  return {
    meta: {
      page,
      limit,
      total
    },
    data: result
  };
};

const getAllSearchQueryAssetOperationFromDB = async (
  filters: ICourseAndLearningFilters,
  pagination: IPaginationOptions
): Promise<IAllAssetRetuneResult> => {
  //* Destructuring Filter data
  const { searchTerm, ...filterData } = filters;

  //* Calculate Pagination Data
  const { limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(pagination);

  const andCondition: any = [];
  // if searchTerm
  if (searchTerm) {
    //* Check SearchTerm If Have SearchTerm Then Push And Condition
    await findAndStoreKeyword(searchTerm);

    checkSearchTermAndPushAndCondition(
      andCondition,
      allAssetSearchableFields,
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

  //* get data designTemplate
  const designTemplateData = await DesignTemplate.find(whereConditions)
    .skip(skip)
    .limit(limit)
    .sort(sortConditions);
  const totalDesignTemplate =
    await DesignTemplate.countDocuments(whereConditions);

  //* get Data Icon
  const iconData = await Icons.find(whereConditions)
    .skip(skip)
    .limit(limit)
    .sort(sortConditions);
  const totalICon = await Icons.countDocuments(whereConditions);
  //* get Stock Photo
  const stockPhotoData = await StockPhotos.find(whereConditions)
    .skip(skip)
    .limit(limit)
    .sort(sortConditions);
  const totalStockPhotos = await StockPhotos.countDocuments(whereConditions);
  //* get Stock Photo
  const courseAndLearningData = await CourseAndLearning.find(whereConditions)
    .skip(skip)
    .limit(limit)
    .sort(sortConditions);
  const totalCourseAndLearning =
    await CourseAndLearning.countDocuments(whereConditions);

  return {
    designTemplates: {
      result: designTemplateData,
      total: totalDesignTemplate
    },
    icons: {
      result: iconData,
      total: totalICon
    },
    stockPhotos: {
      result: stockPhotoData,
      total: totalStockPhotos
    },
    courseAndLearnings: {
      result: courseAndLearningData,
      total: totalCourseAndLearning
    }
  };
};

const courseAndLearningsInsertIntoDB = async (
  req: Request,
  userId: string
): Promise<ICourseAndLearning> => {
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
  const imgUploadFile = req.files["asset-file"][0] as IUploadFile;

  //* If client cant sent file throw 400 error
  if (!imgUploadFile) {
    throw new API_Error(
      StatusCodes.BAD_REQUEST,
      "No file has been selected. Please choose a file to proceed."
    );
  }

  //* image upload to r2 storage
  const { result, url } = await Upload.courseAndLearningInsertPSDFileInR2(
    imgUploadFile,
    "course-and-learning"
  );
  //* Preview File Received-
  // @ts-ignore
  const previewUploadFile = req.files["preview-file"]?.[0] ?? null;
  //* If client cant sent file throw 400 error
  if (!previewUploadFile) {
    throw new API_Error(
      StatusCodes.BAD_REQUEST,
      "No file has been selected. Please choose a file to proceed."
    );
  }

  //* image upload to r2 storage
  const { result: previewResult, url: previewUrl } =
    await Upload.courseAndLearningInsertPSDFileInR2(
      previewUploadFile,
      "course-and-learning"
    );
  // get file type
  // const fileTypeImage = getFileType(imgUploadFile)

  //* send array or convert object
  const tags = sendArrayReturnObject(req.body.tags);
  //* set tags--
  req.body.tags = tags;
  let uploadData = {};
  uploadData = {
    ...req.body,
    key: result?.Key,
    url: url,
    type: "pdf",
    previewUrl: previewUrl,
    previewKey: previewResult?.Key,
    uploadedBy: isExistUser._id
  };
  // Store data database
  const finalResult = await CourseAndLearning.create(uploadData);

  return finalResult;
};

const deleteCourseAndLearningByIdIntoDB = async (
  key: string,
  previewKey: string
): Promise<any> => {
  //* Delete  file into r2 bucket
  await FileUploadHelper.deleteFileIntoR2Storage(key, "course-and-learning");
  await FileUploadHelper.deleteFileIntoR2Storage(
    previewKey,
    "course-and-learning"
  );
  //* Delete icon file into db
  const result = await CourseAndLearning.deleteOne({ key: key });
  return result;
};

const updateCourseAndLearningByIdIntoDB = async (
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

  //* Find data course and learning
  const courseAndLearningData = await CourseAndLearning.findById(id);

  if (!courseAndLearningData) {
    throw new API_Error(
      StatusCodes.NOT_FOUND,
      "The requested Course and learning could not be found."
    );
  }
  //* Receive File
  //@ts-ignore
  const assetFile = req.files["asset-file"];
  //* Receive Preview File
  const imageUploadFile = assetFile
    ? //@ts-ignore
      (req.files["asset-file"][0] as IUploadFile)
    : null;

  //@ts-ignore
  const previewUploadFile = req.files["preview-file"]?.[0] ?? null;

  //* Check Icon Tag send
  if (req?.body?.tags && Array.isArray(req?.body?.tags)) {
    const tags = sendArrayReturnObject(req.body.tags);
    req.body.tags = tags;
  }

  const updateImageFile: { result: IR2Response | any; url: string } = {
    result: {},
    url: ""
  };

  const updatePreviewFile: { result: IR2Response | any; url: string } = {
    result: {},
    url: ""
  };

  // update image for cloudinary
  if (imageUploadFile) {
    const response = await Upload.courseAndLearningUpdatePSDFileInR2(
      imageUploadFile,
      courseAndLearningData?.key as string,
      "course-and-learning"
    );

    updateImageFile.result = response.result;
    updateImageFile.url = response.url;
  }
  if (previewUploadFile) {
    let finalDownloadKey;
    const modifyKey = courseAndLearningData?.previewKey.split("/")[1];
    if (modifyKey) {
      finalDownloadKey = modifyKey;
    } else {
      finalDownloadKey = courseAndLearningData?.previewKey;
    }
    const response = await Upload.courseAndLearningUpdatePSDFileInR2(
      previewUploadFile,
      finalDownloadKey as string,
      "course-and-learning"
    );
    updatePreviewFile.result = response.result;
    updatePreviewFile.url = response.url;
  }

  const updatePayload = {
    ...req.body,
    key: updateImageFile?.result.key
      ? updateImageFile?.result.key
      : courseAndLearningData?.key,
    url: updateImageFile?.url
      ? updateImageFile?.url
      : courseAndLearningData?.url,
    previewUrl: updatePreviewFile?.url
      ? updatePreviewFile?.url
      : courseAndLearningData?.previewUrl,
    previewKey: updatePreviewFile?.result.key
      ? updatePreviewFile?.result.key
      : courseAndLearningData?.previewKey,
    updatedBy: isExistUser?._id
  };
  const result = await CourseAndLearning.findByIdAndUpdate(id, updatePayload, {
    new: true
  });

  return result;
};

export const CourseAndLearningService = {
  getAllSearchQueryAssetOperationFromDB,
  allCourseAndLearningByAdminFromDB,
  updateCourseAndLearningByIdIntoDB,
  deleteCourseAndLearningByIdIntoDB,
  getCourseAndLearningIdAdminFromDB,
  getCourseAndLearningIdByUserFromDB,
  allCourseAndLearningsByUserFromDB,
  courseAndLearningsInsertIntoDB
};
