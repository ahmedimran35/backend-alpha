import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'

import { StatusCodes } from 'http-status-codes'
import { SoftwareAndToolsServices } from './softwareAndTools.services'
import pick from '../../../shared/pick'
import { softwareAndToolsFilterableFields } from './softwareAndTools.constant'
import { paginationFields } from '../../../constants/pagination'

const insertSoftWareAndTool = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await SoftwareAndToolsServices.insertSoftWareAndToolIntoDB(req)
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Software and tools post Successfully',
      data: result,
    })
  },
)
//
const viewAllSoftwareAndTools = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, softwareAndToolsFilterableFields)
    const paginationOptions = pick(req.query, paginationFields)
    const result = await SoftwareAndToolsServices.viewAllSoftwareAndToolsFromDB(
      filters,
      paginationOptions,
    )
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Software and tools fetch Successfully',
      data: result,
    })
  },
)
const viewSoftwareAndToolsById = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await SoftwareAndToolsServices.viewSoftwareAndToolsByIdFromDB(
        req.params.id,
      )
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Single Software and tools fetch Successfully',
      data: result,
    })
  },
)
const viewSoftwareAndToolsByIdWithAdmin = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await SoftwareAndToolsServices.viewSoftwareAndToolsByIdWithAdminFromDB(
        req.params.id,
      )
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Single Software and tools fetch Successfully',
      data: result,
    })
  },
)
const updateSoftwareAndTools = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await SoftwareAndToolsServices.updateSoftwareAndToolsIntoDB(req)
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: ' Software and tools update Successfully',
      data: result,
    })
  },
)
const deleteSoftwareAndTools = catchAsync(
  async (req: Request, res: Response) => {
    const result = await SoftwareAndToolsServices.deleteSoftwareAndToolsFromDB(
      req.query.key as string,
    )
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: ' Software and tools delete Successfully',
      data: result,
    })
  },
)
const visitedPartnerWebsiteCount = catchAsync(
  async (req: Request, res: Response) => {
    const result = await SoftwareAndToolsServices.visitedPartnerWebsiteCount(
      req.params.id,
    )
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: ' Software and tools Calculate Successfully',
      data: result,
    })
  },
)
export const SoftwareAndToolsController = {
  insertSoftWareAndTool,
  viewAllSoftwareAndTools,
  viewSoftwareAndToolsById,
  viewSoftwareAndToolsByIdWithAdmin,
  updateSoftwareAndTools,
  deleteSoftwareAndTools,
  visitedPartnerWebsiteCount,
}
