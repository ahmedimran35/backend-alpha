import { IKeyword } from './keyword.interface'
import { Keyword } from './keyword.model'

const keywordPostIntoDB = async (data: IKeyword): Promise<IKeyword> => {
  const keywordTerm = await Keyword.create(data)
  return keywordTerm
}

const getKeywordsFromDB = async (): Promise<IKeyword[]> => {
  const allKeywords = await Keyword.find()
  return allKeywords
}

const getOneKeywordFromDB = async (id: string): Promise<IKeyword | null> => {
  const keyword = await Keyword.findById(id)
  return keyword
}

const getTrendingKeywordsFromDB = async (): Promise<IKeyword[]> => {
  const trendingKeywords = await Keyword.find().sort({ count: -1 })
  return trendingKeywords
}

export const KeywordService = {
  keywordPostIntoDB,
  getKeywordsFromDB,
  getOneKeywordFromDB,
  getTrendingKeywordsFromDB,
}
