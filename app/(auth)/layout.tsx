import { getLoggedInUser } from "@/lib/actions/user.actions"
import { redirect } from "next/navigation"

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const loggedIn = await getLoggedInUser()
  if (loggedIn) redirect("/")

  return (
    <main className="flex min-h-screen w-full justify-between items-center">
      {children}
    </main>
  )
}
