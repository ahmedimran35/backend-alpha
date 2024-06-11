/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Request } from "express";

import { IPaginationOptions } from "../../../interface/pagination";
import { paginationHelpers } from "../../../helper/paginationHelper";

import { IGenericResponse } from "../../../interface/common";
import API_Error from "../../../error/apiError";
import { StatusCodes } from "http-status-codes";

import { IR2Response, IUploadFile } from "../../../interface/file";
import { FileUploadHelper } from "../../../helper/fileUploadHelper";
import {
  IDesignTemplate,
  IDesignTemplateFilters
} from "./design-template.interface";
import { sendArrayReturnObject } from "../../../utils/utils";
import { DesignTemplate } from "./design-template.model";
import { designTemplateSearchableFields } from "./design-template.constant";

import { findAndStoreKeyword } from "../../../utils/storeKeyword";
import {
  checkSearchTermAndPushAndCondition,
  filterDataAndPushAndCondition,
  sortingConditionData
} from "../../../utils/searchTermAndFilteringOrSorting";
import { Upload } from "../../../utils/file";
import { User } from "../auth/auth.model";

//add
const allDesignTemplateByUserFromDB = async (
  filters: IDesignTemplateFilters,
  pagination: IPaginationOptions
): Promise<IGenericResponse<IDesignTemplate[]>> => {
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
      designTemplateSearchableFields,
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

  const result = await DesignTemplate.find(whereConditions)
    .skip(skip)
    .limit(limit)
    .sort(sortConditions);

  //* Count total design template
  const total = await DesignTemplate.countDocuments(whereConditions);
  return {
    meta: {
      page,
      limit,
      total
    },
    data: result
  };
};

const getDesignTemplateIdByUserFromDB = async (
  id: string
): Promise<IDesignTemplate | null> => {
  //* Check design template is already exist
  const result = await DesignTemplate.findById(id);

  //* If not  exist retune 404 error
  if (!result) {
    throw new API_Error(
      StatusCodes.NOT_FOUND,
      "The requested Design Template could not be found."
    );
  }
  //* Increase Every Click(Every API Call Increase One)
  result.click = result.click + 1;
  //* Save Data into database
  await result.save();
  return result;
};
const getDesignTemplateIdAdminFromDB = async (
  id: string
): Promise<IDesignTemplate | null> => {
  //* Finding Design template into database
  const result = await DesignTemplate.findById(id);
  return result;
};

