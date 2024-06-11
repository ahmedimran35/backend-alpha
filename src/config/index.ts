import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });
//Dot Env Config-----
export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  bycrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  jwt: {
    secret_token: process.env.SECRET_TOKEN,
    expire_in: process.env.EXPIRE_IN,
    refresh_token: process.env.REFRESH_SECRET_TOKEN,
    refresh_expire_in: process.env.REFRESH_EXPIRE_IN
  },
  cloudinary: {
    cloudName: process.env.cloudName,
    apiKey: process.env.apiKey,
    apiSecret: process.env.apiSecret
  },
  r2Storage: {
    url: {
      designTemplate: process.env.DesignTemplateBucketURL,
      courseAndLearning: process.env.CourseAndLearningBucketURL,
      stockPhoto: process.env.StockPhotosBucketURL,
      icon: process.env.IconsBucketURL,
      softwareAndTools: process.env.SoftwareAndToolsBucketURL,
      feedbackBucketURL: process.env.FeedbackBucketURL
    },
    endpoint: process.env.endpoint,
    accessKeyId: process.env.accessKeyId,
    secretAccessKey: process.env.secretAccessKey,
    signatureVersion: process.env.signatureVersion,
    region: process.env.region
  },
  stripeSecretKey: process.env.StripeSecretKey
};
