import { redirect } from "next/navigation"

import { getLoggedInUser } from "@/lib/actions/user.actions"

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const loggedIn = await getLoggedInUser()
  if (loggedIn) redirect("/dashboard")

  return (
    <main className="flex min-h-screen w-full justify-between items-center">
      {children}
    </main>
  )
}
