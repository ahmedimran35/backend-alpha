import { z } from "zod";

const createDesignTemplateZodSchema = z.object({
  title: z.string({
    required_error: "Title is required."
  }),
  metaTitle: z.string({
    required_error: "Meta Title is required."
  }),
  alternativeText: z.string({
    required_error: "Alternative Text is required."
  }),
  description: z.string({
    required_error: "Description is required."
  }),
  metaDescription: z.string({
    required_error: "Meta Description is required."
  }),
  uploadedUserEmail: z.string({
    required_error: "uploaded User Email is required."
  }),
  tags: z.array(
    z.string({
      required_error: "Tags is required"
    })
  ),
  category: z.string({
    required_error: "Category is required."
  }),
  subCategory: z.string({
    required_error: "Category is required."
  })
});

const updateDesignTemplateZodSchema = z.object({
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

export const DesignTemplateValidation = {
  createDesignTemplateZodSchema,
  updateDesignTemplateZodSchema
};
