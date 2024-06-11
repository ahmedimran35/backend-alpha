import { Model, Types } from "mongoose";
import { IUser } from "../auth/auth.interface";
import { ICourseAndLearning } from "../course-add-learing/course-add-learning.interface";
import { IIcons } from "../icon/icon.interface";
import { IStockPhotos } from "../stockPhotos/stockPhotos.interface";
import { IDesignTemplate } from "../design-template/design-template.interface";

export type IDownload = {
  assets:
    | Types.ObjectId
    | ICourseAndLearning
    | IIcons
    | IStockPhotos
    | IDesignTemplate;
  assetsModel: string;
  user: Types.ObjectId | IUser;
  userEmail: string;
};

export type IDownloadFilters = {
  searchTerm?: string;
  userEmail?: string;
};

export type downloadModel = Model<IDownload>;
