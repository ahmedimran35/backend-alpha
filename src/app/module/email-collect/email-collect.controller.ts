import { StatusCodes } from 'http-status-codes'
import catchAsync from '../../../shared/catchAsync'
import { IEmailCollect } from './email-collect.interface'
import { EmailCollectServices } from './email-collect.services'
import sendResponse from '../../../shared/sendResponse'
import { Request, Response } from 'express'

const emailCollect = catchAsync(async (req: Request, res: Response) => {
  const result = await EmailCollectServices.emailCollectIntoDB(req.body)
  sendResponse<IEmailCollect>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Sending Successfully',
    data: result,
  })
})

const getAllEmailCollect = catchAsync(async (req: Request, res: Response) => {
  const result = await EmailCollectServices.getAllEmailCollectFromDB()
  sendResponse<IEmailCollect[]>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'All Email retrieve Successfully',
    data: result,
  })
})

export const EmailCollectController = {
  emailCollect,
  getAllEmailCollect,
}
