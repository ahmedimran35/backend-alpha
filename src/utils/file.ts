import {
  CourseAndLearningBucketURL,
  DesignTemplateBucketURL,
  FeedbackBucketURL,
  IconsBucketURL,
  SoftwareAndToolsBucketURL,
  StockPhotosBucketURL
} from "../config/r2-storage";
import { FileUploadHelper } from "../helper/fileUploadHelper";
import { IR2Response, IUploadFile } from "../interface/file";
import fs from "fs";
//* design template -------
const designTemplateInsertPSDFileInR2 = async (
  file: IUploadFile,
  BucketName: string
): Promise<{ result: IR2Response; url: string }> => {
  //* Get Buffering data using fs module
  const fileContent = fs.readFileSync(file.path);
  //* R2 storage payload data
  const payload = {
    Bucket: BucketName,
    Key: `${Date.now()}_${file.originalname}`,
    Body: fileContent,
    ContentType: file.mimetype,
    ACL: "public-read"
  };
  //* Upload into r2 bucket
  const uploadResult =
    await FileUploadHelper.designTemplateUploadFileIntoR2Storage(payload);

  //* split key
  let finalResultKey;
  const modifyKey = uploadResult?.Key.split("/")[1];
  if (modifyKey) {
    finalResultKey = modifyKey;
    uploadResult.Key = modifyKey;
  } else {
    finalResultKey = uploadResult?.key;
  }
  //* Generate r2 file preview url
  const previewURL = `${DesignTemplateBucketURL}/${BucketName}/${finalResultKey}`;

  /*
   * If Upload file then remove file into local file folder
   */
  if (uploadResult) {
    fs.unlinkSync(file.path);
  }
  return {
    result: uploadResult,
    url: previewURL
  };
};

const designTemplateUpdatePSDFileInR2 = async (
  file: IUploadFile,
  Key: string,
  BucketName: string
): Promise<{ result: IR2Response; url: string }> => {
  //* Get Buffering data using fs module
  const fileContent = fs.readFileSync(file.path);
  //* R2 storage payload data
  const payload = {
    Bucket: BucketName,
    Key: Key,
    Body: fileContent,
    ContentType: file.mimetype,
    ACL: "public-read"
  };

  //* Upload into r2 bucket
  const updateResult =
    await FileUploadHelper.designTemplateUploadFileIntoR2Storage(payload);

  //* split key
  let finalResultKey;
  const modifyKey = updateResult?.Key.split("/")[1];

  if (modifyKey) {
    finalResultKey = modifyKey;
    updateResult.Key = modifyKey;
  } else {
    finalResultKey = updateResult?.key;
  }
  //* Generate r2 file preview url
  const previewURL = `${DesignTemplateBucketURL}/${BucketName}/${finalResultKey}`;
  /*
   * If Upload file then remove file into local file folder
   */
  if (updateResult) {
    fs.unlinkSync(file.path);
  }
  return {
    result: updateResult,
    url: previewURL
  };
};

//* course learning -------
const courseAndLearningInsertPSDFileInR2 = async (
  file: IUploadFile,
  BucketName: string
): Promise<{ result: IR2Response; url: string }> => {
  //* Get Buffering data using fs module
  const fileContent = fs.readFileSync(file.path);
  //* R2 storage payload data
  const payload = {
    Bucket: BucketName,
    Key: `${Date.now()}_${file.originalname}`,
    Body: fileContent,
    ContentType: file.mimetype,
    ACL: "public-read"
  };
  //* Upload into r2 bucket
  const uploadResult =
    await FileUploadHelper.courseAndLearningUploadFileIntoR2Storage(payload);
  //* split key
  let finalResultKey;
  const modifyKey = uploadResult?.Key.split("/")[1];
  if (modifyKey) {
    finalResultKey = modifyKey;
    uploadResult.Key = modifyKey;
  } else {
    finalResultKey = uploadResult?.key;
  }
  //* Generate r2 file preview url
  const previewURL = `${CourseAndLearningBucketURL}/${BucketName}/${finalResultKey}`;

  /*
   * If Upload file then remove file into local file folder
   */
  if (uploadResult) {
    fs.unlinkSync(file.path);
  }
  return {
    result: uploadResult,
    url: previewURL
  };
};

const courseAndLearningUpdatePSDFileInR2 = async (
  file: IUploadFile,
  Key: string,
  BucketName: string
): Promise<{ result: IR2Response; url: string }> => {
  //* Get Buffering data using fs module
  const fileContent = fs.readFileSync(file.path);
  //* R2 storage payload data
  const payload = {
    Bucket: BucketName,
    Key: Key,
    Body: fileContent,
    ContentType: file.mimetype,
    ACL: "public-read"
  };

  //* Upload into r2 bucket
  const updateResult =
    await FileUploadHelper.courseAndLearningUploadFileIntoR2Storage(payload);

  //* split key
  let finalResultKey;
  const modifyKey = updateResult?.Key.split("/")[1];
  if (modifyKey) {
    finalResultKey = modifyKey;
    updateResult.Key = modifyKey;
  } else {
    finalResultKey = updateResult?.key;
  }
  //* Generate r2 file preview url
  const previewURL = `${CourseAndLearningBucketURL}/${BucketName}/${finalResultKey}`;

  /*
   * If Upload file then remove file into local file folder
   */
  if (updateResult) {
    fs.unlinkSync(file.path);
  }
  return {
    result: updateResult,
    url: previewURL
  };
};

