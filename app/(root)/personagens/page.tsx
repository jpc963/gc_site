"use client"

import Topbar from "@/components/Topbar"
import { DungeonsIcons, PersonagensIcons } from "@/constants"
import Image from "next/image"
import { useState } from "react"

const Personagens = () => {
  const [personagemDungeon, setPersonagemDungeon] = useState([
    {
      nome: "",
      dungeon: "",
    },
  ])

  const dungeonFeita = (personagemNome: string, dungeonNome: string) => {
    if (
      personagemDungeon.find(
        (value) =>
          value.nome === personagemNome && value.dungeon === dungeonNome
      )
    ) {
      setPersonagemDungeon((prevState) =>
        prevState.filter(
          (value) =>
            value.nome !== personagemNome || value.dungeon !== dungeonNome
        )
      )
    } else {
      setPersonagemDungeon((prevState) => [
        ...prevState,
        { nome: personagemNome, dungeon: dungeonNome },
      ])
    }
  }

  const resetList = () => {
    setPersonagemDungeon([])
  }

  return (
    <section>
      <Topbar
        list={personagemDungeon}
        reset={resetList}
      />

      <div className="flex flex-row gap-x-8 gap-y-4 flex-wrap p-8 justify-center">
        {PersonagensIcons.map((personagem) => {
          return (
            <div
              className="flex flex-col text-center items-center border-gray-600 shadow-sm shadow-gray-900 px-8 py-2"
              key={personagem.nome}
            >
              <Image
                src={personagem.imgUrl}
                width={140}
                height={140}
                alt={personagem.alt}
              />

              <div className="grid grid-flow-row grid-cols-3 gap-4 mt-2 justify-center">
                {DungeonsIcons.map((dungeon) => {
                  return (
                    <div
                      className="text-center h-8 w-10"
                      key={dungeon.nome}
                    >
                      <Image
                        src={
                          personagemDungeon.find(
                            (value) =>
                              value.nome === personagem.nome &&
                              value.dungeon === dungeon.nome
                          )
                            ? "/icons/check.svg"
                            : dungeon.imgUrl
                        }
                        width={28}
                        height={28}
                        alt={dungeon.alt}
                        onClick={() =>
                          dungeonFeita(personagem.nome, dungeon.nome)
                        }
                        className="cursor-pointer w-fit h-fit"
                      />
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default Personagens
