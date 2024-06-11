import express, { NextFunction, Request, Response } from "express";

import { ENUM_USER_ROLE } from "../../../enum/user";

import { FileUploadHelper } from "../../../helper/fileUploadHelper";
import { IconsController } from "./icon.controller";
import { IconValidation } from "./icon.validation";
import Authentication from "../../middleware/authentication";
import ValidateRequestAPI from "../../middleware/ValidationRequest";

// import { FileUploadHelper } from '../../../helper/fileUploader'
const router = express.Router();
//api
// by seo
router.post(
  "/bulk-upload",
  Authentication(ENUM_USER_ROLE.SEO),
  FileUploadHelper.iconUpload.array("files"),
  ValidateRequestAPI(IconValidation.bulkIconUploadZodSchema),
  IconsController.iconBulkUploadSystem
);
router.get(
  "/f82b713907270eab5855d595ef189a606b38eb900c9e2090ff7122f0609a207f",
  Authentication(ENUM_USER_ROLE.SEO),
  IconsController.allIconsBySEO
);
router.delete(
  "/",
  Authentication(ENUM_USER_ROLE.SEO),
  IconsController.deleteIconById
);
//
router.patch(
  "/:id",
  Authentication(ENUM_USER_ROLE.SEO),
  FileUploadHelper.iconUpload.single("file"),
  //* data validation or passing data controller
  (req: Request, res: Response, next: NextFunction) => {
    req.body = IconValidation.updateIconZodSchema.parse(
      JSON.parse(req.body.data)
    );
    return IconsController.updateIconsById(req, res, next);
  }
);
router.get("/details-check-by-user/:id", IconsController.getIconsIdByUser);
router.get(
  "/details-check-by-seo/:id",
  Authentication(ENUM_USER_ROLE.SEO),
  IconsController.getIconsByIdFromSEO
);

router.post(
  "/insert",
  Authentication(ENUM_USER_ROLE.SEO),
  FileUploadHelper.iconUpload.single("file"),
  //* data validation or passing data controller
  (req: Request, res: Response, next: NextFunction) => {
    req.body = IconValidation.createIconZodSchema.parse(
      JSON.parse(req.body.data)
    );
    return IconsController.iconsInsert(req, res, next);
  }
);
// by user
router.get(
  "/4869ed1366a18e4e6ebc4f2e5a44776ae2c724d410ca3d56796dbd194ab53b52",
  IconsController.allIconsByUser
);
//

export const IconRoute = router;
