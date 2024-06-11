/* eslint-disable @typescript-eslint/no-explicit-any */
import { StatusCodes } from "http-status-codes";
import API_Error from "../../../error/apiError";
import { IImportantPage } from "./importantPage.interface";
import { ImportantPage } from "./importantPage.model";

const insertNewPageIntoDB = async (
  data: IImportantPage
): Promise<IImportantPage> => {
  const isExistPage = await ImportantPage.findOne({ pageName: data.pageName });
  if (isExistPage) {
    throw new API_Error(StatusCodes.CONFLICT, "The page already exists");
  }
  const result = await ImportantPage.create(data);
  return result;
};

const getAllPageContentFormDB = async (): Promise<IImportantPage[]> => {
  const result = await ImportantPage.find({}).sort({ updatedAt: "desc" });
  return result;
};
const getPageContentByIdIntoDB = async (
  id: string
): Promise<IImportantPage | null> => {
  const result = await ImportantPage.findById(id);
  return result;
};
const updatePageContentIntoDB = async (
  id: string,
  data: Partial<IImportantPage>
): Promise<IImportantPage | null | any> => {
  const result = await ImportantPage.findByIdAndUpdate(id, data, { new: true });
  return result;
};
const deletePageByIdIntoDB = async (
  id: string
): Promise<IImportantPage | null> => {
  const result = await ImportantPage.findByIdAndDelete(id);
  return result;
};

const getPageContentByQueryIntoDB = async (
  pageName: string
): Promise<IImportantPage | null> => {
  const result = await ImportantPage.findOne({ pageName });
  return result;
};

export const ImportantPageServices = {
  insertNewPageIntoDB,
  getAllPageContentFormDB,
  getPageContentByIdIntoDB,
  updatePageContentIntoDB,
  deletePageByIdIntoDB,
  getPageContentByQueryIntoDB
};
