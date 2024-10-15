import { PersonagensIcons, PersonagensNomes } from "@/constants"
import ButtonAddPersonagem from "./ButtonAddPersonagem"
import {
  getLoggedInUser,
  getPersonagensUser,
  getUserInfo,
} from "@/lib/actions/user.actions"
import Image from "next/image"

const ListaPersonagens = async () => {
  const loggedIn = await getLoggedInUser()
  const { userId } = await getUserInfo(loggedIn)
  const {
    documents,
  }: {
    documents: {
      nome: string
      level: number
      gp: number
      userId: string
    }[]
  } = await getPersonagensUser(loggedIn)

  const listaAdicionados = await documents.map((p: { nome: string }) => p.nome)
  const listaImgs = await PersonagensIcons.filter((img) =>
    listaAdicionados.includes(img.nome)
  )

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      {documents?.length > 0 && (
        <div className="grid grid-cols-6 gap-4">
          {listaImgs.map((img, index) => (
            <div
              key={img.nome + index}
              className="p-4 gap-2 border border-[#232222]"
            >
              <Image
                src={img.imgUrl}
                width={100}
                height={100}
                alt={`Imagem do personagem ${img.nome}`}
              />
              <p>Nome: {img.nome}</p>
              <p>Level: {documents[index].level}</p>
              <p>GP: {documents[index].gp}</p>
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
