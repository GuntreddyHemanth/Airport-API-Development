import "reflect-metadata"
import { AppDataSource } from "../config/database"
import { seedDatabase } from "../services/seedService"

async function runSeed() {
  try {
    await AppDataSource.initialize()
    console.log("Database connection established")

    await seedDatabase()
    console.log("Seeding completed successfully")

    await AppDataSource.destroy()
    process.exit(0)
  } catch (error) {
    console.error("Error during seeding:", error)
    process.exit(1)
  }
}

runSeed()
