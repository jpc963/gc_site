import type { Metadata } from "next"
import { Kanit } from "next/font/google"
import "./globals.css"

const kanit = Kanit({ subsets: ["latin"], weight: ["300", "400", "600"] })

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
        className={`${kanit.className} antialiased w-full h-screen flex justify-center items-center`}
      >
        {children}
      </body>
    </html>
  )
}
