import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const loggedIn = cookies().get("appwrite-session") || null

  if (loggedIn) redirect("/")

  return (
    <main className="flex min-h-screen w-full justify-between items-center">
      {children}
    </main>
  )
}
