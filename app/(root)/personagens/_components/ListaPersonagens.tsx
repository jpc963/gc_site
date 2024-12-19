import dynamic from "next/dynamic"

import { PersonagensIcons } from "@/constants"

import TopbarPersonagens from "./TopbarPersonagens"

const CardCharComponent = dynamic(() => import("./CardChar"))

const ListaPersonagens = async ({
  userId,
  documents,
}: {
  userId: string
  documents: PersonagemUser
}) => {
  const listaAdicionados =
    documents.personagens?.length > 0
      ? documents.personagens
          .map((p) => p)
          .sort((a, b) => a.nome.localeCompare(b.nome))
      : []

  const listaImgs = PersonagensIcons.filter((img) =>
    listaAdicionados.find((p) => p.nome === img.nome)
  ).sort((a, b) => a.nome.localeCompare(b.nome))

  return (
    <>
      <TopbarPersonagens
        personagensAdicionados={listaAdicionados}
        userId={userId}
      />

      {documents.personagens?.length > 0 && (
        <div className="flex flex-row flex-wrap w-full gap-4 p-6 justify-center">
          {listaImgs.map((img, index) => (
            <CardCharComponent
              key={index}
              img={img}
              personagem={listaAdicionados[index]}
              userId={userId}
              listaPersonagens={listaAdicionados}
            />
          ))}
        </div>
      )}
    </>
  )
}

export default ListaPersonagens
