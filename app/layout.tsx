import type { Metadata } from "next"
import "./globals.css"

import { Montserrat } from "next/font/google"

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
})

export const metadata: Metadata = {
  title: "GC Tracker",
  description: "Acompanhe seu progresso no Grand Chase Classic",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${montserrat.className} antialiased w-screen h-screen overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  )
}
