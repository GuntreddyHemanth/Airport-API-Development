import { Router } from "express"
import { AppDataSource } from "../config/database"
import { Airport } from "../entities/Airport"
import { validateIataCode } from "../utils/validators"
import { seedDatabase } from "../services/seedService"

const router = Router()

// GET /api/airport/:iata_code
router.get("/airport/:iata_code", async (req, res, next) => {
  try {
    const iataCode = req.params.iata_code.toUpperCase()

    // Validate IATA code format
    if (!validateIataCode(iataCode)) {
      return res.status(400).json({
        error: "Invalid IATA code format. Must be 3 alphabetic characters.",
      })
    }

    // Query airport with relations
    const airportRepository = AppDataSource.getRepository(Airport)
    const airport = await airportRepository.findOne({
      where: { iata_code: iataCode },
      relations: {
        city: {
          country: true,
        },
      },
    })

    if (!airport) {
      return res.status(404).json({
        error: `Airport with IATA code ${iataCode} not found`,
      })
    }

    // Format response according to required structure
    const response = {
      airport: {
        id: airport.id,
        icao_code: airport.icao_code,
        iata_code: airport.iata_code,
        name: airport.name,
        type: airport.type,
        latitude_deg: airport.latitude_deg,
        longitude_deg: airport.longitude_deg,
        elevation_ft: airport.elevation_ft,
        address: {
          city: airport.city
            ? {
                id: airport.city.id,
                name: airport.city.name,
                country_id: airport.city.country_id,
                is_active: airport.city.is_active,
                lat: airport.city.lat,
                long: airport.city.long,
              }
            : null,
          country: airport.city?.country
            ? {
                id: airport.city.country.id,
                name: airport.city.country.name,
                country_code_two: airport.city.country.country_code_two,
                country_code_three: airport.city.country.country_code_three,
                mobile_code: airport.city.country.mobile_code,
                continent_id: airport.city.country.continent_id,
              }
            : null,
        },
      },
    }

    res.json(response)
  } catch (error) {
    next(error)
  }
})

// POST /api/seed
router.post("/seed", async (req, res, next) => {
  try {
    await seedDatabase()
    res.json({ message: "Database seeded successfully" })
  } catch (error) {
    next(error)
  }
})

export default router
