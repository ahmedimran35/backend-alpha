import { Model, Types } from "mongoose";
import { IUser } from "../auth/auth.interface";

export type IIcons = {
  title: string;
  click: number;
  download: number;
  alternativeText: string;
  metaTitle: string;
  metaDescription: string;
  style: string;
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
  uploadedBy: Types.ObjectId | IUser;
  updatedBy: Types.ObjectId | IUser;
  url: string;
  type: string;
  key: string;
};

export type IconsModel = Model<IIcons>;
