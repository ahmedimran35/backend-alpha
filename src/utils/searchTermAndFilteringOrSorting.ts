import { SortOrder } from 'mongoose'

/* eslint-disable @typescript-eslint/no-explicit-any */
export const checkSearchTermAndPushAndCondition = (
  andCondition: any[],
  searchFiled: string[],
  searchTerm: string,
) => {
  /*
   * First map searchable filed
   * Use regex
   * options means all search text convert lowercase
   * finally Push and condition searching data
   */
  andCondition.push({
    $or: searchFiled.map(filed => ({
      [filed]: {
        $regex: searchTerm,
        $options: 'i',
      },
    })),
  })
}

//* Declare filtering type
type IFiltering = {
  searchTerm?: string
  category?: string
  type?: string
  subCategory?: string
}

export const filterDataAndPushAndCondition = (
  andCondition: any[],
  filterData: IFiltering,
) => {
  /*
   * First convert filterData on array and map
   * finally Push and condition searching data
   */
  andCondition.push({
    $and: Object.entries(filterData).map(([field, value]) => ({
      [field]: value,
    })),
  })
}
//* Declare a sorting type
type SortingConditions = {
  [key: string]: SortOrder
}
/**
 *
 * @param sortBy
 * @param sortOrder
 * @returns matching ase or desc retune object
 */
export const sortingConditionData = (
  sortBy: string,
  sortOrder: SortOrder,
): SortingConditions => {
  const sortConditions: SortingConditions = {}

  if (sortBy && (sortOrder === 'asc' || sortOrder === 'desc')) {
    sortConditions[sortBy] = sortOrder as SortOrder
  }
  return sortConditions
}
