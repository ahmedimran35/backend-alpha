import { z } from 'zod'

const SoftwareAndToolsZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title Is Required',
    }),
    metaTitle: z.string({
      required_error: 'Meta TitleTitle Is Required',
    }),
    description: z.string({
      required_error: 'Description Is Required',
    }),
    metaDescription: z.string({
      required_error: 'Meta Description Is Required',
    }),
    category: z.string({
      required_error: 'Category Is Required',
    }),
    subCategory: z.object({}),
    pricing: z.string({
      required_error: 'Pricing Is Required',
    }),
    regularPrice: z.number({
      required_error: 'Regular Price Is Required',
    }),
    discountPrice: z.number().optional(),
    url: z.string({
      required_error: 'URL Is Required',
    }),
    uploadedUserEmail: z.string({
      required_error: 'Email Is Required',
    }),
  }),
})

export const SoftwareAndToolsValidation = {
  SoftwareAndToolsZodSchema,
}
