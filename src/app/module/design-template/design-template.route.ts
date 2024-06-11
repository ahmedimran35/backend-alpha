import express, { NextFunction, Request, Response } from "express";

import { ENUM_USER_ROLE } from "../../../enum/user";
import { DesignTemplateController } from "./design-template.controller";
import { FileUploadHelper } from "../../../helper/fileUploadHelper";
import { DesignTemplateValidation } from "./design-template.validation";
import Authentication from "../../middleware/authentication";

const router = express.Router();

//* by seo
router.get(
  "/f82b713907270eab5855d595ef189a606b38eb900c9e2090ff7122f0609a207f",
  Authentication(ENUM_USER_ROLE.SEO),
  DesignTemplateController.allDesignTemplateByAdmin
);
router.delete(
  "/",
  Authentication(ENUM_USER_ROLE.SEO),
  DesignTemplateController.deleteDesignTemplateById
);
//
router.patch(
  "/:id",
  Authentication(ENUM_USER_ROLE.SEO),
  FileUploadHelper.designTemplateUpload.fields([
    { name: "asset-file" },
    { name: "preview-file" }
  ]),
  //* data validation or passing data controller
  (req: Request, res: Response, next: NextFunction) => {
    req.body = DesignTemplateValidation.updateDesignTemplateZodSchema.parse(
      JSON.parse(req.body.data)
    );
    return DesignTemplateController.updateDesignTemplateById(req, res, next);
  }
);
//* for increasing view
router.get(
  "/details-check-by-user/:id",
  DesignTemplateController.getDesignTemplateIdByUser
);
//* for getting details of a design template
router.get(
  "/details-check-by-seo/:id",
  Authentication(ENUM_USER_ROLE.SEO),
  DesignTemplateController.getDesignTemplateIdAdmin
);

router.post(
  "/insert",
  Authentication(ENUM_USER_ROLE.SEO),
  FileUploadHelper.designTemplateUpload.fields([
    { name: "asset-file" },
    { name: "preview-file" }
  ]),
  //* data validation or passing data controller
  (req: Request, res: Response, next: NextFunction) => {
    req.body = DesignTemplateValidation.createDesignTemplateZodSchema.parse(
      JSON.parse(req.body.data)
    );
    return DesignTemplateController.DesignTemplateInsert(req, res, next);
  }
);
//* by user
router.get(
  "/4869ed1366a18e4e6ebc4f2e5a44776ae2c724d410ca3d56796dbd194ab53b52",
  DesignTemplateController.allDesignTemplateByUser
);

export const DesignTemplateRoute = router;
