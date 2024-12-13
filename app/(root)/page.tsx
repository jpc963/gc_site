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

      {highChar ? (
        <div>
          <h2>Seu melhor personagem é:</h2>
          <p>Nome: {highChar.nome}</p>
          <p>Level: {highChar.level}</p>
          <p>GP: {highChar.gp}</p>
          <p>Total de Ataque: {highChar.totalAtk}</p>
        </div>
      ) : (
        <p>Você não possui personagens cadastrados</p>
      )}
    </section>
  )
}
