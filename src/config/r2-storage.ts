import AWS from "aws-sdk";
import config from ".";

export const DesignTemplateBucketURL = config.r2Storage.url.designTemplate;
const designTemplateBucket = new AWS.S3({
  endpoint: `${config.r2Storage.endpoint}/design-templates`,
  accessKeyId: config.r2Storage.accessKeyId,
  secretAccessKey: config.r2Storage.secretAccessKey,
  signatureVersion: config.r2Storage.signatureVersion,
  region: config.r2Storage.region
});
export const CourseAndLearningBucketURL =
  config.r2Storage.url.courseAndLearning;
const courseAndLearningBucket = new AWS.S3({
  endpoint: `${config.r2Storage.endpoint}/course-and-learning`,
  accessKeyId: config.r2Storage.accessKeyId,
  secretAccessKey: config.r2Storage.secretAccessKey,
  signatureVersion: config.r2Storage.signatureVersion,
  region: config.r2Storage.region
});

export const StockPhotosBucketURL = config.r2Storage.url.stockPhoto;
const stockPhotosBucket = new AWS.S3({
  endpoint: `${config.r2Storage.endpoint}/stock-photos`,
  accessKeyId: config.r2Storage.accessKeyId,
  secretAccessKey: config.r2Storage.secretAccessKey,
  signatureVersion: config.r2Storage.signatureVersion,
  region: config.r2Storage.region
});

export const IconsBucketURL = config.r2Storage.url.icon;
const iconBucket = new AWS.S3({
  endpoint: `${config.r2Storage.endpoint}/icons`,
  accessKeyId: config.r2Storage.accessKeyId,
  secretAccessKey: config.r2Storage.secretAccessKey,
  signatureVersion: config.r2Storage.signatureVersion,
  region: config.r2Storage.region
});
export const SoftwareAndToolsBucketURL = config.r2Storage.url.softwareAndTools;
const softwareAndToolsBucket = new AWS.S3({
  endpoint: `${config.r2Storage.endpoint}/software-and-tools`,
  accessKeyId: config.r2Storage.accessKeyId,
  secretAccessKey: config.r2Storage.secretAccessKey,
  signatureVersion: config.r2Storage.signatureVersion,
  region: config.r2Storage.region
});

export const FeedbackBucketURL = config.r2Storage.url.feedbackBucketURL;
const feedbackBucket = new AWS.S3({
  endpoint: `${config.r2Storage.endpoint}/feedback`,
  accessKeyId: config.r2Storage.accessKeyId,
  secretAccessKey: config.r2Storage.secretAccessKey,
  signatureVersion: config.r2Storage.signatureVersion,
  region: config.r2Storage.region
});
export const s3 = {
  designTemplateBucket,
  courseAndLearningBucket,
  stockPhotosBucket,
  iconBucket,
  softwareAndToolsBucket,
  feedbackBucket
};
