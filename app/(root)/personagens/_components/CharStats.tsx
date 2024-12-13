"use client"

import EditCharForm from "./edit/EditCharForm"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { BadgeCent, PersonStanding, Sword } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface EditProps {
  userId: string
  listaPersonagens: Personagem[]
  personagem: Personagem
}

const CharStats = ({ userId, listaPersonagens, personagem }: EditProps) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div
        className={cn(
          "flex flex-col justify-center p-4 py-2 mx-3 text-sm space-y-1 h-40 group-hover:h-20 group-hover:pt-2 transition-all duration-300",
          isOpen ? "h-20 pt-2" : "h-40 pt-0"
        )}
      >
        <div className="flex justify-between">
          <Sword size={16} />

          <p>{personagem.totalAtk}</p>
        </div>

        <div className="flex justify-between">
          <PersonStanding size={16} />

          <p>{personagem.level}</p>
        </div>

        <div className="flex justify-between">
          <BadgeCent size={16} />

          <p>{personagem.gp}</p>
        </div>
      </div>

      <Popover onOpenChange={(open) => setIsOpen(open)}>
        <PopoverTrigger asChild>
          <Button
            className="block m-auto my-4 rounded-sm border-none bg-[#7c3aed] hover:bg-[#534bf3] font-semibold"
            onClick={() => setIsOpen(true)}
          >
            Editar
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-80 bg-[#1c1c29] border-[#1c1c33] border shadow-md text-white">
          <EditCharForm
            userId={userId}
            personagem={personagem}
            personagens={listaPersonagens}
          />
        </PopoverContent>
      </Popover>
    </>
  )
}

export default CharStats
