/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";

import { downloadServices } from "./download.services";

import { StatusCodes } from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";

import pick from "../../../shared/pick";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { downloadFilterableFields } from "./download.constant";
import { paginationFields } from "../../../constants/pagination";

import path from "path";
import { s3 } from "../../../config/r2-storage";
import API_Error from "../../../error/apiError";

const courseAndLearningDownloadAsset = catchAsync(
  async (req: Request, res: Response) => {
    // const user = (req as JwtPayload).user

    const result = await downloadServices.saveCourseAndLearningDownloadIntoDB(
      req.body
      // user.userId,
    );

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Course and learning download data save successfully",
      data: result
    });
  }
);
const saveStockPhotosDownloadAsset = catchAsync(
  async (req: Request, res: Response) => {
    // const user = (req as JwtPayload).user

    const result = await downloadServices.saveStockPhotosDownloadIntoDB(
      req.body
      // user.userId,
    );

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Stock Photos download data save successfully",
      data: result
    });
  }
);
const saveDesignTemplateDownloadAsset = catchAsync(
  async (req: Request, res: Response) => {
    // const user = (req as JwtPayload).user

    const result = await downloadServices.saveDesignTemplateDownloadIntoDB(
      req.body
      // user.userId,
    );

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Design Template download data save successfully",
      data: result
    });
  }
);
const saveIconDownloadAsset = catchAsync(
  async (req: Request, res: Response) => {
    // const user = (req as JwtPayload).user

    const result = await downloadServices.saveIconDownloadIntoDB(
      req.body
      // user.userId,
    );

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Icon download data save successfully",
      data: result
    });
  }
);

const downloadListGet = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, downloadFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);
  const result = await downloadServices.getDownloadListFromDB(
    filters,
    paginationOptions
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Get Download  List successfully",
    data: result
  });
});

const oneDownloadGet = catchAsync(async (req: Request, res: Response) => {
  const result = await downloadServices.getOneDownloadFromDB(req.params.id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Get the identified Download history",
    data: result
  });
});

const downloadDelete = catchAsync(async (req: Request, res: Response) => {
  const result = await downloadServices.deleteOneDownloadFromDB(req.params.id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Delete one download history",
    data: result
  });
});

const updateDownloadById = catchAsync(async (req: Request, res: Response) => {
  const result = await downloadServices.updateDownloadByIdIntoDB(
    req.params.id,
    req.body
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Update Download history",
    data: result
  });
});
const myDownloadHistory = catchAsync(async (req: Request, res: Response) => {
  const user = (req as JwtPayload).user;
  const paginationOptions = pick(req.query, paginationFields);
  const result = await downloadServices.myDownloadHistoryFromDB(
    user.userId as string,
    paginationOptions
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "My Download History successfully",
    meta: result.meta,
    data: result.data
  });
});

//* New Version(Current)
const downloadFileUsingR2API = catchAsync(
  async (req: Request, res: Response) => {
    const bucketName = req.params.bucketName as string;
    const key = req.params.key as string;

    if (!key || !bucketName) {
      throw new API_Error(
        StatusCodes.BAD_REQUEST,
        "Bucket and key are required"
      );
    }

    let response;
    if (bucketName === "design-template") {
      response = await s3.designTemplateBucket
        .getObject({ Bucket: "design-templates", Key: key })
        .promise();
    } else if (bucketName === "stock-photos") {
      response = await s3.stockPhotosBucket
        .getObject({ Bucket: bucketName, Key: key })
        .promise();
    } else if (bucketName === "icons") {
      response = await s3.iconBucket
        .getObject({ Bucket: bucketName, Key: key })
        .promise();
    } else if (bucketName === "course-and-learning") {
      response = await s3.courseAndLearningBucket
        .getObject({ Bucket: bucketName, Key: key })
        .promise();
    } else {
      throw new API_Error(StatusCodes.BAD_REQUEST, "Invalid Bucket name");
    }
    const objectData = response.Body;

    const fileExtension = path
      .extname(key as string)
      .slice(1)
      .toLowerCase();
    let contentType;

    switch (fileExtension) {
      case "pdf":
        contentType = "application/pdf";
        break;
      case "zip":
        contentType = "application/zip";
        break;
      case "jpg":
      case "jpeg":
        contentType = "image/jpeg";
        break;
      case "png":
        contentType = "image/png";
        break;

      default:
        contentType = "application/octet-stream";
    }
    res.setHeader("Content-Type", contentType);

    res.send(objectData);
  }
);

export const downloadController = {
  courseAndLearningDownloadAsset,
  downloadListGet,
  oneDownloadGet,
  downloadDelete,
  updateDownloadById,
  myDownloadHistory,
  saveStockPhotosDownloadAsset,
  saveDesignTemplateDownloadAsset,
  saveIconDownloadAsset,
  downloadFileUsingR2API
};
