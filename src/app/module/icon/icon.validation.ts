import { z } from "zod";

const createIconZodSchema = z.object({
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
  style: z.string({
    required_error: "style Is Required"
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

const updateIconZodSchema = z.object({
  title: z.string(),
  metaTitle: z.string(),
  alternativeText: z.string(),
  metaDescription: z.string(),
  style: z.string(),
  subCategory: z.string(),
  tags: z.array(z.string()),
  category: z.string(),
  uploadedUserEmail: z.string()
});

const bulkIconUploadZodSchema = z.object({
  body: z.object({
    titles: z.union([
      z.array(
        z.string({
          required_error: "Titles is required."
        })
      ),
      z.string({
        required_error: "Title is required."
      })
    ]),
    categories: z.union([
      z.array(
        z.string({
          required_error: "Categorys is required"
        })
      ),
      z.string({
        required_error: "Category is required"
      })
    ]),
    tags: z.union([
      z.array(
        z.string({
          required_error: "Tags is required."
        })
      ),
      z.string({
        required_error: "Tag is required."
      })
    ]),
    metaTitles: z.union([
      z.array(
        z.string({
          required_error: "Meta titles is required."
        })
      ),
      z.string({
        required_error: "Meta title is required."
      })
    ]),
    metaDescriptions: z.union([
      z.array(
        z.string({
          required_error: "Meta Descriptions is required."
        })
      ),
      z.string({
        required_error: "Meta Description is required."
      })
    ]),
    uploadedUserEmails: z.union([
      z.array(
        z.string({
          required_error: "Uploaded Users Emails is required."
        })
      ),
      z.string({
        required_error: "Uploaded User Emails is required."
      })
    ]),
    alternativeTexts: z.union([
      z.array(
        z.string({
          required_error: "Alternative Text is required."
        })
      ),
      z.string({
        required_error: "Alternative Text is required."
      })
    ]),
    subCategories: z.union([
      z.array(
        z.string({
          required_error: "Sub Categorys Is required."
        })
      ),
      z.string({
        required_error: "Sub Category Is required."
      })
    ]),
    styles: z.union([
      z.array(
        z.string({
          required_error: "Styles Is required."
        })
      ),
      z.string({
        required_error: "Style Is required."
      })
    ])
  })
});

export const IconValidation = {
  createIconZodSchema,
  updateIconZodSchema,
  bulkIconUploadZodSchema
};
