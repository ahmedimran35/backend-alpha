import { IUploadFile } from '../interface/file'

export const sendArrayReturnObject = (tags: string[]) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const tagsObject: any = {}
  tags.forEach((tag: string, index: number) => {
    tagsObject[`tag${index + 1}`] = tag
  })
  return tagsObject
}

//* Split fine mimetype and get fist index
export function getFileType(file: IUploadFile): string {
  const mimeTypeParts = file.mimetype.split('/')
  return mimeTypeParts[1] ? mimeTypeParts[1] : 'Unknown'
}

export const parseTags = (tagsJson: string) => {
  try {
    return JSON.parse(tagsJson)
  } catch (error) {
    return {} // Return an empty object if parsing fails
  }
}
// Online Javascript Editor for free
// Write, Edit and Run your Javascript code using JS Online Compiler

// function generateGetFileType(filePath: any): string {
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const fileExtension: any = filePath.split('.').pop().toLowerCase()

//   const fileTypes = {
//     txt: 'txt',
//     pdf: 'pdf',
//     doc: 'doc',
//     docx: 'docx',
//     xls: 'xls',
//     xlsx: 'xls',
//     png: 'png',
//     jpg: 'jpg',
//     jpeg: 'jpeg',
//     gif: 'gif',
//     zip: 'zip',
//     rar: 'rar',
//     py: 'py',
//     svg: 'svg',
//     webp: 'webp',
//     // Add more extensions and their descriptions as needed
//   }

//   // Return the file type based on the extension
//   return fileTypes[fileExtension] || 'Unknown'
// }
