import { NextFunction, Request, Response } from "express";
import API_Error from "../../error/apiError";
import { StatusCodes } from "http-status-codes";
import config from "../../config";
import { Secret } from "jsonwebtoken";
import { jwtHelpers } from "../../helper/jwtHelper";
//Auth Guard
const Authentication =
  (...requiredRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // for mamun bhai token
      // const token = req?.cookies?.refreshToken

      // for jwt process - robiul
      const token = req?.cookies?.token;

      // const token = req.headers.authorization
      if (!token) {
        throw new API_Error(
          StatusCodes.UNAUTHORIZED,
          "Your do not have a token!"
        );
      }
      // verified token
      const verifiedUser = jwtHelpers.verifyToken(
        token,
        config.jwt.secret_token as Secret
      );
      // verified user
      req.user = verifiedUser;

      if (requiredRoles.length && !requiredRoles.includes(verifiedUser.role)) {
        throw new API_Error(StatusCodes.FORBIDDEN, "Imposter");
      }
      next();
    } catch (error) {
      res.status(401).send(`Dangers Ahead!`);
      // next(error);
    }
  };

export default Authentication;
