"use client"

import Dungeons from "@/app/(root)/desafios/_components/Dungeons"
import Topbar from "@/app/(root)/desafios/_components/Topbar"
import { Separator } from "@/components/ui/separator"
import { PersonagensIcons } from "@/constants"
import Image from "next/image"
import { useState } from "react"

type DungeonPersonagem = {
  nome: string
  dungeon: string
}

const Desafios = () => {
  const [personagemDungeon, setPersonagemDungeon] = useState<
    DungeonPersonagem[]
  >([])

  return (
    <section>
      <Topbar
        list={personagemDungeon}
        set={setPersonagemDungeon}
      />

      <div className="flex flex-row flex-wrap justify-center p-8 gap-4">
        {PersonagensIcons.map((personagem) => {
          return (
            <div
              className="flex flex-col items-center px-8 py-2 text-center shadow-lg rounded-sm border border-[#30336b] bg-[#130f40]"
              key={personagem.nome}
            >
              <Image
                src={personagem.imgUrl}
                width={141}
                height={94}
                quality={100}
                alt={personagem.alt}
                loading="lazy"
                className="mt-2"
              />

              <Separator className="bg-[#30336b] my-4" />

              <Dungeons
                personagem={personagem.nome}
                pList={personagemDungeon}
                setPList={setPersonagemDungeon}
              />
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default Desafios
