"use client"

import { Button } from "@/components/ui/button"
import { DungeonNames } from "@/constants"
import CharDungeon from "./CharDungeon"
import { useState } from "react"
import { cn } from "@/lib/utils"

const Dungeons = ({ userId }: { userId: string }) => {
  const dungeons = DungeonNames
  const [name, setName] = useState<string>("")

  return (
    <>
      <div className="flex flex-row gap-2 w-full mt-2 justify-center">
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
        <CharDungeon
          nome={name}
          userId={userId}
        />
      )}
    </>
  )
}

export default Dungeons
