import { z } from "zod";

const createStockPhotoZodSchema = z.object({
  title: z.string({
    required_error: "Title Is Required"
  }),
  metaTitle: z.string({
    required_error: "Meta TitleTitle Is Required"
  }),
  alternativeText: z.string({
    required_error: "alternative Text Is Required"
  }),
  metaDescription: z.string({
    required_error: "Meta Description Is Required"
  }),
  description: z.string({
    required_error: " Description Is Required"
  }),
  subCategory: z.string({
    required_error: "Sub Category Is Required"
  }),
  tags: z.array(
    z.string({
      required_error: "Tag Is Required"
    })
  ),
  category: z.string({
    required_error: "Category Is Required"
  }),
  uploadedUserEmail: z.string({
    required_error: "Email Is Required"
  })
});

const updateStockPhotoZodSchema = z.object({
  title: z.string(),
  metaTitle: z.string(),
  description: z.string(),
  alternativeText: z.string(),
  metaDescription: z.string(),
  subCategory: z.string(),
  tags: z.array(z.string()),
  category: z.string(),
  uploadedUserEmail: z.string()
});
export const StockPhotoValidation = {
  createStockPhotoZodSchema,
  updateStockPhotoZodSchema
};
