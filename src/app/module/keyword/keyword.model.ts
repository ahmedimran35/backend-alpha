import { Schema, model } from 'mongoose'
import { IKeyword, KeywordModel } from './keyword.interface'

const keywordSchema = new Schema<IKeyword, KeywordModel>(
  {
    searchTerm: {
      type: String,
      required: [true, 'Search Term Is required'],
      trim: true,
    },
    count: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
)

export const Keyword = model<IKeyword, KeywordModel>('Keyword', keywordSchema)
