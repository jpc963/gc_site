import { redirect } from "next/navigation"

import Sidebar from "@/components/Sidebar"
import { getLoggedInUser } from "@/lib/actions/user.actions"

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const loggedIn = await getLoggedInUser()
  if (!loggedIn) redirect("/login")

  return (
    <main className="w-full flex">
      <Sidebar />

      <div className="flex flex-col w-full">{children}</div>
    </main>
  )
}
