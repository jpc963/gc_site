import {
  getLoggedInUser,
  getPersonagens,
  getUserInfo,
} from "@/lib/actions/user.actions"
import ButtonAddPersonagem from "./ButtonAddPersonagem"

const ListaPersonagens = async () => {
  const loggedIn = await getLoggedInUser()
  const personagensDisponiveis = await getPersonagens()
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
            user={userId}
          />
        </div>
      )}
    </section>
  )
}

export default ListaPersonagens
