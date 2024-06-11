import { IEmailCollect } from './email-collect.interface'
import { EmailCollect } from './email-collect.model'

const emailCollectIntoDB = async (
  data: IEmailCollect,
): Promise<IEmailCollect> => {
  return await EmailCollect.create(data)
}

const getAllEmailCollectFromDB = async () => {
  return await EmailCollect.find({})
}

export const EmailCollectServices = {
  emailCollectIntoDB,
  getAllEmailCollectFromDB,
}
