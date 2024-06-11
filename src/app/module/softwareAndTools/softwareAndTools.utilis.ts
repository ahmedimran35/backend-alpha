export const sendArraySubcategoryReturnObject = (categories: string[]) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const categoryObject: any = {}
  categories.forEach((category: string, index: number) => {
    categoryObject[`category${index + 1}`] = category
  })
  return categoryObject
}
