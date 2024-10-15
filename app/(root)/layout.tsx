import Sidebar from "@/components/Sidebar"
import { getLoggedInUser } from "@/lib/actions/user.actions"
import { redirect } from "next/navigation"

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const loggedIn = await getLoggedInUser()
  if (!loggedIn) redirect("/login")

  return (
    <main className="w-full h-full flex">
      <Sidebar />

      <div className="flex flex-col w-full h-full">{children}</div>
    </main>
  )
}
