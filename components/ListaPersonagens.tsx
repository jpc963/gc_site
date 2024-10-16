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

      <div className="flex flex-col items-center justify-center gap-4 h-full">
        {documents?.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 2xl:grid-cols-6 gap-4">
            {listaImgs.map((img, index) => (
              <div
                className="flex flex-col"
                key={img.nome}
              >
                <div className="flex flex-col gap-3 px-4 text-center font-semibold">
                  <PersonagemPopover
                    img={img}
                    personagem={listaAdicionados[index]}
                  />

                  <p>{img.nome}</p>
                </div>
              </div>
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
      </div>
    </>
  )
}

export default ListaPersonagens
