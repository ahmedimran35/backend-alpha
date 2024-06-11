import { Model } from 'mongoose'

export type IImportantPage = {
  pageName: string
  content: string
  category: string
}

export type ImportantPageModel = Model<IImportantPage>
