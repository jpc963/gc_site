import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

declare type TopbarDungeonsProps = {
  dungeons: string[]
  name: string
  setName: (value: string) => void
}

const TopbarDungeons = ({ dungeons, name, setName }: TopbarDungeonsProps) => {
  return (
    <div className="flex flex-row justify-evenly py-1 shadow-md w-full bg-[#1c1c22] overflow-x-scroll gap-2">
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
  )
}

export default TopbarDungeons
