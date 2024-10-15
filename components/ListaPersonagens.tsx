import { getLoggedInUser, getUserInfo } from "@/lib/actions/user.actions"
import ButtonAddPersonagem from "./ButtonAddPersonagem"
import { PersonagensNomes } from "@/constants"

const ListaPersonagens = async () => {
  const loggedIn = await getLoggedInUser()
  const personagensDisponiveis = PersonagensNomes
  const { userId, personagens } = await getUserInfo(loggedIn)

  return (
    <section className="flex items-center justify-center h-screen">
      {personagens?.length > 0 ? (
        <div>Lista de personagens:</div>
      ) : (
        <div className="flex flex-col gap-2">
          <p>Você ainda não possui personagens</p>

          <ButtonAddPersonagem
            label="Adicionar personagem"
            personagensDisponiveis={personagensDisponiveis}
            personagensAdicionados={personagens}
            userId={userId}
          />
        </div>
      )}
    </section>
  )
}

export default ListaPersonagens
