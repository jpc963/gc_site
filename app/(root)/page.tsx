import { getHighChar } from "@/lib/actions/char.actions"
import { cookies } from "next/headers"

export default async function Home() {
  const userId = (await cookies().get("user-session")?.value) || ""

  const highChar = await getHighChar(userId)

  // const loggedIn = await getLoggedInUser()
  // const { userId } = await getUserInfo(loggedIn)

  // const bestChar: {
  //   nome: string
  //   level: number
  //   gp: number
  //   totalAtk: number
  // } = await getHigherChar({ userId })

  return (
    <section>
      <h1>Home</h1>
    </section>
  )
}
