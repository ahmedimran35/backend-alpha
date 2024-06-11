import { Request, Response } from 'express'

import { StatusCodes } from 'http-status-codes'
import { KeywordService } from './keyword.services'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'

const keywordPost = catchAsync(async (req: Request, res: Response) => {
  const result = await KeywordService.keywordPostIntoDB(req.body)

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'keyword posted successfully',
    data: result,
  })
})

const keywordGet = catchAsync(async (req: Request, res: Response) => {
  const result = await KeywordService.getKeywordsFromDB()
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Got List of all keyword',
    data: result,
  })
})

const oneKeywordGet = catchAsync(async (req: Request, res: Response) => {
  const result = await KeywordService.getOneKeywordFromDB(req.params.id)

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Got the identified keyword',
    data: result,
  })
})

const trendingKeywordsGet = catchAsync(async (req: Request, res: Response) => {
  const result = await KeywordService.getTrendingKeywordsFromDB()

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Get all trending keywords',
    data: result,
  })
})

export const keywordController = {
  keywordPost,
  keywordGet,
  oneKeywordGet,
  trendingKeywordsGet,
}
