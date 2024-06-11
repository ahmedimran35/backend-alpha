import { Schema, model } from 'mongoose'
import {
  DesignTemplateModel,
  IDesignTemplate,
} from './design-template.interface'

const designTemplateSchema = new Schema<IDesignTemplate, DesignTemplateModel>(
  {
    title: {
      type: String,
      required: [true, 'Title Is Required'],
      trim: true,
    },
    url: {
      type: String,
      required: [true, 'Course And Learning URL Is Required'],
    },
    type: {
      type: String,
      required: [true, 'Course And Learning Type Is Required'],
      trim: true,
    },
    previewUrl: {
      type: String,
    },
    previewKey: {
      type: String,
    },
    click: {
      type: Number,
      default: 0,
    },
    download: {
      type: Number,
      default: 0,
    },
    finalDownload: {
      type: Number,
      default: 0,
    },

    alternativeText: {
      type: String,
      required: [true, 'Alternative Text Is Required'],
    },
    description: {
      type: String,
      required: [true, 'Description Is Required'],
    },
    metaTitle: {
      type: String,
      required: [true, 'Meta Title URL Is Required'],
    },
    metaDescription: {
      type: String,
      required: [true, 'meta Description Is Required'],
    },
    uploadedUserEmail: {
      type: String,
      required: [true, 'uploaded UserEmail  Is Required'],
    },
    category: {
      type: String,
      required: [true, 'category Text Is Required'],
      trim: true,
    },
    subCategory: {
      type: String,
      required: [false, 'Sub Category Text Is Required'],
      trim: true,
    },
    uploadedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Uploaded User id required'],
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    tags: {
      tag1: {
        type: String,
      },
      tag2: {
        type: String,
      },
      tag3: {
        type: String,
      },
      tag4: {
        type: String,
      },
      tag5: {
        type: String,
      },
    },
    key: {
      type: String,
      required: [true, 'key Is Required'],
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
)

export const DesignTemplate = model<IDesignTemplate, DesignTemplateModel>(
  'Design-Template',
  designTemplateSchema,
)
