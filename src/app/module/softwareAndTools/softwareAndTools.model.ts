import { Schema, model } from 'mongoose'
import {
  ISoftwareAndTools,
  SoftwareAndToolsModel,
} from './softwareAndTools.interface'

const softwareAndToolsSchema = new Schema<
  ISoftwareAndTools,
  SoftwareAndToolsModel
>(
  {
    title: {
      type: String,
      trim: true,
      required: [true, 'Title Is Required'],
    },
    metaTitle: {
      type: String,
      trim: true,
      required: [true, 'Meta Title Is Required'],
    },
    description: {
      type: String,
      required: [true, 'Description Is Required'],
    },
    metaDescription: {
      type: String,
      required: [true, 'Meta Description Is Required'],
    },
    briefDescription: {
      type: String,
      // required: [true, 'Brief Description  Is Required'],
    },
    category: {
      type: String,
      trim: true,
      required: [true, 'Category Is Required'],
    },
    affiliateURL: {
      type: String,
      trim: true,
      required: [true, 'Affiliate URL Is Required'],
    },
    subCategories: [],
    url: {
      type: String,
      trim: true,
      required: [true, 'URL Is Required'],
    },
    key: {
      type: String,
    },
    pricing: {
      type: String,
      required: [true, 'Pricing Is Required'],
    },
    regularPrice: {
      type: Number,
      // default: 0,
    },
    discountPrice: {
      type: Number,
    },
    uploadedUserEmail: {
      type: String,
      required: [true, 'Upload User Email'],
    },
    click: {
      type: Number,
      default: 0,
    },
    visited: {
      type: Number,
      default: 0,
    },
    discountPercentage: {
      type: Number,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
)

export const SoftwareAndTools = model<ISoftwareAndTools, SoftwareAndToolsModel>(
  'SoftwareAndTools',
  softwareAndToolsSchema,
)
