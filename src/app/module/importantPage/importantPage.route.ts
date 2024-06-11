import express from "express";
import { ImportantPageController } from "./importantPage.controller";
import ValidateRequestAPI from "../../middleware/ValidationRequest";
import { PageValidation } from "./importantPage.validation";

import { ENUM_USER_ROLE } from "../../../enum/user";
import Authentication from "../../middleware/authentication";
const router = express.Router();
router.get("/content", ImportantPageController.getPageContentByQuery);
router.get("/:id", ImportantPageController.getPageContentById);
router.delete(
  "/:id",
  Authentication(ENUM_USER_ROLE.SEO),
  ImportantPageController.deletePageById
);
router.patch("/:id", ImportantPageController.updatePageContent);
router.post(
  "/",
  Authentication(ENUM_USER_ROLE.SEO),
  ValidateRequestAPI(PageValidation.createPageZodSchema),
  ImportantPageController.insertNewPage
);
router.get(
  "/",

  ImportantPageController.getAllPageContent
);

export const ImportantPageRoute = router;
