import { Model } from 'mongoose'

export type IKeyword = {
  searchTerm: string
  count: number
}

export type KeywordModel = Model<IKeyword>