//* stock photos ----------

const stockPhotoInsertFileInR2 = async (
  file: IUploadFile,
  BucketName: string
): Promise<{ result: IR2Response; url: string }> => {
  //* Get Buffering data using fs module
  const fileContent = fs.readFileSync(file.path);
  //* R2 storage payload data
  const payload = {
    Bucket: BucketName,
    Key: `${Date.now()}_${file.originalname}`,
    Body: fileContent,
    ContentType: file.mimetype,
    ACL: "public-read"
  };

  //* Upload into r2 bucket
  const uploadResult =
    await FileUploadHelper.stockPhotosBucketUploadFileIntoR2Storage(payload);

  //* split key
  let finalResultKey;
  const modifyKey = uploadResult?.Key.split("/")[1];
  if (modifyKey) {
    finalResultKey = modifyKey;
    uploadResult.Key = modifyKey;
  } else {
    finalResultKey = uploadResult?.key;
  }
  //* Generate r2 file preview url
  const previewURL = `${StockPhotosBucketURL}/${BucketName}/${finalResultKey}`;

  /*
   * If Upload file then remove file into local file folder
   */
  if (uploadResult) {
    fs.unlinkSync(file.path);
  }
  return {
    result: uploadResult,
    url: previewURL
  };
};

const stockPhotoUpdateFileInR2 = async (
  file: IUploadFile,
  Key: string,
  BucketName: string
): Promise<{ result: IR2Response; url: string }> => {
  //* Get Buffering data using fs module
  const fileContent = fs.readFileSync(file.path);
  //* R2 storage payload data
  const payload = {
    Bucket: BucketName,
    Key: Key,
    Body: fileContent,
    ContentType: file.mimetype,
    ACL: "public-read"
  };
  //* Upload into r2 bucket
  const updateResult =
    await FileUploadHelper.stockPhotosBucketUploadFileIntoR2Storage(payload);

  //* split key
  let finalResultKey;
  const modifyKey = updateResult?.Key.split("/")[1];
  if (modifyKey) {
    finalResultKey = modifyKey;
    updateResult.Key = modifyKey;
  } else {
    finalResultKey = updateResult?.key;
  }
  //* Generate r2 file preview url
  const previewURL = `${StockPhotosBucketURL}/${BucketName}/${finalResultKey}`;

  /*
   * If Upload file then remove file into local file folder
   */
  if (updateResult) {
    fs.unlinkSync(file.path);
  }
  return {
    result: updateResult,
    url: previewURL
  };
};

//* Icons
const iconInsertFileInR2 = async (
  file: IUploadFile,
  BucketName: string
): Promise<{ result: IR2Response; url: string }> => {
  //* Get Buffering data using fs module
  const fileContent = fs.readFileSync(file.path);
  //* R2 storage payload data
  const Payload = {
    Bucket: BucketName,
    Key: `${Date.now()}_${file.originalname}`,
    Body: fileContent,
    ContentType: file.mimetype,
    ACL: "public-read"
  };
  //* Upload into r2 bucket
  const uploadResult =
    await FileUploadHelper.iconUploadFileIntoR2Storage(Payload);

  //* Split key
  let finalResultKey;
  const modifyKey = uploadResult?.Key.split("/")[1];
  if (modifyKey) {
    finalResultKey = modifyKey;
    uploadResult.Key = modifyKey;
  } else {
    finalResultKey = uploadResult?.key;
  }

  //* Generate r2 file preview url
  const previewURL = `${IconsBucketURL}/${BucketName}/${finalResultKey}`;

  /*
   * If Upload file then remove file into local file folder
   */
  if (uploadResult) {
    fs.unlinkSync(file.path);
  }
  return {
    result: uploadResult,
    url: previewURL
  };
};

