import { Secret } from 'jsonwebtoken'
import { IUser, IUserResponse } from './auth.interface'
import config from '../../../config'
import { jwtHelpers } from '../../../helper/jwtHelper'

export const singUpGenerateTokenUser = (user: IUser): IUserResponse => {
  const accessToken = jwtHelpers.createToken(
    {
      userId: user._id,
      role: user.role,
      email: user.email,
    },
    config.jwt.secret_token as Secret,
    config.jwt.expire_in as string,
  )
  const refreshToken = jwtHelpers.createToken(
    {
      userId: user._id,
      role: user.role,
      email: user.email,
    },
    config.jwt.refresh_token as Secret,
    config.jwt.refresh_expire_in as string,
  )
  return {
    user: user,
    token: {
      accessToken,
      refreshToken,
    },
  }
}
