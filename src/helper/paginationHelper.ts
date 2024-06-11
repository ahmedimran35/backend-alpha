import { SortOrder } from 'mongoose'
//* Declare pagination option type
type IOptions = {
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: SortOrder
}

//* Declare result type
type IOptionsResult = {
  page: number
  limit: number
  skip: number
  sortBy: string
  sortOrder: SortOrder
}

const calculatePagination = (options: IOptions): IOptionsResult => {
  //* If have page number and limit or skip otherwise set default
  const page = Number(options.page || 1)
  const limit = Number(options.limit || 30)
  const skip = (page - 1) * limit

  const sortBy = options.sortBy || 'createdAt'
  const sortOrder = options.sortOrder || 'desc'

  return {
    page,
    limit,
    skip,
    sortBy,
    sortOrder,
  }
}

export const paginationHelpers = {
  calculatePagination,
}
