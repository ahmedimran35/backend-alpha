import { Schema, model } from 'mongoose'
import { EmailModel, IEmailCollect } from './email-collect.interface'

const EmailCollectSchema = new Schema<IEmailCollect, EmailModel>(
  {
    email: {
      type: String,
      required: [true, 'Email Is Required'],
      trim: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
)
export const EmailCollect = model<IEmailCollect, EmailModel>(
  'email-collect',
  EmailCollectSchema,
)
