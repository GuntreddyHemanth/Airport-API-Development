import { type NextRequest, NextResponse } from "next/server"
import { initializeDataSource } from "@/lib/data-source"
import { Airport } from "@/lib/entities/Airport"
import { validateIataCode } from "@/lib/validators"

export async function GET(request: NextRequest, { params }: { params: Promise<{ iata_code: string }> }) {
  try {
    // Initialize database connection
    const dataSource = await initializeDataSource()

    const { iata_code } = await params
    const iataCode = iata_code.toUpperCase()

    // Validate IATA code format
    if (!validateIataCode(iataCode)) {
      return NextResponse.json({ error: "Invalid IATA code format. Must be 3 alphabetic characters." }, { status: 400 })
    }

    // Query airport with relations
    const airportRepository = dataSource.getRepository(Airport)
    const airport = await airportRepository.findOne({
      where: { iata_code: iataCode },
      relations: {
        city: {
          country: true,
        },
      },
    })

    if (!airport) {
      return NextResponse.json({ error: `Airport with IATA code ${iataCode} not found` }, { status: 404 })
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

    return NextResponse.json(response)
  } catch (error) {
    console.error("Error fetching airport data:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
