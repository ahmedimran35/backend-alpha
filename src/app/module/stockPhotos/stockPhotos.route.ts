import express, { NextFunction, Request, Response } from "express";

import { ENUM_USER_ROLE } from "../../../enum/user";
import { stockPhotosController } from "./stockPhotos.controller";
import { FileUploadHelper } from "../../../helper/fileUploadHelper";
import Authentication from "../../middleware/authentication";
import { StockPhotoValidation } from "./stockPhotos.validation";

const router = express.Router();
//api
// by seo
router.get(
  "/f82b713907270eab5855d595ef189a606b38eb900c9e2090ff7122f0609a207f",
  Authentication(ENUM_USER_ROLE.SEO),
  stockPhotosController.allStockPhotoByAdmin
);
router.delete(
  "/",
  Authentication(ENUM_USER_ROLE.SEO),
  stockPhotosController.deletedStockPhotoById
);
//
router.patch(
  "/:id",
  Authentication(ENUM_USER_ROLE.SEO),
  FileUploadHelper.stockPhotoUpload.single("asset-file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = StockPhotoValidation.updateStockPhotoZodSchema.parse(
      JSON.parse(req.body.data)
    );

    return stockPhotosController.updateStockPhotoById(req, res, next);
  }
);
router.get(
  "/details-check-by-user/:id",
  stockPhotosController.getStockPhotosIdByUser
);
router.get(
  "/details-check-by-seo/:id",
  Authentication(ENUM_USER_ROLE.SEO),
  stockPhotosController.getStockPhotosIdByAdmin
);

router.post(
  "/insert",
  Authentication(ENUM_USER_ROLE.SEO),
  FileUploadHelper.stockPhotoUpload.single("asset-file"),
  //* File validation or passing data controller
  (req: Request, res: Response, next: NextFunction) => {
    req.body = StockPhotoValidation.createStockPhotoZodSchema.parse(
      JSON.parse(req.body.data)
    );
    return stockPhotosController.stockPhotosInsert(req, res, next);
  }
);

// by user
router.get(
  "/4869ed1366a18e4e6ebc4f2e5a44776ae2c724d410ca3d56796dbd194ab53b52",
  stockPhotosController.stockPhotosByUser
);
export const StockPhotosRoute = router;
