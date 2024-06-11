import { z } from 'zod'

const singUpWithGoogleZodSchema = z.object({
  body: z.object({
    name: z.string(),
    email: z.string({
      required_error: 'Email  is required',
    }),
  }),
})

const accessTokenZobSchema = z.object({
  body: z.object({   
    email:z.string({
      required_error: "Email is required",
    }) 
  })
})

const AuthorizeZodSchema = z.object({
  body: z.object({
    role: z.string({
      required_error: 'Role  is required',
    }),
  }),
})

export const AuthValidation = {
  singUpWithGoogleZodSchema,
  AuthorizeZodSchema,
  accessTokenZobSchema
}
