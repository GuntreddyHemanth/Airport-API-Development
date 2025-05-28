import { DataSource } from "typeorm"
import { Airport } from "../entities/Airport"
import { City } from "../entities/City"
import { Country } from "../entities/Country"
import path from "path"

// For Vercel deployment, we need to use in-memory SQLite
const isProduction = process.env.NODE_ENV === "production"

export const AppDataSource = new DataSource({
  type: "better-sqlite3",
  database: isProduction ? ":memory:" : path.join(process.cwd(), "airport-database.sqlite"),
  synchronize: true,
  logging: process.env.NODE_ENV === "development",
  entities: [Airport, City, Country],
  migrations: [],
  subscribers: [],
})
