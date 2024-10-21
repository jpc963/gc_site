import { Button } from "@/components/ui/button"
import { PersonagensIcons } from "@/constants"
import { addDesafiosConcluidos } from "@/lib/actions/user.actions"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"

interface DungeonProps {
  len: number
  func: () => void
  userId: string
  infos: DungeonFeita
}

const Topbar = ({ len, func, userId, infos }: DungeonProps) => {
  const dgUser = { userId, nome: infos.nome, personagens: infos.personagens }

  const handleSave = () => {
    addDesafiosConcluidos(dgUser)
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

      <Button onClick={() => handleSave()}>Salvar</Button>
    </div>
  )
}

export default Topbar
