import jwt, { JwtPayload, Secret } from 'jsonwebtoken'

const createToken = (
  payload: Record<string, unknown>,
  secret: Secret,
  expireTime: string,
): string => {
  return jwt.sign(payload, secret, {
    expiresIn: expireTime,
  })
}

const verifyToken = (token: string, secret: Secret): JwtPayload => {
  return jwt.verify(token, secret) as JwtPayload
}
const decodedJWTToken = (token: string, secret: Secret): JwtPayload | null => {
  try {
    return jwt.verify(token, secret) as JwtPayload
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return null
  }
}

export const jwtHelpers = {
  createToken,
  verifyToken,
  decodedJWTToken,
}
