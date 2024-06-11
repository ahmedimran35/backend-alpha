import { Schema, model } from "mongoose";
import { IIcons, IconsModel } from "./icon.interface";

const IconsSchema = new Schema<IIcons, IconsModel>(
  {
    title: {
      type: String,
      trim: true,
      required: [true, "Title Is Required"]
    },
    url: {
      type: String,
      required: [true, "Icon URL Is Required"]
    },
    type: {
      type: String,
      trim: true,
      required: [false, "Icon Type Is Required"]
    },

    alternativeText: {
      type: String,
      trim: true,
      required: [true, "Alternative Text Is Required"]
    },

    metaTitle: {
      type: String,
      trim: true,
      required: [true, "Meta Title URL Is Required"]
    },
    metaDescription: {
      type: String,
      trim: true,
      required: [true, "Meta Description Is Required"]
    },
    uploadedUserEmail: {
      type: String,
      trim: true,
      required: [true, "Uploaded UserEmail  Is Required"]
    },
    category: {
      type: String,
      trim: true,
      required: [true, "Category Text Is Required"]
    },
    subCategory: {
      type: String,
      trim: true,
      required: [true, "Subcategory Text Is Required"]
    },
    style: {
      type: String,
      trim: true,
      required: [true, "style Text Is Required"]
    },
    uploadedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Uploaded User id required"]
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    tags: {
      tag1: {
        trim: true,
        type: String
      },
      tag2: {
        trim: true,
        type: String
      },
      tag3: {
        trim: true,
        type: String
      },
      tag4: {
        trim: true,
        type: String
      },
      tag5: {
        trim: true,
        type: String
      }
    },
    key: {
      trim: true,
      type: String,
      required: [true, "key Is Required"]
    },
    click: {
      type: Number,
      default: 0
    },
    download: {
      type: Number,
      default: 0
    },
    finalDownload: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true
    }
  }
);

export const Icons = model<IIcons, IconsModel>("Icons", IconsSchema);
