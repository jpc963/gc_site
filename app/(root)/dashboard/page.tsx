import { cookies } from "next/headers"

import { getHighChar } from "@/lib/actions/char.actions"

export default async function Dashboard() {
  const userId = cookies().get("user-session")?.value || ""

  const highChar = await getHighChar(userId)

  return (
    <section>
      <h1>Dashboard</h1>

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

// const loggedIn = await getLoggedInUser()
// const { userId } = await getUserInfo(loggedIn)

// const bestChar: {
//   nome: string
//   level: number
//   gp: number
//   totalAtk: number
// } = await getHigherChar({ userId })
