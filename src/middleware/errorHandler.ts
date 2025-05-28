import type { Request, Response, NextFunction } from "express"

export function errorHandler(error: Error, req: Request, res: Response, next: NextFunction): void {
  console.error("Error:", error.message)
  console.error("Stack:", error.stack)

  // Default error response
  let statusCode = 500
  let message = "Internal server error"

  // Handle specific error types
  if (error.name === "ValidationError") {
    statusCode = 400
    message = error.message
  } else if (error.name === "NotFoundError") {
    statusCode = 404
    message = error.message
  }

  res.status(statusCode).json({
    error: message,
    ...(process.env.NODE_ENV === "development" && { stack: error.stack }),
  })
}
