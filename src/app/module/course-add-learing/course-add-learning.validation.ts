import { z } from "zod";

const createZodSchema = z.object({
  title: z.string({
    required_error: "title is required"
  }),
  metaTitle: z.string({
    required_error: "meta Title Text  is required"
  }),
  alternativeText: z.string({
    required_error: "Alternative Text  is required"
  }),
  description: z.string({
    required_error: "Description is required"
  }),

  metaDescription: z.string({
    required_error: "meta Description Text  is required"
  }),
  uploadedUserEmail: z.string({
    required_error: "uploadedUser Email is required"
  }),
  tags: z.array(
    z.string({
      required_error: "tags Text  is required"
    })
  ),
  category: z.string({
    required_error: "category Text  is required"
  }),
  subCategory: z.string({
    required_error: "Sub Category Is Required"
  })
});

const updateZodSchema = z.object({
  title: z.string(),
  metaTitle: z.string(),
  alternativeText: z.string(),
  description: z.string(),
  metaDescription: z.string(),
  uploadedUserEmail: z.string(),
  tags: z.array(z.string()),
  category: z.string(),
  subCategory: z.string()
});

export const CourseAndLearningValidation = {
  createZodSchema,
  updateZodSchema
};
