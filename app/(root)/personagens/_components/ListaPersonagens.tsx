import { PersonagensIcons } from "@/constants"
import { getLoggedInUser, getUserInfo } from "@/lib/actions/user.actions"
import { getPersonagensUser } from "@/lib/actions/char.actions"
import TopbarPersonagens from "./TopbarPersonagens"
import dynamic from "next/dynamic"

const CardCharComponent = dynamic(() => import("./CardChar"))

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
      totalAtk: number
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
        <div className="flex flex-row flex-wrap w-full gap-4 p-6 justify-center">
          {listaImgs.map((img, index) => (
            <CardCharComponent
              key={index}
              img={img}
              personagem={listaAdicionados[index]}
            />
          ))}
        </div>
      )}
    </>
  )
}

export default ListaPersonagens