const allDesignTemplateByAdminFromDB = async (
  filters: IDesignTemplateFilters,
  pagination: IPaginationOptions
): Promise<IGenericResponse<IDesignTemplate[]>> => {
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
      designTemplateSearchableFields,
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
  const result = await DesignTemplate.find(whereConditions)
    .skip(skip)
    .limit(limit)
    .sort(sortConditions);

  //* Count total Design Template
  const total = await DesignTemplate.countDocuments(whereConditions);
  return {
    meta: {
      page,
      limit,
      total
    },
    data: result
  };
};
//  new version (Current)
const DesignTemplatesInsertIntoDB = async (
  req: Request,
  userId: string
): Promise<IDesignTemplate> => {
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
  const imageUploadFile = req.files["asset-file"][0] as IUploadFile;

  //* If client cant sent file throw 400 error
  if (!imageUploadFile) {
    throw new API_Error(
      StatusCodes.BAD_REQUEST,
      "No file has been selected. Please choose a file to proceed."
    );
  }

  //* image upload to r2 storage
  const { result, url } = await Upload.designTemplateInsertPSDFileInR2(
    imageUploadFile,
    "design-templates"
  );

  //* Preview File Received
  //@ts-ignore
  const previewPSDUploadFile = req.files["preview-file"]?.[0] ?? null;

  //* image upload to r2 storage
  const { result: previewResult, url: previewUrl } =
    await Upload.designTemplateInsertPSDFileInR2(
      previewPSDUploadFile,
      "design-templates"
    );
  // get file size
  // const fileTypeImage = getFileType(imageUploadFile)

  //*   send array or convert object
  const tags = sendArrayReturnObject(req.body.tags);
  //*  set tags
  req.body.tags = tags;
  let uploadData = {};
  //* Assign Data
  uploadData = {
    ...req.body,
    key: result?.Key,
    url: url,
    type: "psd",
    previewUrl: previewUrl,
    previewKey: previewResult?.Key,
    uploadedBy: isExistUser._id
  };
  //* Store data into database
  const finalResult = await DesignTemplate.create(uploadData);

  return finalResult;
};
//  new version (Current)
const deleteDesignTemplateByIdIntoDB = async (
  key: string,
  previewKey: string
): Promise<any> => {
  //* Delete icon file into r2 bucket
  await FileUploadHelper.deleteFileIntoR2Storage(key, "design-templates");
  await FileUploadHelper.deleteFileIntoR2Storage(
    previewKey,
    "design-templates"
  );

  //* delete icon into database
  const result = await DesignTemplate.deleteOne({ key: key });
  return result;
};
//  new version (Current)
const updateDesignTemplateByIdIntoDB = async (
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
  //* find Design Template
  const designTemplateData = await DesignTemplate.findById(id);

  if (!designTemplateData) {
    throw new API_Error(
      StatusCodes.NOT_FOUND,
      "The requested design template could not be found."
    );
  }

  //@ts-ignore
  const imageUploadFile = req.files["asset-file"]?.[0] ?? null;
  //@ts-ignore
  const previewPSDUploadFile = req.files["preview-file"]?.[0] ?? null;

  //* Check Icon Tag send
  if (req?.body?.tags && Array.isArray(req?.body?.tags)) {
    const tags = sendArrayReturnObject(req.body.tags);
    req.body.tags = tags;
  }

  let updateImageFile: { result: IR2Response | any; url: string } = {
    result: {},
    url: ""
  };

  let updatePreviewFile: { result: IR2Response | any; url: string } = {
    result: {},
    url: ""
  };
  //* If Update File Check
  if (imageUploadFile) {
    let finalDownloadKey;
    const modifyKey = designTemplateData?.key.split("/")[1];
    if (modifyKey) {
      finalDownloadKey = modifyKey;
    } else {
      finalDownloadKey = designTemplateData?.key;
    }
    //* Upload file into R2 Bucket
    updateImageFile = await Upload.designTemplateUpdatePSDFileInR2(
      imageUploadFile,
      finalDownloadKey as string,
      "design-templates"
    );
  }
  if (previewPSDUploadFile) {
    updatePreviewFile = await Upload.designTemplateUpdatePSDFileInR2(
      previewPSDUploadFile,
      designTemplateData?.previewKey as string,
      "design-templates"
    );
  }
  //* Assign to Variable
  const updatePayload = {
    ...req.body,
    key: updateImageFile?.result.key
      ? updateImageFile?.result.key
      : designTemplateData?.key,
    url: updateImageFile?.url ? updateImageFile?.url : designTemplateData?.url,
    previewUrl: updatePreviewFile?.url
      ? updatePreviewFile?.url
      : designTemplateData?.previewUrl,
    previewKey: updatePreviewFile?.result.key
      ? updatePreviewFile?.result.key
      : designTemplateData?.previewKey,
    updatedBy: isExistUser?._id
  };
  //* Store Icon data in database
  const result = await DesignTemplate.findByIdAndUpdate(id, updatePayload, {
    new: true
  });
  return result;
};
export const DesignTemplateService = {
  updateDesignTemplateByIdIntoDB,
  allDesignTemplateByAdminFromDB,

  getDesignTemplateIdAdminFromDB,
  getDesignTemplateIdByUserFromDB,
  allDesignTemplateByUserFromDB,

  DesignTemplatesInsertIntoDB,
  deleteDesignTemplateByIdIntoDB
};
