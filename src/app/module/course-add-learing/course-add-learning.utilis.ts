/* eslint-disable @typescript-eslint/no-explicit-any */
import { IUploadFile } from '../../../interface/file'

export const sendArrayReturnObject = (tags: string[]) => {
  const tagsObject: any = {}
  tags.forEach((tag: string, index: number) => {
    tagsObject[`tag${index + 1}`] = tag
  })
  return tagsObject
}

export function getFileType(file: IUploadFile): string {
  //* Split fine mimetype and get fist index
  const mimeTypeParts = file.mimetype.split('/')
  return mimeTypeParts[1] ? mimeTypeParts[1] : 'Unknown'
}
