/* eslint-disable no-undef */
import { Request } from "express";
import multer from "multer";
import path from "path";
import API_Error from "../error/apiError";
import { StatusCodes } from "http-status-codes";
const designTemplateFileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  if (file.fieldname === "asset-file") {
    if (path.extname(file.originalname).toLowerCase() === ".zip") {
      cb(null, true);
    } else {
      cb(
        new API_Error(
          StatusCodes.BAD_REQUEST,
          "Invalid file format. Please submit a valid ZIP file."
        )
      );
    }
  } else if (file.fieldname === "preview-file") {
    // accept file type
    const allowFileTypes = [".jpg", ".jpeg", ".png", ".svg", ".webp"];
    if (
      allowFileTypes.includes(path.extname(file.originalname).toLowerCase())
    ) {
      cb(null, true);
    } else {
      cb(
        new API_Error(
          StatusCodes.BAD_REQUEST,
          "Invalid file format. Please submit a valid preview file in JPG, JPEG, PNG, or SVG format."
        )
      );
    }
  } else {
    cb(new Error("Unexpected field name"));
  }
};
const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  const allowedFormats = [
    "jpeg",
    "png",
    "gif",
    "webp",
    "tiff",
    "bmp",
    "pdf",
    "psd",
    "svg",
    "zip"
  ];
  const maxFileSize = 20 * 1024 * 1024;

  if (!allowedFormats.includes(file.mimetype.split("/")[1])) {
    cb(
      new Error(
        "Invalid file format. Supported formats: JPEG, PNG, GIF, WebP, TIFF, BMP, PDF, PSD, SVG, ZIP"
      )
    );
  } else if (file.size > maxFileSize) {
    cb(new Error("File size exceeds the maximum limit of 16 MB."));
  } else {
    cb(null, true);
  }
};

const courseAndLearningFileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  if (file.fieldname === "asset-file") {
    const allowAssetFile = [".zip", ".pdf"];
    if (
      allowAssetFile.includes(path.extname(file.originalname).toLowerCase())
    ) {
      cb(null, true);
    } else {
      cb(
        new API_Error(
          StatusCodes.BAD_REQUEST,
          "Invalid file format. Please submit a valid ZIP file."
        )
      );
    }
  } else if (file.fieldname === "preview-file") {
    // accept file type
    const allowFileTypes = [".jpg", ".jpeg", ".png", ".svg", ".webp"];
    if (
      allowFileTypes.includes(path.extname(file.originalname).toLowerCase())
    ) {
      cb(null, true);
    } else {
      cb(
        new API_Error(
          StatusCodes.BAD_REQUEST,
          "Invalid file format. Please submit a valid preview file in JPG, JPEG, PNG, or SVG format."
        )
      );
    }
  } else {
    cb(new Error("Unexpected field name"));
  }
};

const iconFileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  const allowFileTypes = [".jpg", ".jpeg", ".png", ".svg", ".webp"];
  //* This Means File Allow size 3MB
  const allowMaxFileSize = 3 * 1024 * 1024;

  if (file.size > allowMaxFileSize) {
    cb(
      new API_Error(
        StatusCodes.BAD_REQUEST,
        "File size exceeds the maximum limit of 3 MB. Please reduce the file size"
      )
    );
  } else if (
    allowFileTypes.includes(path.extname(file.originalname).toLowerCase())
  ) {
    cb(null, true);
  } else {
    cb(
      new API_Error(
        StatusCodes.BAD_REQUEST,
        "Invalid file format. Please submit a valid preview file in JPG, JPEG, PNG, or SVG format."
      )
    );
  }
};

const feedbackFileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  const allowFileTypes = [".jpg", ".jpeg", ".png", ".svg", ".webp"];
  //* This Means File Allow size 3MB
  const allowMaxFileSize = 3 * 1024 * 1024;

  if (file.size > allowMaxFileSize) {
    cb(
      new API_Error(
        StatusCodes.BAD_REQUEST,
        "File size exceeds the maximum limit of 3 MB. Please reduce the file size"
      )
    );
  } else if (
    allowFileTypes.includes(path.extname(file.originalname).toLowerCase())
  ) {
    cb(null, true);
  } else {
    cb(
      new API_Error(
        StatusCodes.BAD_REQUEST,
        "Invalid file format. Please submit a valid file in JPG, JPEG, PNG, or SVG format."
      )
    );
  }
};

const stockPhotoFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  const allowFileTypes = [".jpg", ".jpeg", ".png", ".svg", ".webp"];
  //* This Means File Allow size 3MB

  if (allowFileTypes.includes(path.extname(file.originalname).toLowerCase())) {
    cb(null, true);
  } else {
    cb(
      new API_Error(
        StatusCodes.BAD_REQUEST,
        "Invalid file format. Please submit a valid file in JPG, JPEG, PNG, or SVG format."
      )
    );
  }
};
export const Validation = {
  designTemplateFileFilter,
  fileFilter,
  courseAndLearningFileFilter,
  iconFileFilter,
  feedbackFileFilter,
  stockPhotoFilter
};
