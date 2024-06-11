/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { StatusCodes } from "http-status-codes";
import API_Error from "../../../error/apiError";
import { IDownload, IDownloadFilters } from "./download.interface";
import { Download } from "./download.model";
import { IPaginationOptions } from "../../../interface/pagination";
import { SortOrder } from "mongoose";
import { paginationHelpers } from "../../../helper/paginationHelper";
import { IGenericResponse } from "../../../interface/common";
import { CourseAndLearning } from "../course-add-learing/course-add-learning.model";
import { downloadSearchableFields } from "./download.constant";
import { User } from "../auth/auth.model";
import { addHours } from "date-fns";

import { DesignTemplate } from "../design-template/design-template.model";
import { StockPhotos } from "../stockPhotos/stockPhotos.model";
import { Icons } from "../icon/icon.model";

// URL/download/asset-download (POST)
//* course and learning  data save controller
const saveCourseAndLearningDownloadIntoDB = async (
  data: IDownload
): Promise<IDownload> => {
  //* Check Is already exist user if not found retune 404 error
  const user = await User.findOne({ email: data.userEmail });

  //* throw error if user is not logged ins
  if (!user) {
    throw new API_Error(
      StatusCodes.NOT_FOUND,
      "The requested user could not be found."
    );
  }
  //* Check Is already does not  exist asset if not found retune 404 error
  const assets = await CourseAndLearning.findById(data.assets);

  //* if the assets does not exits throw an error
  if (!assets) {
    throw new API_Error(
      StatusCodes.NOT_FOUND,
      "The requested Asset could not be found."
    );
  }

  //* Get time last 24 hours
  const twentyFourHoursAgo = addHours(new Date(), -24);

  // * Check if user already downloaded the asset
  //* check today download same asset
  const isToDayAlreadyDownload = await Download.findOne({
    $and: [
      { assets: assets?._id },
      { user: user?._id },
      { createdAt: { $gte: twentyFourHoursAgo } }
    ]
  });
  //* throw an error for already downloaded limit
  if (isToDayAlreadyDownload) {
    throw new API_Error(StatusCodes.CONFLICT, "Download Limit Exceeded");
  }

  // * Check if user exited 5 download limit
  //* check five download per day
  const isToDayFiveDownloadAsset = await Download.find({
    $and: [{ user: user?._id, createdAt: { $gte: twentyFourHoursAgo } }]
  });
  if (isToDayFiveDownloadAsset?.length > 10) {
    throw new API_Error(StatusCodes.CONFLICT, "Maximum Ten Assets Per Day");
  }

  const allReadyDownloadAssets = await Download.findOne({
    $and: [{ user: user?._id }, { assets: assets?._id }]
  });

  if (!allReadyDownloadAssets) {
    assets.finalDownload = assets.finalDownload + 1;
  }
  assets.download = assets.download + 1;
  await assets.save();

  //@ts-ignore
  data.user = user?._id;

  //* add asset model to refer to collection for dynamic population
  data.assetsModel = "Course-and-learning";

  const result = await Download.create(data);

  return result;
};
//* design template  data save controller
const saveDesignTemplateDownloadIntoDB = async (
  data: IDownload
  // userId: string,
): Promise<IDownload> => {
  //* Check Is already exist user if not found retune 404 error
  const user = await User.findOne({ email: data.userEmail });
  if (!user) {
    throw new API_Error(
      StatusCodes.NOT_FOUND,
      "The requested user could not be found."
    );
  }
  //* Check Is already exist asset if not found retune 404 error
  const assets = await DesignTemplate.findById(data.assets);
  if (!assets) {
    throw new API_Error(
      StatusCodes.NOT_FOUND,
      "The requested Asset could not be found."
    );
  }
  //* Get time last 24 hours
  const twentyFourHoursAgo = addHours(new Date(), -24);

  //* check today download same asset
  const isToDayAlreadyDownload = await Download.findOne({
    $and: [
      { assets: assets?._id },
      { user: user?._id },
      { createdAt: { $gte: twentyFourHoursAgo } }
    ]
  });

  //* If already download asset retune error 409
  if (isToDayAlreadyDownload) {
    throw new API_Error(StatusCodes.CONFLICT, "Download Limit Exceeded");
  }

  //* check five download per day
  const isToDayFiveDownloadAsset = await Download.find({
    $and: [{ user: user?._id, createdAt: { $gte: twentyFourHoursAgo } }]
  });

  //* if download per day 10 asset retune error 409
  if (isToDayFiveDownloadAsset?.length > 10) {
    throw new API_Error(StatusCodes.CONFLICT, "Maximum Ten Assets Per Day");
  }

  //* get data already download
  const allReadyDownloadAssets = await Download.findOne({
    $and: [{ user: user?._id }, { assets: assets?._id }]
  });

  //* increase download count
  if (!allReadyDownloadAssets) {
    assets.finalDownload = assets.finalDownload + 1;
  }
  assets.download = assets.download + 1;
  await assets.save();

  //@ts-ignore
  data.user = user?._id;
  //* add asset model to refer to collection for dynamic population
  data.assetsModel = "Design-Template";

  //* Store Data into database
  const result = await Download.create(data);

  return result;
};
//* stock photo  data save controller
const saveStockPhotosDownloadIntoDB = async (
  data: IDownload
): Promise<IDownload> => {
  //* Check Is already exist user if not found retune 404 error
  const user = await User.findOne({ email: data.userEmail });
  if (!user) {
    throw new API_Error(
      StatusCodes.NOT_FOUND,
      "The requested user could not be found."
    );
  }
  const assets = await StockPhotos.findById(data.assets);
  if (!assets) {
    throw new API_Error(
      StatusCodes.NOT_FOUND,
      "The requested Asset could not be found."
    );
  }
  const twentyFourHoursAgo = addHours(new Date(), -24);

  //* check today download same asset
  const isToDayAlreadyDownload = await Download.findOne({
    $and: [
      { assets: assets?._id },
      { user: user?._id },
      { createdAt: { $gte: twentyFourHoursAgo } }
    ]
  });

  if (isToDayAlreadyDownload) {
    throw new API_Error(StatusCodes.CONFLICT, "Download Limit Exceeded");
  }

  //* check five download per day
  const isToDayFiveDownloadAsset = await Download.find({
    $and: [{ user: user?._id, createdAt: { $gte: twentyFourHoursAgo } }]
  });
  if (isToDayFiveDownloadAsset?.length > 10) {
    throw new API_Error(StatusCodes.CONFLICT, "Maximum Ten Assets Per Day");
  }

  const allReadyDownloadAssets = await Download.findOne({
    $and: [{ user: user?._id }, { assets: assets?._id }]
  });

  if (!allReadyDownloadAssets) {
    assets.finalDownload = assets.finalDownload + 1;
  }
  assets.download = assets.download + 1;
  await assets.save();

  //@ts-ignore
  data.user = user?._id;
  //* add asset model to refer to collection for dynamic population
  data.assetsModel = "StockPhotos";

  //* Save data to database
  const result = await Download.create(data);

  return result;
};
//* icon  data save controller
const saveIconDownloadIntoDB = async (data: IDownload): Promise<IDownload> => {
  //* Check Is already exist user if not found retune 404 error
  const user = await User.findOne({ email: data.userEmail });
  if (!user) {
    throw new API_Error(
      StatusCodes.NOT_FOUND,
      "The requested user could not be found."
    );
  }

  //* Check is already exist asset if not found 404 error
  const assets = await Icons.findById(data.assets);
  if (!assets) {
    throw new API_Error(
      StatusCodes.NOT_FOUND,
      "The requested Asset could not be found."
    );
  }
  const twentyFourHoursAgo = addHours(new Date(), -24);

  //* check today download same asset
  const isToDayAlreadyDownload = await Download.findOne({
    $and: [
      { assets: assets?._id },
      { user: user?._id },
      { createdAt: { $gte: twentyFourHoursAgo } }
    ]
  });

  if (isToDayAlreadyDownload) {
    throw new API_Error(StatusCodes.CONFLICT, "Download Limit Exceeded");
  }

  //* check five download per day
  const isToDayFiveDownloadAsset = await Download.find({
    $and: [{ user: user?._id, createdAt: { $gte: twentyFourHoursAgo } }]
  });
  if (isToDayFiveDownloadAsset?.length > 10) {
    throw new API_Error(StatusCodes.CONFLICT, "Maximum Ten Assets Per Day");
  }

  const allReadyDownloadAssets = await Download.findOne({
    $and: [{ user: user?._id }, { assets: assets?._id }]
  });

  if (!allReadyDownloadAssets) {
    assets.finalDownload = assets.finalDownload + 1;
  }
  assets.download = assets.download + 1;
  await assets.save();

  //@ts-ignore
  data.user = user?._id;
  //* add asset model to refer to collection for dynamic population
  data.assetsModel = "Icons";

  //* Save data to database
  const result = await Download.create(data);

  return result;
};

