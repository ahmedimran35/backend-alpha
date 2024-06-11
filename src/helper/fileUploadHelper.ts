/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { v2 as cloudinary } from "cloudinary";
import multer from "multer";

import config from "../config";
import { IR2Response, IR2UploadFile } from "../interface/file";

import { s3 } from "../config/r2-storage";
import { Validation } from "../validation/fileValidaiton";

cloudinary.config({
  cloud_name: config.cloudinary.cloudName,
  api_key: config.cloudinary.apiKey,
  api_secret: config.cloudinary.apiSecret
});

/*
 * Multer Storage
 * When upload any file first upload destination uploads folder
 */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

//* Multer Upload
const upload = multer({ storage: storage });
const designTemplateUpload = multer({
  storage,
  fileFilter: Validation.designTemplateFileFilter
});
const courseAndLearningUpload = multer({
  storage,
  fileFilter: Validation.courseAndLearningFileFilter
});
const iconUpload = multer({
  storage,
  fileFilter: Validation.iconFileFilter
});
const feedbackUpload = multer({
  storage,
  fileFilter: Validation.feedbackFileFilter
});

const stockPhotoUpload = multer({
  storage,
  fileFilter: Validation.stockPhotoFilter
});

//* R2 Design Template Upload
const designTemplateUploadFileIntoR2Storage = async (
  payload: IR2UploadFile
): Promise<IR2Response | any> => {
  // const result = await s3.upload(payload).promise()
  const result = await s3.designTemplateBucket.upload(payload).promise();

  return result;
};

//* R2 Course And Learning Upload
const courseAndLearningUploadFileIntoR2Storage = async (
  payload: IR2UploadFile
): Promise<IR2Response | any> => {
  // const result = await s3.upload(payload).promise()
  const result = await s3.courseAndLearningBucket.upload(payload).promise();

  return result;
};

//* R2 Stock Photo Upload
const stockPhotosBucketUploadFileIntoR2Storage = async (
  payload: IR2UploadFile
): Promise<IR2Response | any> => {
  // const result = await s3.upload(payload).promise()
  const result = await s3.stockPhotosBucket.upload(payload).promise();

  return result;
};

//* R2 Icon Upload
const iconUploadFileIntoR2Storage = async (
  payload: IR2UploadFile
): Promise<IR2Response | any> => {
  // const result = await s3.upload(payload).promise()
  const result = await s3.iconBucket.upload(payload).promise();

  return result;
};
//* R2 Software and tools Upload
const softwareAndToolsUploadFileIntoR2Storage = async (
  payload: IR2UploadFile
): Promise<IR2Response | any> => {
  // const result = await s3.upload(payload).promise()
  const result = await s3.softwareAndToolsBucket.upload(payload).promise();

  return result;
};
//* Any File delete using R2
const deleteFileIntoR2Storage = async (
  key: string,
  BucketName: string
): Promise<any> => {
  return await s3.designTemplateBucket
    .deleteObject({
      Bucket: BucketName,
      Key: key
    })
    .promise();
};

//* R2 Feedback file r2
const feedbackFileUploadIntoR2Storage = async (
  payload: IR2UploadFile
): Promise<IR2Response | any> => {
  const result = await s3.feedbackBucket.upload(payload).promise();

  return result;
};

export const FileUploadHelper = {
  upload,

  designTemplateUploadFileIntoR2Storage,
  deleteFileIntoR2Storage,
  courseAndLearningUploadFileIntoR2Storage,
  stockPhotosBucketUploadFileIntoR2Storage,
  iconUploadFileIntoR2Storage,
  softwareAndToolsUploadFileIntoR2Storage,
  designTemplateUpload,
  courseAndLearningUpload,
  iconUpload,
  feedbackFileUploadIntoR2Storage,
  feedbackUpload,
  stockPhotoUpload
};
