import globalErrorHandler from '../app/middleware/globalErrorHandler'
import express, { NextFunction, Request, Response } from 'express'
import { ApplicationRoute } from '../app/routes'
import cookieParser from 'cookie-parser'

export const TestingApp = () => {
  const app = express()

  //middleware
  // app.use([express.json()])
  app.use(express.json())
  app.use(cookieParser())
  // global error Handler
  app.use(globalErrorHandler)

  // application routes
  app.use('/api/v1', ApplicationRoute)

  // Not Found Route
  app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(300).json({
      success: false,
      message: 'Not Found API',
      errorMessages: [{ path: req.originalUrl, message: 'API Not Found' }],
    })
    next()
  })

  return app
}
