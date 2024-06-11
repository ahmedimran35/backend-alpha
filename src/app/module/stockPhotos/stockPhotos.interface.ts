import { Model, Types } from "mongoose";
import { IUser } from "../auth/auth.interface";

export type IStockPhotos = {
  title: string;
  click: number;
  download: number;
  alternativeText: string;
  description: string;
  metaTitle: string;
  metaDescription: string;
  uploadedUserEmail: string;
  tags: {
    tag1: string;
    tag2: string;
    tag3: string;
    tag4: string;
    tag5: string;
  };
  finalDownload: number;

  category: string;
  subCategory: string;
  url: string;
  type: string;
  key: string;
  uploadedBy: Types.ObjectId | IUser;
  updatedBy: Types.ObjectId | IUser;
};
export type IStockPhotosFilters = {
  searchTerm?: string;
  category?: string;
};

export type stockPhotosModel = Model<IStockPhotos>;
