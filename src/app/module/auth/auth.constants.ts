import config from '../../../config'

export const cookieOptions: {
  maxAge: number,
  secure: boolean
  httpOnly: boolean
  withCredentials: boolean
  sameSite: 'none' | 'strict'
  path: '/'
} = {
  maxAge: Math.floor(Date.now() / 1000) + (60 * 60), // 1hr expiration time
  secure: true,
  httpOnly: config.env === 'production' ? true : false,
  sameSite: config.env === 'production' ? 'none' : 'strict',
  withCredentials: false,
  path: '/',
}

export const clearCookieOptions: {
  maxAge: number
  secure: boolean
  httpOnly: boolean
  sameSite: 'none' | 'strict'
  path: '/'
} = {
  maxAge: 0,
  secure: true,
  httpOnly: config.env === 'production' ? true : false,
  sameSite: config.env === 'production' ? 'none' : 'strict',
  path: '/',
}