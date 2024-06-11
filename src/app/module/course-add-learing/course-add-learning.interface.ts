/* eslint-disable @typescript-eslint/no-explicit-any */
import { Model, Types } from "mongoose";
import { IDesignTemplate } from "../design-template/design-template.interface";
import { IIcons } from "../icon/icon.interface";
import { IStockPhotos } from "../stockPhotos/stockPhotos.interface";
import { IUser } from "../auth/auth.interface";

export type ICourseAndLearning = {
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

  previewUrl: string;
  previewKey: string;
  uploadedBy: Types.ObjectId | IUser;
  updatedBy: Types.ObjectId | IUser;
};
export type ICourseAndLearningFilters = {
  searchTerm?: string;
  category?: string;
  username?: string;
};

export type IAllAssetRetuneResult = {
  designTemplates: {
    result: IDesignTemplate[];
    total: number | any;
  };
  icons: {
    result: IIcons[];
    total: number | any;
  };
  stockPhotos: {
    result: IStockPhotos[];
    total: number | any;
  };
  courseAndLearnings: {
    result: ICourseAndLearning[];
    total: number | any;
  };
};

export type CourseAndLearningModel = Model<ICourseAndLearning>;
