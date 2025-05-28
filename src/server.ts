import "reflect-metadata"
import express from "express"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import { AppDataSource } from "./config/database"
import airportRoutes from "./routes/airport"
import { errorHandler } from "./middleware/errorHandler"
import { seedDatabase } from "./services/seedService"

const app = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use(helmet())
app.use(cors())
app.use(morgan("combined"))
app.use(express.json())

// Initialize database connection
let isInitialized = false
async function initializeDatabase() {
  if (!isInitialized) {
    try {
      await AppDataSource.initialize()
      console.log("Database connection established")

      // Seed the database on startup in production
      // This ensures data is available in the serverless environment
      if (process.env.NODE_ENV === "production") {
        await seedDatabase(true) // true = silent mode
      }

      isInitialized = true
    } catch (error) {
      console.error("Database initialization error:", error)
    }
  }
  return isInitialized
}

// Database initialization middleware
app.use(async (req, res, next) => {
  await initializeDatabase()
  next()
})

// Routes
app.use("/api", airportRoutes)

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Airport API is running",
    environment: process.env.NODE_ENV || "development",
    timestamp: new Date().toISOString(),
  })
})

// Root endpoint with API documentation
app.get("/", (req, res) => {
  res.json({
    message: "Airport Information API",
    version: "1.0.0",
    endpoints: {
      "GET /api/airport/:iata_code": "Get airport information by IATA code",
      "POST /api/seed": "Seed database with sample data",
      "GET /health": "Health check endpoint",
    },
    examples: {
      "Agra Airport": "/api/airport/AGR",
      "JFK Airport": "/api/airport/JFK",
      "London Heathrow": "/api/airport/LHR",
    },
  })
})

// Error handling middleware
app.use(errorHandler)

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({ error: "Endpoint not found" })
})

// Start server if not in serverless environment
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
    console.log(`API Documentation: http://localhost:${PORT}`)
    console.log(`Health Check: http://localhost:${PORT}/health`)
  })
}

// Export for serverless
export default app
