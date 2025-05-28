import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow rounded-lg p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Airport Information API</h1>

          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">API Endpoints</h2>
              <div className="mt-3 p-4 bg-gray-100 rounded-md">
                <p className="font-mono text-sm">GET /api/airport/:iata_code</p>
                <p className="mt-2 text-gray-600 text-sm">
                  Retrieves detailed information about an airport using the IATA code.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800">Example Usage</h2>
              <div className="mt-3 space-y-3">
                <div className="p-4 bg-gray-100 rounded-md">
                  <Link href="/api/airport/AGR" className="font-mono text-sm text-blue-600 hover:underline">
                    /api/airport/AGR
                  </Link>
                  <p className="mt-2 text-gray-600 text-sm">Retrieves information about Agra Airport</p>
                </div>
                <div className="p-4 bg-gray-100 rounded-md">
                  <Link href="/api/airport/JFK" className="font-mono text-sm text-blue-600 hover:underline">
                    /api/airport/JFK
                  </Link>
                  <p className="mt-2 text-gray-600 text-sm">Retrieves information about JFK Airport</p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800">Database Setup</h2>
              <div className="mt-3 p-4 bg-gray-100 rounded-md">
                <Link href="/api/seed" className="font-mono text-sm text-blue-600 hover:underline">
                  /api/seed
                </Link>
                <p className="mt-2 text-gray-600 text-sm">
                  Seeds the database with sample data (Agra and JFK airports)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
