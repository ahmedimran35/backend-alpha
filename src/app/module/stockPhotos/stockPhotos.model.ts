import { Schema, model } from "mongoose";
import { IStockPhotos, stockPhotosModel } from "./stockPhotos.interface";

const stockPhotsSchema = new Schema<IStockPhotos, stockPhotosModel>(
  {
    title: {
      type: String,
      required: [true, "Title Is Required"],
      trim: true
    },
    url: {
      type: String,
      required: [true, "Asset URL Is Required"]
    },
    type: {
      type: String,
      required: [true, "Asset Type Is Required"],
      trim: true
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
    },

    alternativeText: {
      type: String,
      required: [true, "Alternative Text Is Required"]
    },
    description: {
      type: String,
      trim: true,
      required: [true, "Description Is Required"]
    },
    metaTitle: {
      type: String,
      trim: true,
      required: [true, "Meta Title URL Is Required"]
    },
    metaDescription: {
      type: String,
      trim: true,
      required: [true, "meta Description Is Required"]
    },
    uploadedUserEmail: {
      type: String,
      required: [true, "uploaded UserEmail  Is Required"]
    },
    category: {
      type: String,
      required: [true, "category Text Is Required"],
      trim: true
    },
    subCategory: {
      type: String,
      required: [false, "Sub Category Text Is Required"],
      trim: true
    },
    tags: {
      tag1: {
        type: String
      },
      tag2: {
        type: String
      },
      tag3: {
        type: String
      },
      tag4: {
        type: String
      },
      tag5: {
        type: String
      }
    },
    key: {
      type: String,
      required: [true, "key Is Required"]
    },
    uploadedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Uploaded User id is required"]
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true
    }
  }
);

export const StockPhotos = model<IStockPhotos, stockPhotosModel>(
  "StockPhotos",
  stockPhotsSchema
);
