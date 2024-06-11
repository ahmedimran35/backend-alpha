import express, { NextFunction, Request, Response } from "express";

import { FileUploadHelper } from "../../../helper/fileUploadHelper";

import { ENUM_USER_ROLE } from "../../../enum/user";
import { CourseAndLearningController } from "./course-add-learning.controller";
import Authentication from "../../middleware/authentication";
import { CourseAndLearningValidation } from "./course-add-learning.validation";

const router = express.Router();

//* by seo
router.get(
  "/all-category-data-search",
  CourseAndLearningController.getAllSearchQueryAssetOperation
);
//* by admin
router.get(
  "/f82b713907270eab5855d595ef189a606b38eb900c9e2090ff7122f0609a207f",
  Authentication(ENUM_USER_ROLE.SEO),
  CourseAndLearningController.allCourseAndLearningByAdmin
);
router.delete(
  "/delete-file",
  Authentication(ENUM_USER_ROLE.SEO),
  CourseAndLearningController.deleteCourseAndLearningById
);
//
router.patch(
  "/:id",
  Authentication(ENUM_USER_ROLE.SEO),
  FileUploadHelper.courseAndLearningUpload.fields([
    { name: "asset-file" },
    { name: "preview-file" }
  ]),
  //* data validation or passing data controller
  (req: Request, res: Response, next: NextFunction) => {
    req.body = CourseAndLearningValidation.updateZodSchema.parse(
      JSON.parse(req.body.data)
    );

    return CourseAndLearningController.updateCourseAndLearningById(
      req,
      res,
      next
    );
  }
);
router.get(
  "/details-check-by-user/:id",
  CourseAndLearningController.getCourseAndLearningIdByUser
);
router.get(
  "/details-check-by-seo/:id",
  Authentication(ENUM_USER_ROLE.SEO),
  CourseAndLearningController.getCourseAndLearningIdAdmin
);

router.post(
  "/insert",
  Authentication(ENUM_USER_ROLE.SEO),
  FileUploadHelper.courseAndLearningUpload.fields([
    { name: "asset-file" },
    { name: "preview-file" }
  ]),
  //* data validation or passing data controller
  (req: Request, res: Response, next: NextFunction) => {
    req.body = CourseAndLearningValidation.createZodSchema.parse(
      JSON.parse(req.body.data)
    );
    return CourseAndLearningController.courseAndLearningInsert(req, res, next);
  }
);
// by user
router.get(
  "/4869ed1366a18e4e6ebc4f2e5a44776ae2c724d410ca3d56796dbd194ab53b52",
  CourseAndLearningController.allCourseAndLearningByUser
);

export const CourseAndLearningRoute = router;
