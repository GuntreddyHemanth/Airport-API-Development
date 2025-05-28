import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import "reflect-metadata"

export const metadata: Metadata = {
  title: "Airport Information API",
  description: "API for retrieving airport information by IATA code",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
