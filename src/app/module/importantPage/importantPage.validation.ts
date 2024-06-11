import { z } from 'zod'

const createPageZodSchema = z.object({
  body: z.object({
    pageName: z.string({
      required_error: 'Page Name  is required',
    }),
    content: z.string({
      required_error: 'Content  is required',
    }),
    category: z.string({
      required_error: 'Category  is required',
    }),
  }),
})

export const PageValidation = {
  createPageZodSchema,
}
