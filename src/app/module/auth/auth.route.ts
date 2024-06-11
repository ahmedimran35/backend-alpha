import express from "express";
import { AuthController } from "./auth.controller";
import ValidateRequestAPI from "../../middleware/ValidationRequest";
import { AuthValidation } from "./auth.validation";

import { ENUM_USER_ROLE } from "../../../enum/user";
import Authentication from "../../middleware/authentication";

const router = express.Router();

router.post(
  "/signin",
  ValidateRequestAPI(AuthValidation.singUpWithGoogleZodSchema),
  AuthController.signupUser
);
router.patch(
  "/authorization/:email",
  Authentication(ENUM_USER_ROLE.ADMIN),
  ValidateRequestAPI(AuthValidation.AuthorizeZodSchema),
  AuthController.makeAuthorizeByRole
);
// auth - access-token
router.post(
  "/access-token",
  ValidateRequestAPI(AuthValidation.accessTokenZobSchema),
  AuthController.accessToken
);

// auth - clear token
router.get("/clear-token", AuthController.clearToken);

// auth - create new user in database - removed
// router.post('/create-user', AuthController.createUser);

export const AuthRoute = router;
