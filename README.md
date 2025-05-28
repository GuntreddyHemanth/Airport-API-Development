# Airport Information API

A Node.js REST API for retrieving airport information based on IATA codes using TypeORM and SQLite.

## Features

- Get airport information by IATA code
- Relational database with Airport, City, and Country entities
- Input validation and error handling
- CORS support
- Security headers with Helmet
- Request logging with Morgan
- TypeScript support

## Installation

1. Clone the repository
2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Seed the database:
   \`\`\`bash
   npm run seed
   \`\`\`

4. Start the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

## API Endpoints

### GET /api/airport/:iata_code

Retrieves detailed information about an airport using the IATA code.

**Example:**
\`\`\`
GET /api/airport/AGR
\`\`\`

**Response:**
\`\`\`json
{
  "airport": {
    "id": 1,
    "icao_code": "VIAG",
    "iata_code": "AGR",
    "name": "Agra Airport / Agra Air Force Station",
    "type": "medium_airport",
    "latitude_deg": 27.157683,
    "longitude_deg": 77.960942,
    "elevation_ft": 551,
    "address": {
      "city": {
        "id": 1,
        "name": "Agra",
        "country_id": 1,
        "is_active": true,
        "lat": 27.18,
        "long": 78.02
      },
      "country": {
        "id": 1,
        "name": "India",
        "country_code_two": "IN",
        "country_code_three": "IND",
        "mobile_code": 91,
        "continent_id": 1
      }
    }
  }
}
\`\`\`

### POST /api/seed

Seeds the database with sample data.

### GET /health

Health check endpoint.

## Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build the TypeScript code
- `npm start` - Start production server
- `npm run seed` - Seed database with sample data

## Docker

Build and run with Docker:

\`\`\`bash
docker build -t airport-api .
docker run -p 3000:3000 airport-api
\`\`\`

Or use Docker Compose:

\`\`\`bash
docker-compose up
\`\`\`

## Environment Variables

- `PORT` - Server port (default: 3000)
- `NODE_ENV` - Environment (development/production)

## Sample Data

The API comes with sample data for:
- Agra Airport (AGR)
- JFK Airport (JFK)
- London Heathrow (LHR)
