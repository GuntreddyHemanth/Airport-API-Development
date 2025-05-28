import { AppDataSource } from "../config/database"
import { Airport } from "../entities/Airport"
import { City } from "../entities/City"
import { Country } from "../entities/Country"

/**
 * Seeds the database with sample data
 * @param silent If true, suppresses console logs
 */
export async function seedDatabase(silent = false): Promise<void> {
  const countryRepository = AppDataSource.getRepository(Country)
  const cityRepository = AppDataSource.getRepository(City)
  const airportRepository = AppDataSource.getRepository(Airport)

  // Check if data already exists
  const airportCount = await airportRepository.count()
  if (airportCount > 0) {
    if (!silent) console.log("Database already seeded")
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

  const uk = countryRepository.create({
    name: "United Kingdom",
    country_code_two: "GB",
    country_code_three: "GBR",
    mobile_code: 44,
    continent_id: 3,
  })
  await countryRepository.save(uk)

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

  const london = cityRepository.create({
    name: "London",
    country_id: uk.id,
    is_active: true,
    lat: 51.5074,
    long: -0.1278,
  })
  await cityRepository.save(london)

  // Create sample airports
  const airports = [
    {
      icao_code: "VIAG",
      iata_code: "AGR",
      name: "Agra Airport / Agra Air Force Station",
      type: "medium_airport",
      latitude_deg: 27.157683,
      longitude_deg: 77.960942,
      elevation_ft: 551,
      city_id: agra.id,
    },
    {
      icao_code: "KJFK",
      iata_code: "JFK",
      name: "John F. Kennedy International Airport",
      type: "large_airport",
      latitude_deg: 40.639751,
      longitude_deg: -73.778925,
      elevation_ft: 13,
      city_id: newYork.id,
    },
    {
      icao_code: "EGLL",
      iata_code: "LHR",
      name: "London Heathrow Airport",
      type: "large_airport",
      latitude_deg: 51.4706,
      longitude_deg: -0.461941,
      elevation_ft: 83,
      city_id: london.id,
    },
  ]

  for (const airportData of airports) {
    const airport = airportRepository.create(airportData)
    await airportRepository.save(airport)
  }

  if (!silent) console.log("Database seeded successfully with sample data")
}
