import { Loader2 } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { PersonagensIcons } from "@/constants"
import {
  addDesafiosConcluidos,
  editDesafiosConcluidos,
} from "@/lib/actions/desafios.actions"
import { cn } from "@/lib/utils"

interface DungeonProps {
  len: number
  func: () => void
  userId: string
  infos: DungeonFeita
  doc: EditDungeonsParams | null
}

const Topbar = ({ len, func, userId, infos, doc }: DungeonProps) => {
  const dgUser = { userId, nome: infos.nome, personagens: infos.personagens }
  const [isLoading, setIsLoading] = useState(false)

  const handleSave = async () => {
    setIsLoading(true)

    if (doc?.nome === infos.nome) {
      const data = {
        $id: doc.$id,
        userId: doc.userId,
        nome: infos.nome,
        personagens: infos.personagens,
      }
      await editDesafiosConcluidos(data)
      setIsLoading(false)
    } else {
      await addDesafiosConcluidos(dgUser)
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-row gap-2 justify-center items-center fixed bottom-4 right-8">
      <Button
        className={cn("bg-emerald-600 hover:bg-emerald-800", {
          "bg-red-400 hover:bg-red-500": len === PersonagensIcons.length,
        })}
        onClick={() => func()}
      >
        Selecionar todos
      </Button>

      <Button
        onClick={() => handleSave()}
        disabled={isLoading}
      >
        {isLoading ? (
          <Loader2
            size={20}
            className="animate-spin"
          />
        ) : (
          "Salvar"
        )}
      </Button>
    </div>
  )
}

export default Topbar
