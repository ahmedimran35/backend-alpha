import express, { NextFunction, Request, Response } from "express";
import { FeedbackController } from "./feedback.controller";
// import ValidateRequestAPI from '../../middleware/ValidationRequest'
// import { FeedbackValidation } from './feedback.validation'
import { FileUploadHelper } from "../../../helper/fileUploadHelper";

import { ENUM_USER_ROLE } from "../../../enum/user";
import Authentication from "../../middleware/authentication";
import { FeedbackValidation } from "./feedback.validation";

const router = express.Router();
router.get(
  "/",
  Authentication(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SEO),
  FeedbackController.getAllFeedback
);
router.get("/:id", FeedbackController.getFeedBackById);
router.delete("/:id", FeedbackController.deleteFeedback);
router.patch("/:id", FeedbackController.updateFeedbackById);
router.post(
  "/",

  FileUploadHelper.feedbackUpload.single("file"),
  // ValidateRequestAPI(FeedbackValidation.FeedbackPostZodSchema),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = FeedbackValidation.FeedbackPostZodSchema.parse(
      JSON.parse(req.body.data)
    );
    return FeedbackController.insertFeedback(req, res, next);
  }
);

export const FeedbackRoute = router;
