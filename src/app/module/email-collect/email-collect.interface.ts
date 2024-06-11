import { Model } from 'mongoose'

export type IEmailCollect = {
  email: string
}

export type EmailModel = Model<IEmailCollect>
