import express from "express";

import { ENUM_USER_ROLE } from "../../../enum/user";
import { DonationController } from "./donation.controller";

import { DownloadValidation } from "./donation.validation";
import ValidateRequestAPI from "../../middleware/ValidationRequest";
import Authentication from "../../middleware/authentication";

const route = express.Router();

// My donation History(my-donation-history)

route.get(
  "/8e49a078cbaffe51b3415e4171a127b6915eb8682043812c7ebaeb934aa73364",
  Authentication(ENUM_USER_ROLE.USER),
  DonationController.myDonationList
);
//* stripe payment Intent(create-payment-intent)
route.get(
  "/0cf8eb5b92c777c6fa92bd4fc20281b12194f78e4675fab877f2969613114525",
  DonationController.paymentByStripe
);
route.get("/:id", DonationController.getDonationById);
route.delete("/:id", DonationController.deleteDonationById);
route.patch("/:id", DonationController.updateDonationById);
route.post(
  "/",
  ValidateRequestAPI(DownloadValidation.createDonationZodSchema),
  // Authentication(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.SEO, ENUM_USER_ROLE.ADMIN),
  DonationController.insertDonation
);
route.get("/", DonationController.getAllDonationList);

export const DonationRoute = route;
