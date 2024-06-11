import { Model } from 'mongoose'

export type ISoftwareAndTools = {
  title: string
  description: string
  metaTitle: string
  metaDescription: string
  url: string
  key: string
  category: string
  subCategories: []
  pricing: string
  regularPrice: number
  discountPrice: number
  uploadedUserEmail: string
  click: number
  visited: number
  affiliateURL: string
  discountPercentage: number
  briefDescription: string
}

export type SoftwareAndToolsModel = Model<ISoftwareAndTools>

export type ISoftwareAndToolsFilters = {
  searchTerm?: string
  title?: string
  category?: string
  // 'subCategory.category1'?: string
  // 'subCategory.category2'?: string
  // 'subCategory.category3'?: string
  // 'subCategory.category4'?: string
  subCategories?: string
}
