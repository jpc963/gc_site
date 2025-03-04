import { redirect } from "next/navigation"

import Sidebar from "@/components/Sidebar"
import { getHighChar } from "@/lib/actions/char.actions"
import { getLoggedInUser } from "@/lib/actions/user.actions"

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const loggedIn = await getLoggedInUser()
  if (!loggedIn) redirect("/login")

  const highChar = await getHighChar(loggedIn.userId)

  return (
    <main className="w-screen flex">
      <Sidebar
        username={loggedIn.username}
        cLevel={loggedIn.cLevel}
        highCharName={highChar?.nome}
      />

      <div className="w-full">{children}</div>
    </main>
  )
}
