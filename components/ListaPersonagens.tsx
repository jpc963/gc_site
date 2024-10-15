import { PersonagensNomes } from "@/constants"
import ButtonAddPersonagem from "./ButtonAddPersonagem"
import {
  getLoggedInUser,
  getPersonagensUser,
  getUserInfo,
} from "@/lib/actions/user.actions"

const ListaPersonagens = async () => {
  const loggedIn = await getLoggedInUser()
  const { userId } = await getUserInfo(loggedIn)

  const { documents } = await getPersonagensUser(loggedIn)
  const listaAdicionados = documents.map((p: { nome: string }) => p.nome)

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      {documents?.length > 0 && (
        <div className="flex flex-row gap-4">
          {documents.map((p: { nome: string; level: number; gp: number }) => (
            <div
              key={p.nome}
              className="p-4 gap-2 border border-[#232222]"
            >
              <p>Nome: {p.nome}</p>
              <p>Level: {p.level}</p>
              <p>GP: {p.gp}</p>
            </div>
          ))}
        </div>
      )}

      {documents?.length < PersonagensNomes.length && (
        <>
          <ButtonAddPersonagem
            label="Adicionar personagem"
            personagensAdicionados={listaAdicionados}
            userId={userId}
          />
        </>
      )}
    </div>
  )
}

export default ListaPersonagens