//* URL/download/my-download-list (GET)
const getDownloadListFromDB = async (
  filters: IDownloadFilters,
  pagination: IPaginationOptions
): Promise<IGenericResponse<IDownload[]>> => {
  const { searchTerm, ...filterData } = filters;

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(pagination);
  const andCondition = [];
  if (searchTerm) {
    andCondition.push({
      $or: downloadSearchableFields.map(filed => ({
        [filed]: {
          $regex: searchTerm,
          $options: "i"
        }
      }))
    });
  }
  // filtering
  if (Object.keys(filterData).length) {
    andCondition.push({
      $and: Object.entries(filterData).map(([field, value]) => ({
        [field]: value
      }))
    });
  }
  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  const whereConditions = andCondition.length > 0 ? { $and: andCondition } : {};

  const total = await CourseAndLearning.countDocuments(whereConditions);
  const result = await Download.find(whereConditions)
    .populate("user")
    .populate("assets")
    .skip(skip)
    .limit(limit)
    .sort(sortConditions);
  return {
    meta: {
      page,
      limit,
      total
    },
    data: result
  };
};

const getOneDownloadFromDB = async (id: string): Promise<IDownload | null> => {
  const result = await Download.findById(id);
  return result;
};

//* URL/favorite/delete-favorite/:id (DELETE)
//* eslint-disable-next-line @typescript-eslint/no-explicit-any
const deleteOneDownloadFromDB = async (id: string): Promise<any> => {
  const result = await Download.deleteOne({ _id: id });
  return result;
};

