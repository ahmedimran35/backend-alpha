import { Request, Response } from 'express'

import pick from '../../../shared/pick'

import { paginationFields } from '../../../constants/pagination'
import { UserService } from './user.services'
import sendResponse from '../../../shared/sendResponse'
import { IUser } from '../auth/auth.interface'
import { StatusCodes } from 'http-status-codes'
import catchAsync from '../../../shared/catchAsync'
import { userFilterableFields } from './user.constant'

const getAllUser = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, userFilterableFields)
  const paginationOptions = pick(req.query, paginationFields)
  const result = await UserService.getAllUserFromDB(filters, paginationOptions)

  sendResponse<IUser[]>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User Fetch successfully !',
    meta: result.meta,
    data: result.data,
  })
})

const getUserById = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.getUserByIdFromDB(req.params.id)
  sendResponse<IUser>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User Fetch successfully !',
    data: result,
  })
})

const deletedUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.deleteUserByIdIntoDB(req.params.id)
  sendResponse<IUser>(res, {
    statusCode: StatusCodes.NO_CONTENT,
    success: true,
    message: 'User delete successfully !',
    data: result,
  })
})
const getUserByEmail = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.getUserByEmail(req.params.email)
  sendResponse<IUser>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User Fetch successfully !',
    data: result,
  })
})

export const UserController = {
  getAllUser,
  deletedUser,
  getUserById,
  getUserByEmail,
}
