"use client"

import Dungeons from "@/components/Dungeons"
import Topbar from "@/components/Topbar"
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

      <div className="flex flex-row flex-wrap justify-center p-8 gap-x-8 gap-y-4">
        {PersonagensIcons.map((personagem) => {
          return (
            <div
              className="flex flex-col items-center px-8 py-2 text-center shadow-gray-900 border border-[#334258] shadow-sm"
              key={personagem.nome}
            >
              <Image
                src={personagem.imgUrl}
                width={140}
                height={140}
                alt={personagem.alt}
              />

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
