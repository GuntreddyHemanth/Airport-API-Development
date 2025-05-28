/**
 * Validates IATA code format (3 alphabetic characters)
 */
export function validateIataCode(iataCode: string): boolean {
  const iataRegex = /^[A-Z]{3}$/
  return iataRegex.test(iataCode)
}
