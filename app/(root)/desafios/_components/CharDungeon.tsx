import { CircleCheck } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { PersonagensIcons } from "@/constants"
import { getDesafiosConcluidos } from "@/lib/actions/desafios.actions"
import { cn } from "@/lib/utils"

import SaveButton from "./SaveButton"

const CharDungeon = ({ nome, userId }: { nome: string; userId: string }) => {
  const [doc, setDoc] = useState<DocDungeonsType>([])
  const [dungeonFeita, setDungeonFeita] = useState<DungeonFeita>({
    nome: nome,
    personagens: [],
  })

  const handleClick = (char: string) => {
    if (!dungeonFeita.personagens.includes(char)) {
      setDungeonFeita({
        ...dungeonFeita,
        personagens: [...dungeonFeita.personagens, char],
      })
    } else {
      setDungeonFeita({
        ...dungeonFeita,
        personagens: dungeonFeita.personagens.filter(
          (personagem) => personagem !== char
        ),
      })
    }
  }

  const handleSelectAll = () => {
    if (dungeonFeita.personagens.length === PersonagensIcons.length) {
      setDungeonFeita({
        ...dungeonFeita,
        personagens: [],
      })
    } else {
      setDungeonFeita({
        ...dungeonFeita,
        personagens: PersonagensIcons.map((personagem) => personagem.nome),
      })
    }
  }

  useEffect(() => {
    const getDungeons = async () => {
      const documents = (await getDesafiosConcluidos(userId)) as DocDungeonsType

      setDungeonFeita({
        nome: nome,
        personagens:
          documents.find((item) => item.nome === nome)?.personagens ?? [],
      })

      setDoc(documents)
    }

    getDungeons()
  }, [nome, userId])

  return (
    <>
      {PersonagensIcons.map((personagem) => (
        <div
          className="w-48 h-68 pb-4 bg-[#1c1c29] rounded-md shadow-md group hover:scale-105 transition-transform duration-150"
          key={personagem.nome}
        >
          <div className="w-3/5 h-fit bg-[#7c3aed] m-auto rounded-b-md">
            <span className="font-semibold text-center block">
              {personagem.nome}
            </span>
          </div>

          <div className="w-20 h-20 bg-[#1c1c34] rounded-md overflow-hidden m-auto mt-6 relative shadow-md">
            <Image
              src={personagem.imgUrl}
              alt={personagem.alt}
              fill
              quality={100}
              sizes="100%"
              className="object-cover"
            />
          </div>

          <Button
            className={cn(
              "opacity-0 group-hover:opacity-100 transition-opacity duration-300 block m-auto my-6 rounded-sm border-none bg-[#7c3aed] hover:bg-[#534bf3] font-semibold",
              {
                "bg-emerald-400 hover:bg-emerald-600 opacity-100":
                  dungeonFeita.personagens.includes(personagem.nome),
              }
            )}
            onClick={() => handleClick(personagem.nome)}
          >
            {dungeonFeita.personagens.includes(personagem.nome) ? (
              <CircleCheck size={20} />
            ) : (
              "Feito"
            )}
          </Button>
        </div>
      ))}

      <SaveButton
        len={dungeonFeita.personagens.length}
        func={handleSelectAll}
        userId={userId}
        infos={dungeonFeita}
        doc={doc.find((item) => item.nome === nome) ?? null}
      />
    </>
  )
}
export default CharDungeon
