import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import { ImportantPageServices } from './importantPage.services'
import sendResponse from '../../../shared/sendResponse'
import { StatusCodes } from 'http-status-codes'

const insertNewPage = catchAsync(async (req: Request, res: Response) => {
  const result = await ImportantPageServices.insertNewPageIntoDB(req.body)
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'New Page Created Successfully',
    data: result,
  })
})

const getAllPageContent = catchAsync(async (req: Request, res: Response) => {
  const result = await ImportantPageServices.getAllPageContentFormDB()
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'All Page Retrieve Successfully',
    data: result,
  })
})
const getPageContentById = catchAsync(async (req: Request, res: Response) => {
  const result = await ImportantPageServices.getPageContentByIdIntoDB(
    req.params.id,
  )
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: ' Page Retrieve Successfully',
    data: result,
  })
})
const updatePageContent = catchAsync(async (req: Request, res: Response) => {
  const result = await ImportantPageServices.updatePageContentIntoDB(
    req.params.id,
    req.body,
  )
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: ' Page Content Update Successfully',
    data: result,
  })
})
const deletePageById = catchAsync(async (req: Request, res: Response) => {
  const result = await ImportantPageServices.deletePageByIdIntoDB(req.params.id)
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Page Delete Successfully',
    data: result,
  })
})
const getPageContentByQuery = catchAsync(
  async (req: Request, res: Response) => {
    const result = await ImportantPageServices.getPageContentByQueryIntoDB(
      req.query.pageName as string,
    )
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: ' Page Retrieve Successfully',
      data: result,
    })
  },
)

export const ImportantPageController = {
  insertNewPage,
  getAllPageContent,
  getPageContentById,
  updatePageContent,
  deletePageById,
  getPageContentByQuery,
}
