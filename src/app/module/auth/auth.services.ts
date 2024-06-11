/* eslint-disable @typescript-eslint/no-explicit-any */
import { IUser, IUserResponse } from './auth.interface'
import { User } from './auth.model'
import {
  generateUserName,
  userNameGenerator,
} from '../../../utils/generateRandomUser'
import { singUpGenerateTokenUser } from './auth.utils'
import API_Error from '../../../error/apiError'
import { StatusCodes } from 'http-status-codes'
import { JwtPayload, Secret } from 'jsonwebtoken'
import config from '../../../config'
import { jwtHelpers } from '../../../helper/jwtHelper'

const signupUserIntoDB = async (data: IUser): Promise<IUserResponse> => {
  const isExistUser = await User.findOne({ email: data.email })

  if (isExistUser) {
    const singUpUser = singUpGenerateTokenUser(isExistUser)
    return singUpUser
  }

  const userName = userNameGenerator(data.name)

  data.username = userName.replace(/\s+/g, '-').toLowerCase()

  const result = await User.create(data)

  const singUpUser = singUpGenerateTokenUser(result)

  return singUpUser
}

const makeAuthorizeByRole = async (
  userId: string,
  email: string,
  role: string,
): Promise<IUser | any> => {
  const user = await User.findOne({email})
  if (!user) {
    throw new API_Error(StatusCodes.NOT_FOUND, 'User Not Found')
  }
  const result = await User.findOneAndUpdate({ email }, { role }, { new: true })
  return result
}
// auth services for jwt token process - by robiul hossain
// create token service
const signTokenWithJWT = async (payload: JwtPayload): Promise<string> => {
  return jwtHelpers.createToken(
    payload,
    config.jwt.secret_token as Secret,
    config.jwt.expire_in as string,
  )
}

const saveNewUserToDB = async (payload: JwtPayload) => {
  const { name, email } = payload
  const isExistUser = await User.findOne({ email })
  if (isExistUser) return isExistUser

  // user is new: need a userName for DB
  // generate a username
  const username = generateUserName(name)
  // create user data to save in DB
  const userData = {
    username,
    name,
    email,
  }
  // save user data in DB
  const result = await User.create(userData)
  return result
}

export const AuthService = {
  signupUserIntoDB,
  makeAuthorizeByRole,
  signTokenWithJWT,
  saveNewUserToDB,
}
