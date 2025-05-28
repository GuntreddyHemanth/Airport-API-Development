import { DataSource } from "typeorm"
import { Airport } from "./entities/Airport"
import { City } from "./entities/City"
import { Country } from "./entities/Country"

// Define the data source with better-sqlite3 driver
export const AppDataSource = new DataSource({
  type: "better-sqlite3",
  database: ":memory:", // Use in-memory database for serverless deployment
  synchronize: true,
  logging: false, // Disable logging in production
  entities: [Airport, City, Country],
  migrations: [],
  subscribers: [],
})

// Initialize the data source
let isInitialized = false

export async function initializeDataSource() {
  if (!isInitialized) {
    await AppDataSource.initialize()
    isInitialized = true
  }
  return AppDataSource
}
