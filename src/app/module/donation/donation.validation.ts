import { z } from "zod";

const createDonationZodSchema = z.object({
  body: z.object({
    amount: z.number({
      required_error: "number  is required"
    })
  })
});

export const DownloadValidation = {
  createDonationZodSchema
};
