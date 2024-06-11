import { Schema, model } from 'mongoose'
import { IImportantPage, ImportantPageModel } from './importantPage.interface'

const ImportantPageSchema = new Schema<IImportantPage, ImportantPageModel>(
  {
    category: {
      type: String,
      required: [true, 'Category Is Required'],
    },
    pageName: {
      type: String,
      required: [true, 'Page Name Is Required'],
    },
    content: {
      type: String,
      required: [true, 'Content is required'],
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
)

export const ImportantPage = model<IImportantPage, ImportantPageModel>(
  'Page',
  ImportantPageSchema,
)
