import express from "express";
import { UserController } from "./user.controller";

import { ENUM_USER_ROLE } from "../../../enum/user";
import Authentication from "../../middleware/authentication";

const router = express.Router();
router.get(
  "/b8d83be4fc78fce383da7f87661bbf94c5382a40582ac0467e22e8eda492629b",
  Authentication(ENUM_USER_ROLE.ADMIN),
  UserController.getAllUser
);
router.get("/:email", UserController.getUserByEmail);

router.get("/:id", UserController.getUserById);
router.delete("/:id", UserController.deletedUser);

export const UserRoute = router;
