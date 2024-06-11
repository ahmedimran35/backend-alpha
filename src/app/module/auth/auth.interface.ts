import { Model } from 'mongoose'

export type IUser = {
  _id: string
  name: string
  email: string
  role: string
  username: string
  status: string
}

export type UserModel = Model<IUser>

export type IUserResponse = {
  user: IUser
  token: {
    accessToken?: string
    refreshToken?: string
  }
}
