import express from "express";

import { SoftwareAndToolsController } from "./softwareAndTools.controller";
import { FileUploadHelper } from "../../../helper/fileUploadHelper";

import { ENUM_USER_ROLE } from "../../../enum/user";
import Authentication from "../../middleware/authentication";
const router = express.Router();
router.get("/:id", SoftwareAndToolsController.viewSoftwareAndToolsById);
router.post(
  "/insert",

  // ValidateRequestAPI(SoftwareAndToolsValidation.SoftwareAndToolsZodSchema),
  Authentication(ENUM_USER_ROLE.SEO),
  FileUploadHelper.upload.single("file"),
  SoftwareAndToolsController.insertSoftWareAndTool
);
router.post(
  "/visited-partner/:id",
  // Authentication(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SEO, ENUM_USER_ROLE.SEO),
  SoftwareAndToolsController.visitedPartnerWebsiteCount
);
router.get(
  "/details-by-seo/:id",
  // Authentication(ENUM_USER_ROLE.SEO),
  SoftwareAndToolsController.viewSoftwareAndToolsByIdWithAdmin
);

router.delete(
  "/",
  Authentication(ENUM_USER_ROLE.SEO),
  SoftwareAndToolsController.deleteSoftwareAndTools
);
router.patch(
  "/:id",
  Authentication(ENUM_USER_ROLE.SEO),
  FileUploadHelper.upload.single("file"),
  SoftwareAndToolsController.updateSoftwareAndTools
);
router.get("/", SoftwareAndToolsController.viewAllSoftwareAndTools);

export const SoftwareAndToolsRoute = router;
