"use client"

import dynamic from "next/dynamic"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { DungeonNames } from "@/constants"
import { cn } from "@/lib/utils"

const CharDungeonComponent = dynamic(() => import("./CharDungeon"))

const Dungeons = ({ userId }: { userId: string }) => {
  const dungeons = DungeonNames
  const [name, setName] = useState<string>("")

  return (
    <>
      <div className="flex flex-row gap-2 w-full mt-2">
        {dungeons.map((dungeon) => (
          <Button
            className={cn("rounded-md p-6 shadow-md text-base", {
              "bg-emerald-600 hover:bg-emerald-600":
                name === dungeon.replaceAll("-", " "),
            })}
            key={dungeon}
            onClick={() => setName(dungeon.replaceAll("-", " "))}
          >
            {dungeon.replaceAll("-", " ")}
          </Button>
        ))}
      </div>

      {name && (
        <CharDungeonComponent
          nome={name}
          userId={userId}
        />
      )}
    </>
  )
}

export default Dungeons
