import express from "express";

import { ENUM_USER_ROLE } from "../../../enum/user";
import { AnalyticController } from "./analytics.controller";
import Authentication from "../../middleware/authentication";

const router = express.Router();
// route -=---
router.get(
  "/",
  Authentication(ENUM_USER_ROLE.ADMIN),
  AnalyticController.GetAnalytic
);

export const AnalyticRoute = router;
