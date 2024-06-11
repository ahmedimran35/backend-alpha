import { Schema, model } from 'mongoose'
import { IUser, UserModel } from './auth.interface'

const userSchema = new Schema<IUser, UserModel>(
  {
    name: {
      type: String,
      required: [true, 'Name Is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'email Is required'],
      trim: true,
    },
    role: {
      type: String,
      required: [true, 'Role Is required'],
      default:
        'b881ec7dbd1a2d9c99dda3627cd7a03c6371f0f5df25b516fcee1834cd606b41',
      trim: true,
    },
    username: {
      type: String,
      required: [true, 'Username Is required'],
    },
    status: {
      type: String,
      default: 'Active',
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
)

export const User = model<IUser, UserModel>('User', userSchema)
