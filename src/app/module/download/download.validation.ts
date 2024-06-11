import { z } from 'zod'

const createDownloadZodSchema = z.object({
  body: z.object({
    assets: z.string({
      required_error: 'Asset Id is required',
    }),
    userEmail: z.string({
      required_error: 'Email  is required',
    }),
  }),
})

export const DownloadValidation = {
  createDownloadZodSchema,
}
