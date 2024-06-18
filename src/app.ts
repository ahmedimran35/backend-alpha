import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { StatusCodes } from "http-status-codes";
import { ApplicationRoute } from "./app/routes";
import globalErrorHandler from "./app/middleware/globalErrorHandler";
import helmet from "helmet";
import { RequestLimit } from "./app/middleware/requestLimit";
// Initialize
const app: Application = express();

// middleware--------
app.use([
  cookieParser(),
  express.json(),
  express.urlencoded({ extended: true })
]);

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "http://209.126.4.170",
      "https://ytshops.co",
      "https://ytshops.com",
      "http://127.0.0.1:5173"
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"]
    // optionsSuccessStatus: 200,
  })
);
//*This Middleware help to Cross-Site Scripting(XSS) Protection
app.use(helmet.xssFilter());

//* Request Limitation
app.use(RequestLimit);
// Application Route---------------
app.use("/api/v1", ApplicationRoute);

//Root Route-----------
app.get("/", (req: Request, res: Response) => {
  res.status(StatusCodes.OK).send({
    StatusCodes: 404,
    message: "Le paglu Dance.."
  });
});

// Handle Not Found API -------
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(StatusCodes.NOT_FOUND).send({
    success: false
  });
  next();
});

// handle global error
app.use(globalErrorHandler);

export default app;
