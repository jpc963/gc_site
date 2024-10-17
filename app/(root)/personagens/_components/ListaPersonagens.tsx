import { PersonagensIcons } from "@/constants"
import ButtonAddPersonagem from "./ButtonAddPersonagem"
import {
  getLoggedInUser,
  getPersonagensUser,
  getUserInfo,
} from "@/lib/actions/user.actions"
import TopbarPersonagens from "./TopbarPersonagens"
import PersonagemPopover from "./PersonagemPopover"

const ListaPersonagens = async () => {
  const loggedIn = await getLoggedInUser()
  const { userId } = await getUserInfo(loggedIn)
  const {
    documents,
  }: {
    documents: {
      userId: string
      $id: string
      nome: string
      level: number
      gp: number
    }[]
  } = await getPersonagensUser(loggedIn)

  const listaAdicionados = await documents
    .map((p) => p)
    .sort((a, b) => a.nome.localeCompare(b.nome))

  const listaImgs = await PersonagensIcons.filter((img) =>
    listaAdicionados.find((p) => p.nome === img.nome)
  ).sort((a, b) => a.nome.localeCompare(b.nome))

  return (
    <>
      <TopbarPersonagens
        personagensAdicionados={listaAdicionados}
        userId={userId}
      />

      {documents?.length > 0 && (
        <div className="grid grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 h-full p-2 gap-2">
          {listaImgs.map((img, index) => (
            <PersonagemPopover
              key={index}
              img={img}
              personagem={listaAdicionados[index]}
            />
          ))}
        </div>
      )}

      {documents?.length === 0 && (
        <>
          <ButtonAddPersonagem
            label="Adicionar personagem"
            personagensAdicionados={listaAdicionados}
            userId={userId}
          />
        </>
      )}
    </>
  )
}

export default ListaPersonagens
