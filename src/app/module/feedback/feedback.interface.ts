import { Model } from "mongoose";

export type IFeedBack = {
  reason: string;
  email: string;
  message: string;
  status: string;
  file: string;
  key: string;
};

export type FeedbackModel = Model<IFeedBack>;

export type IFeedbackFilters = {
  searchTerm?: string;
  reason?: string;
  email?: string;
  status?: string;
};
