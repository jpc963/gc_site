import { getHigherChar } from "@/lib/actions/char.actions"
import { getLoggedInUser, getUserInfo } from "@/lib/actions/user.actions"

export default async function Home() {
  const loggedIn = await getLoggedInUser()
  const { userId } = await getUserInfo(loggedIn)

  const bestChar: {
    nome: string
    level: number
    gp: number
    totalAtk: number
  } = await getHigherChar({ userId })

  return (
    <section>
      <h1>Home</h1>
    </section>
  )
}
