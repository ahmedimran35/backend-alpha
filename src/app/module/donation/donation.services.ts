import { StatusCodes } from 'http-status-codes'
import API_Error from '../../../error/apiError'
import { IDonation, IDonationFilters } from './donation.interface'
import mongoose, { SortOrder } from 'mongoose'
import { Donation } from './donation.model'
import { IPaginationOptions } from '../../../interface/pagination'
import { donationSearchableFields } from './donation.constant'
import Stripe from 'stripe'
import { User } from '../auth/auth.model'
import { IGenericResponse } from '../../../interface/common'
import { paginationHelpers } from '../../../helper/paginationHelper'
import { generateSecureTransactionId } from './donation.utils'
import config from '../../../config'
// import config from '../../../config'
const stripe = new Stripe(config.stripeSecretKey as string)
const insertDonationIntoDB = async (
  data: IDonation,
  // userId: string,
): Promise<IDonation> => {
  const user = await User.findOne({ email: data?.userEmail })

  if (!user) {
    throw new API_Error(StatusCodes.NOT_FOUND, 'User Not Found')
  }
  data.paymentMethod = 'Stripe'
  data.transactionId = generateSecureTransactionId(14)
  // data.userEmail = user?.email
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data.user = user._id as mongoose.Types.ObjectId | any
  const result = await Donation.create(data)

  return result
}
const getAllDonationListFromDB = async (
  filters: IDonationFilters,
  pagination: IPaginationOptions,
): Promise<IGenericResponse<IDonation[]>> => {
  const { searchTerm, ...filterData } = filters
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(pagination)
  const andCondition = []

  if (searchTerm) {
    andCondition.push({
      $or: donationSearchableFields.map(filed => ({
        [filed]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    })
  }
  if (Object.keys(filterData).length) {
    andCondition.push({
      $and: Object.entries(filterData).map(([filed, value]) => ({
        [filed]: value,
      })),
    })
  }
  const sortConditions: { [key: string]: SortOrder } = {}
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder
  }
  const whereConditions = andCondition.length > 0 ? { $and: andCondition } : {}
  const result = await Donation.find(whereConditions)
    .populate('user')
    .skip(skip)
    .limit(limit)
    .sort(sortConditions)

  const total = await Donation.countDocuments(whereConditions)
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}
const getDonationByIdFromDB = async (id: string) => {
  const result = await Donation.findById(id)
  return result
}
const deleteDonationByIdFromDB = async (id: string) => {
  const result = await Donation.deleteOne({ _id: id })
  return result
}
const updateDonationByIdIntoDB = async (data: IDonation, id: string) => {
  const result = await Donation.updateOne({ _id: id }, data, { new: true })
  return result
}

const myDonationListFromDB = async (
  userId: string,
  pagination: IPaginationOptions,
): Promise<IGenericResponse<IDonation[]>> => {
  if (!userId) {
    throw new API_Error(StatusCodes.NOT_FOUND, 'User Not Found')
  }
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(pagination)
  const sortConditions: { [key: string]: SortOrder } = {}
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder
  }
  const result = await Donation.find({ user: userId })
    .skip(skip)
    .limit(limit)
    .sort(sortConditions)
  const total = await Donation.countDocuments({ user: userId })
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

const paymentByStripe = async (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  email: string,
  amount: string,
  name: string,
): Promise<{ clientSecret: string | null }> => {
  // const { amount, email } = data
  try {
    if (!email || !amount) {
      throw new API_Error(
        StatusCodes.BAD_REQUEST,
        'email or amount is required',
      )
    }
    const amountInCents = parseInt(amount, 10) * 100
    if (isNaN(amountInCents) || amountInCents <= 0) {
      throw new API_Error(StatusCodes.BAD_REQUEST, 'Invalid amount value')
    }
    const customer = await stripe.customers.create({
      name: name,
      email: email, // Optional
    })

    const paymentIntent = await stripe.paymentIntents.create({
      amount: parseInt(amount) * 100,
      currency: 'usd',
      automatic_payment_methods: {
        enabled: false,
      },
      payment_method_types: ['card'],
      receipt_email: email,
      customer: customer.id,
    })

    return {
      clientSecret: paymentIntent.client_secret,
    }
  } catch (error) {
    if (error instanceof Stripe.errors.StripeError) {
      switch (error.type) {
        case 'StripeCardError':
          throw new API_Error(
            StatusCodes.PAYMENT_REQUIRED,
            `A payment error occurred: ${error.message}`,
          )
        case 'StripeInvalidRequestError':
          throw new API_Error(
            StatusCodes.BAD_REQUEST,
            `Invalid request: ${error.message}`,
          )
        case 'StripeAPIError':
          throw new API_Error(
            StatusCodes.INTERNAL_SERVER_ERROR,
            `Internal Stripe API error: ${error.message}`,
          )
        case 'StripeConnectionError':
          throw new API_Error(
            StatusCodes.BAD_GATEWAY,
            `Network error: ${error.message}`,
          )
        case 'StripeAuthenticationError':
          throw new API_Error(
            StatusCodes.UNAUTHORIZED,
            `Authentication error: ${error.message}`,
          )
        default:
          throw new API_Error(
            StatusCodes.INTERNAL_SERVER_ERROR,
            `Unexpected error: ${error.message}`,
          )
      }
    }
    throw new API_Error(
      StatusCodes.INTERNAL_SERVER_ERROR,
      'An unexpected error occurred',
    )
  }
}

export const DonationService = {
  insertDonationIntoDB,
  getAllDonationListFromDB,
  getDonationByIdFromDB,
  deleteDonationByIdFromDB,
  updateDonationByIdIntoDB,
  myDonationListFromDB,
  paymentByStripe,
}
