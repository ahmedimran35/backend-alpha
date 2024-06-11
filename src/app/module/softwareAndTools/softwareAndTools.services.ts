/* eslint-disable @typescript-eslint/no-explicit-any */
import { StatusCodes } from "http-status-codes";
import API_Error from "../../../error/apiError";
import {
  ISoftwareAndTools,
  ISoftwareAndToolsFilters
} from "./softwareAndTools.interface";
import { SoftwareAndTools } from "./softwareAndTools.model";
import { IPaginationOptions } from "../../../interface/pagination";
import { paginationHelpers } from "../../../helper/paginationHelper";
import { softwareAndToolsSearchableFields } from "./softwareAndTools.constant";
import { IGenericResponse } from "../../../interface/common";
import { Request } from "express";
import { IUploadFile } from "../../../interface/file";
import { FileUploadHelper } from "../../../helper/fileUploadHelper";

import {
  checkSearchTermAndPushAndCondition,
  filterDataAndPushAndCondition,
  sortingConditionData
} from "../../../utils/searchTermAndFilteringOrSorting";
import { Upload } from "../../../utils/file";

//Old Version (V-1)

const viewAllSoftwareAndToolsFromDB = async (
  filter: ISoftwareAndToolsFilters,
  pagination: IPaginationOptions
): Promise<IGenericResponse<ISoftwareAndTools[]>> => {
  const { searchTerm, subCategories, ...filterData } = filter;
  const { skip, limit, page, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(pagination);

  const andCondition: any = [];
  if (searchTerm) {
    checkSearchTermAndPushAndCondition(
      andCondition,
      softwareAndToolsSearchableFields,
      searchTerm
    );
  }
  //
  if (subCategories) {
    andCondition.push({ subCategories: { $in: [subCategories] } });
  }

  if (Object.keys(filterData).length) {
    filterDataAndPushAndCondition(andCondition, filterData);
  }

  const sortConditions = sortingConditionData(sortBy, sortOrder);
  const whereConditions = andCondition.length > 0 ? { $and: andCondition } : {};
  const result = await SoftwareAndTools.find(whereConditions)
    .skip(skip)
    .limit(limit)
    .sort(sortConditions);
  const total = await SoftwareAndTools.countDocuments(whereConditions);
  return {
    meta: { page, limit, total },
    data: result
  };
};

const viewSoftwareAndToolsByIdFromDB = async (
  id: string
): Promise<ISoftwareAndTools> => {
  const result = await SoftwareAndTools.findById(id);
  if (!result) {
    throw new API_Error(StatusCodes.NOT_FOUND, "Software and tools not found!");
  }
  result.click = result.click + 1;
  await result.save();
  return result;
};
const viewSoftwareAndToolsByIdWithAdminFromDB = async (
  id: string
): Promise<ISoftwareAndTools> => {
  const result = await SoftwareAndTools.findById(id);
  if (!result) {
    throw new API_Error(StatusCodes.NOT_FOUND, "Software and tools not found!");
  }
  return result;
};

const visitedPartnerWebsiteCount = async (
  id: string
): Promise<{ message: string }> => {
  const softwareAndTools = await SoftwareAndTools.findById(id);
  if (!softwareAndTools) {
    throw new API_Error(
      StatusCodes.NOT_FOUND,
      "Software and tools data not found!"
    );
  }
  softwareAndTools.visited = softwareAndTools.visited + 1;
  await softwareAndTools.save();
  return {
    message: "Visit Calculate Success"
  };
};
// new version (Current)
const insertSoftWareAndToolIntoDB = async (
  req: Request
): Promise<ISoftwareAndTools> => {
  const sendingFile = req.file as IUploadFile;
  // upload r2
  const { result, url } = await Upload.softwareAndToolsInsertFileInR2(
    sendingFile,
    "software-and-tools"
  );
  req.body.data = JSON.parse(req.body.data);

  let discountPercentage = 0;
  if (req.body.data.pricing !== "Free" && req.body.data.discountPrice) {
    const priceAfterDiscount = parseFloat(req.body.data.discountPrice);
    const priceBeforeDiscount = parseFloat(req.body.data.regularPrice);

    // discountPercentage =
    //   (parseInt(req.body.data.discountPrice) /
    //     parseInt(req.body.data.regularPrice)) *
    //   100;
    discountPercentage =
      (priceBeforeDiscount - priceAfterDiscount) / priceBeforeDiscount;
    discountPercentage *= 100;
  }

  const uploadData = {
    ...req.body.data,
    key: result.Key,
    url: url,
    discountPercentage
  };
  const resultData = await SoftwareAndTools.create(uploadData);

  return resultData;
};
// new version (Current)
const deleteSoftwareAndToolsFromDB = async (
  key: string
): Promise<ISoftwareAndTools | null | any> => {
  await FileUploadHelper.deleteFileIntoR2Storage(key, "software-and-tools");
  const result = await SoftwareAndTools.deleteOne({ key }, { new: true });

  return result;
};
// new version (Current)
const updateSoftwareAndToolsIntoDB = async (
  req: Request
): Promise<ISoftwareAndTools | null | unknown> => {
  const toolsAndSoftwareData = await SoftwareAndTools.findById(req.params.id);
  // Perse Data
  req.body.data = JSON.parse(req.body.data);
  // file get and upload cloudinary
  const SendingFile = req.file as IUploadFile;
  // if pricing is not free calculate is discount or percentage
  let updatedData = {};
  let discountPercentage;
  if (req.body.data.pricing !== "Free" && req.body.data.discountPrice) {
    const priceAfterDiscount = parseFloat(req.body.data.discountPrice);
    const priceBeforeDiscount = parseFloat(req.body.data.regularPrice);

    discountPercentage =
      (priceBeforeDiscount - priceAfterDiscount) / priceBeforeDiscount;
    discountPercentage *= 100;
  }

  // if pricing is free assign regular price, discount and percentage 0
  if (req.body.data.pricing == "Free") {
    req.body.data.regularPrice = 0;
    req.body.data.discountPrice = 0;
    req.body.data.discountPercentage = 0;
  }

  if (SendingFile) {
    const updateDatedImage = await Upload.softwareAndToolsUpdateFileInR2(
      SendingFile,
      toolsAndSoftwareData?.key as string,
      "software-and-tools"
    );

    // delete req.body.data.public_id
    updatedData = {
      ...req.body.data,
      key: updateDatedImage.result.Key,
      url: updateDatedImage?.url,
      discountPercentage
    };
  } else {
    updatedData = {
      ...req.body.data,
      discountPercentage
    };
  }

  const result = await SoftwareAndTools.findByIdAndUpdate(
    req.params.id,
    updatedData,
    {
      new: true
    }
  );

  return result;
};
export const SoftwareAndToolsServices = {
  insertSoftWareAndToolIntoDB,
  viewAllSoftwareAndToolsFromDB,
  viewSoftwareAndToolsByIdFromDB,
  viewSoftwareAndToolsByIdWithAdminFromDB,
  updateSoftwareAndToolsIntoDB,
  visitedPartnerWebsiteCount,
  deleteSoftwareAndToolsFromDB
};
