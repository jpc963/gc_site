import { DungeonsIcons } from "@/constants"
import Image from "next/image"

interface DungeonProps {
  personagem: string
  pList: { nome: string; dungeon: string }[]
  setPList: (value: { nome: string; dungeon: string }[]) => void
}

const Dungeons = ({ personagem, pList, setPList }: DungeonProps) => {
  const dungeonFeita = (pNome: string, dNome: string) => {
    if (
      pList.find((value) => value.nome === pNome && value.dungeon === dNome)
    ) {
      setPList(
        pList.filter((value) => value.nome !== pNome || value.dungeon !== dNome)
      )
    } else {
      setPList([...pList, { nome: pNome, dungeon: dNome }])
    }
  }

  return (
    <div className="grid justify-center grid-flow-row grid-cols-3 gap-4 my-2">
      {DungeonsIcons.map((dungeon) => {
        return (
          <div
            className="w-10 h-8 text-center shadow-sm shadow-gray-900 flex justify-center items-center border-[#334258]"
            key={dungeon.nome}
          >
            <Image
              src={
                pList.find(
                  (value) =>
                    value.nome === personagem && value.dungeon === dungeon.nome
                )
                  ? "/icons/check.svg"
                  : dungeon.imgUrl
              }
              width={28}
              height={28}
              quality={100}
              alt={dungeon.alt}
              onClick={() => dungeonFeita(personagem, dungeon.nome)}
              className="p-2 cursor-pointer w-fit h-fit"
            />
          </div>
        )
      })}
    </div>
  )
}

export default Dungeons
