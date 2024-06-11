import { Request, Response } from "express";
import { rateLimit } from "express-rate-limit";
import config from "../../config";

export const RequestLimit = rateLimit({
  windowMs: 15 * 60 * 1000, //*(15 Minutes)
  max: config.env === "development" ? 1000 : 5000,
  statusCode: 429,
  message: "Too many requests from this IP, please try again later",
  handler: (req: Request, res: Response) => {
    res.status(429).json({
      message: "Too many requests from this IP, please try again later"
    });
  },
  headers: true
});
