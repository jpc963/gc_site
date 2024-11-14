import { cookies } from "next/headers"
import ListaPersonagens from "./_components/ListaPersonagens"
import { getPersonagensUser } from "@/lib/actions/char.actions"

const Personagens = async () => {
  const userId = cookies().get("user-session")?.value || ""

  const documents: PersonagemUser = await getPersonagensUser(userId)

  return (
    <section>
      {documents ? (
        <ListaPersonagens
          userId={userId}
          documents={documents}
        />
      ) : (
        <h1>Carregando...</h1>
      )}
    </section>
  )
}
export default Personagens
