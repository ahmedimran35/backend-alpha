import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { StockPhotosServices } from "./stockPhotos.services";
import sendResponse from "../../../shared/sendResponse";
import { StatusCodes } from "http-status-codes";
import pick from "../../../shared/pick";
import { stockPhotosFilterableFields } from "./stockPhotos.constant";
import { paginationFields } from "../../../constants/pagination";
import { IStockPhotos } from "./stockPhotos.interface";
import { JwtPayload } from "jsonwebtoken";

const stockPhotosInsert = catchAsync(async (req: Request, res: Response) => {
  const user = (req as JwtPayload).user;
  const result = await StockPhotosServices.stockPhotoInsertIntoDB(
    req,
    user?.userId as string
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Stock Photos Uploaded Successfully",
    data: result
  });
});

// user
const stockPhotosByUser = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, stockPhotosFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);
  const result = await StockPhotosServices.allStockPhotosByUserFromDB(
    filters,
    paginationOptions
  );
  sendResponse<IStockPhotos[]>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "All  Stock Photos Fetch successfully !",
    meta: result.meta,
    data: result.data
  });
});

const getStockPhotosIdByUser = catchAsync(
  async (req: Request, res: Response) => {
    const result = await StockPhotosServices.getStockPhotosIdByUserFromDB(
      req.params.id
    );
    sendResponse<IStockPhotos>(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Single Stock Photos Fetch successfully !",

      data: result
    });
  }
);
const getStockPhotosIdByAdmin = catchAsync(
  async (req: Request, res: Response) => {
    const result = await StockPhotosServices.getStockPhotosIdByAdminFromDB(
      req.params.id
    );
    sendResponse<IStockPhotos>(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Single Stock Photos successfully !",

      data: result
    });
  }
);
const deletedStockPhotoById = catchAsync(
  async (req: Request, res: Response) => {
    const result = await StockPhotosServices.deleteStockPhotosByIdIntoDB(
      req.query.key as string
    );
    sendResponse<IStockPhotos>(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: " Stock Photo Deleted successfully !",

      data: result
    });
  }
);

const updateStockPhotoById = catchAsync(async (req: Request, res: Response) => {
  const user = (req as JwtPayload).user;
  const result = await StockPhotosServices.updateStockPhotosByIdIntoDB(
    req.params.id,
    req,
    user?.userId as string
  );
  sendResponse<IStockPhotos>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Update Stock Photo successfully !",

    data: result
  });
});

const allStockPhotoByAdmin = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, stockPhotosFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);
  const result = await StockPhotosServices.allStockPhotosByAdminFromDB(
    filters,
    paginationOptions
  );
  sendResponse<IStockPhotos[]>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "All Stock Photos Fetch successfully !",
    meta: result.meta,
    data: result.data
  });
});
export const stockPhotosController = {
  stockPhotosInsert,
  stockPhotosByUser,
  getStockPhotosIdByUser,
  getStockPhotosIdByAdmin,
  deletedStockPhotoById,
  updateStockPhotoById,
  allStockPhotoByAdmin
};
