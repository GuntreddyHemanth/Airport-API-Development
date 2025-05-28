import { initializeDataSource } from "./data-source"
import { Airport } from "./entities/Airport"
import { City } from "./entities/City"
import { Country } from "./entities/Country"

/**
 * Seeds the database with sample data
 */
export async function seedDatabase() {
  try {
    const dataSource = await initializeDataSource()

    const countryRepository = dataSource.getRepository(Country)
    const cityRepository = dataSource.getRepository(City)
    const airportRepository = dataSource.getRepository(Airport)

    // Check if data already exists
    const airportCount = await airportRepository.count()
    if (airportCount > 0) {
      console.log("Database already seeded")
      return
    }

    // Create sample countries
    const india = countryRepository.create({
      name: "India",
      country_code_two: "IN",
      country_code_three: "IND",
      mobile_code: 91,
      continent_id: 1,
    })
    await countryRepository.save(india)

    const usa = countryRepository.create({
      name: "United States",
      country_code_two: "US",
      country_code_three: "USA",
      mobile_code: 1,
      continent_id: 2,
    })
    await countryRepository.save(usa)

    // Create sample cities
    const agra = cityRepository.create({
      name: "Agra",
      country_id: india.id,
      is_active: true,
      lat: 27.18,
      long: 78.02,
    })
    await cityRepository.save(agra)

    const newYork = cityRepository.create({
      name: "New York",
      country_id: usa.id,
      is_active: true,
      lat: 40.7128,
      long: -74.006,
    })
    await cityRepository.save(newYork)

    // Create sample airports
    const agraAirport = airportRepository.create({
      icao_code: "VIAG",
      iata_code: "AGR",
      name: "Agra Airport / Agra Air Force Station",
      type: "medium_airport",
      latitude_deg: 27.157683,
      longitude_deg: 77.960942,
      elevation_ft: 551,
      city_id: agra.id,
    })
    await airportRepository.save(agraAirport)

    const jfkAirport = airportRepository.create({
      icao_code: "KJFK",
      iata_code: "JFK",
      name: "John F. Kennedy International Airport",
      type: "large_airport",
      latitude_deg: 40.639751,
      longitude_deg: -73.778925,
      elevation_ft: 13,
      city_id: newYork.id,
    })
    await airportRepository.save(jfkAirport)

    console.log("Database seeded successfully")
  } catch (error) {
    console.error("Error seeding database:", error)
  }
}
