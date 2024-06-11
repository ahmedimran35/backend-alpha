import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import sendResponse from '../../../shared/sendResponse'
import { AuthService } from './auth.services'
import catchAsync from '../../../shared/catchAsync'
import { JwtPayload } from 'jsonwebtoken'
import { clearCookieOptions, cookieOptions } from './auth.constants'

const signupUser = catchAsync(async (req: Request, res: Response) => {
  // signup/signin user and save the
  const result = await AuthService.signupUserIntoDB(req.body)
  const { user, token } = result
  //set refresh token into  user cookie
  res.cookie('refreshToken', token.refreshToken, cookieOptions)

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Signin Successfully!',
    data: {
      user,
      token: token,
    },
  })
})

const makeAuthorizeByRole = catchAsync(async (req: Request, res: Response) => {
  const user = (req as JwtPayload).user
  const result = await AuthService.makeAuthorizeByRole(
    user.userId as string,
    req.params.email as string,
    req.body.role,
  )
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Authorize Successfully',
    data: result,
  })
})

// Auth Related API by Robiul Hossain Fahad
// access-token api controller
const accessToken = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body
  // save user in database if user is new
  const result = await AuthService.saveNewUserToDB(payload)
  // add role to payload
  payload.role = result?.role
  payload.userId = result?._id
  // create token
  const token = await AuthService.signTokenWithJWT(payload)
  // set the cookie
  res.cookie('token', token, cookieOptions)
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Cookie named token set Successfully!',
  })
})

// clear-token api controller
const clearToken = catchAsync(async (req: Request, res: Response) => {
  // clear cookie from client cookie jar
  res.clearCookie('token', clearCookieOptions)
  // send a json response to acknowledge that
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Cookie named token cleared Successfully!',
  })
})

// create new user in database - removed
// const createUser = catchAsync(async (req: Request, res: Response) => {
//   const payload = req?.body
//   // save user in database if user is new
//   const result = await AuthService.saveNewUserToDB(payload)
//   // send result
//   res.send({ success: result })
// })

export const AuthController = {
  signupUser,
  makeAuthorizeByRole,
  accessToken,
  clearToken,
  // createUser,
}