const updateDownloadByIdIntoDB = async (
  id: string,
  data: Partial<IDownload>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<IDownload | null | any> => {
  const result = await Download.updateOne({ _id: id }, data, { new: true });
  return result;
};

const myDownloadHistoryFromDB = async (
  userId: string,
  pagination: IPaginationOptions
): Promise<IGenericResponse<IDownload[]>> => {
  const user = await User.findById(userId);

  if (!user) {
    throw new API_Error(
      StatusCodes.NOT_FOUND,
      "The requested user could not be found."
    );
  }
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(pagination);
  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  const result = await Download.find({ user: user._id })
    .populate("assets")
    .skip(skip)
    .limit(limit)
    .sort(sortConditions);
  const total = await Download.countDocuments({ user: user._id });
  return {
    meta: {
      page,
      limit,
      total
    },
    data: result
  };
};

export const downloadServices = {
  saveCourseAndLearningDownloadIntoDB,
  getDownloadListFromDB,
  getOneDownloadFromDB,
  deleteOneDownloadFromDB,
  updateDownloadByIdIntoDB,
  myDownloadHistoryFromDB,
  saveDesignTemplateDownloadIntoDB,
  saveStockPhotosDownloadIntoDB,
  saveIconDownloadIntoDB
  // downloadFileByR2IntoDB,
};
