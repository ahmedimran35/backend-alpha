import express from "express";
import { downloadController } from "./download.controller";

import { DownloadValidation } from "./download.validation";
import ValidateRequestAPI from "../../middleware/ValidationRequest";
import { ENUM_USER_ROLE } from "../../../enum/user";
import Authentication from "../../middleware/authentication";

const route = express.Router();
route.get(
  "/download-file/:key/:bucketName",
  downloadController.downloadFileUsingR2API
);

//my-download-history
route.get(
  "/48b0a4f1ba94f8d168d217af781572dab13574564dc59863cc9d4d6e61fc315c",
  Authentication(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SEO),
  downloadController.myDownloadHistory
);

route.get("/:id", downloadController.oneDownloadGet);
route.delete("/:id", downloadController.downloadDelete);
route.patch("/:id", downloadController.updateDownloadById);
route.post(
  "/course-and-learning",
  ValidateRequestAPI(DownloadValidation.createDownloadZodSchema),
  downloadController.courseAndLearningDownloadAsset
);
route.post(
  "/icons",
  ValidateRequestAPI(DownloadValidation.createDownloadZodSchema),
  downloadController.saveIconDownloadAsset
);
route.post(
  "/design-template",
  ValidateRequestAPI(DownloadValidation.createDownloadZodSchema),
  downloadController.saveDesignTemplateDownloadAsset
);
route.post(
  "/stock-photos",
  ValidateRequestAPI(DownloadValidation.createDownloadZodSchema),
  downloadController.saveStockPhotosDownloadAsset
);
route.get("/", downloadController.downloadListGet);

export const DownloadRoute = route;