const iconUpdateFileInR2 = async (
  file: IUploadFile,
  Key: string,
  BucketName: string
): Promise<{ result: IR2Response; url: string }> => {
  //* Get Buffering data using fs module
  const fileContent = fs.readFileSync(file.path);
  //* R2 storage payload data
  const payload = {
    Bucket: BucketName,
    Key: Key,
    Body: fileContent,
    ContentType: file.mimetype,
    ACL: "public-read"
  };
  //* Upload into r2 bucket
  const updateResult =
    await FileUploadHelper.iconUploadFileIntoR2Storage(payload);

  //* Split key
  let finalResultKey;
  const modifyKey = updateResult?.Key.split("/")[1];
  if (modifyKey) {
    finalResultKey = modifyKey;
    updateResult.Key = modifyKey;
  } else {
    finalResultKey = updateResult?.key;
  }

  //* Generate r2 file preview url
  const previewURL = `${IconsBucketURL}/${BucketName}/${finalResultKey}`;

  /*
   * If Upload file then remove file into local file folder
   */
  if (updateResult) {
    fs.unlinkSync(file.path);
  }
  return {
    result: updateResult,
    url: previewURL
  };
};

//* software and tools
const softwareAndToolsInsertFileInR2 = async (
  file: IUploadFile,
  BucketName: string
): Promise<{ result: IR2Response; url: string }> => {
  //* Get Buffering data using fs module
  const fileContent = fs.readFileSync(file.path);
  //* R2 storage payload data
  const payload = {
    Bucket: BucketName,
    Key: `${Date.now()}_${file.originalname}`,
    Body: fileContent,
    ContentType: file.mimetype,
    ACL: "public-read"
  };

  //* Upload into r2 bucket
  const uploadResult =
    await FileUploadHelper.softwareAndToolsUploadFileIntoR2Storage(payload);

  //* Generate r2 file preview url

  let finalResultKey;
  const modifyKey = uploadResult?.Key.split("/")[1];
  if (modifyKey) {
    finalResultKey = modifyKey;
    uploadResult.Key = modifyKey;
  } else {
    finalResultKey = uploadResult?.key;
  }
  const previewURL = `${SoftwareAndToolsBucketURL}/${BucketName}/${finalResultKey}`;

  /*
   * If Upload file then remove file into local file folder
   */
  if (uploadResult) {
    fs.unlinkSync(file.path);
  }
  return {
    result: uploadResult,
    url: previewURL
  };
};
const softwareAndToolsUpdateFileInR2 = async (
  file: IUploadFile,
  Key: string,
  BucketName: string
): Promise<{ result: IR2Response; url: string }> => {
  //* Get Buffering data using fs module
  const fileContent = fs.readFileSync(file.path);
  //* R2 storage payload data
  const payload = {
    Bucket: BucketName,
    Key: Key,
    Body: fileContent,
    ContentType: file.mimetype,
    ACL: "public-read"
  };
  //* Upload into r2 bucket
  const updateResult =
    await FileUploadHelper.softwareAndToolsUploadFileIntoR2Storage(payload);
  //* split key
  let finalResultKey;
  const modifyKey = updateResult?.Key.split("/")[1];
  if (modifyKey) {
    finalResultKey = modifyKey;
    updateResult.Key = modifyKey;
  } else {
    finalResultKey = updateResult?.key;
  }
  //* Generate r2 file preview url
  const previewURL = `${SoftwareAndToolsBucketURL}/${BucketName}/${finalResultKey}`;

  /*
   * If Upload file then remove file into local file folder
   */
  if (updateResult) {
    fs.unlinkSync(file.path);
  }
  return {
    result: updateResult,
    url: previewURL
  };
};

//* Feedback
const feedbackFileUploadIntoR2 = async (
  file: IUploadFile,
  BucketName: string
): Promise<{ result: IR2Response; url: string }> => {
  //* Get Buffering data using fs module
  const fileContent = fs.readFileSync(file.path);
  //* R2 storage payload data
  const payload = {
    Bucket: BucketName,
    Key: `${Date.now()}_${file.originalname}`,
    Body: fileContent,
    ContentType: file.mimetype,
    ACL: "public-read"
  };
  //* Upload into r2 bucket
  const uploadResult =
    await FileUploadHelper.feedbackFileUploadIntoR2Storage(payload);

  //* split key
  let finalResultKey;
  const modifyKey = uploadResult?.Key.split("/")[1];
  if (modifyKey) {
    finalResultKey = modifyKey;
    uploadResult.Key = modifyKey;
  } else {
    finalResultKey = uploadResult?.key;
  }
  //* Generate r2 file preview url
  const previewURL = `${FeedbackBucketURL}/${BucketName}/${finalResultKey}`;

  /*
   * If Upload file then remove file into local file folder
   */
  if (uploadResult) {
    fs.unlinkSync(file.path);
  }
  return {
    result: uploadResult,
    url: previewURL
  };
};

export const Upload = {
  designTemplateInsertPSDFileInR2,
  designTemplateUpdatePSDFileInR2,
  courseAndLearningInsertPSDFileInR2,
  courseAndLearningUpdatePSDFileInR2,
  stockPhotoInsertFileInR2,
  stockPhotoUpdateFileInR2,
  softwareAndToolsInsertFileInR2,
  softwareAndToolsUpdateFileInR2,
  iconInsertFileInR2,
  iconUpdateFileInR2,
  feedbackFileUploadIntoR2
};
