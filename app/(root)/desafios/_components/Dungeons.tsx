"use client"

import dynamic from "next/dynamic"
import { useState } from "react"

import { DungeonNames } from "@/constants"
import TopbarDungeons from "./TopbarDungeons"

const CharDungeonComponent = dynamic(() => import("./CharDungeon"))

const Dungeons = ({ userId }: { userId: string }) => {
  const dungeons = DungeonNames
  const [name, setName] = useState<string>("Fornalha infernal")

  return (
    <div className="contain-inline-size">
      <TopbarDungeons
        dungeons={dungeons}
        name={name}
        setName={setName}
      />

      {name && (
        <div className="flex flex-row flex-wrap w-full gap-4 p-6 justify-center">
          <CharDungeonComponent
            nome={name}
            userId={userId}
          />
        </div>
      )}
    </div>
  )
}

export default Dungeons
