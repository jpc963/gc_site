import { Button } from "@/components/ui/button"
import { editArmazemUser } from "@/lib/actions/armazem.actions"
import { Loader2 } from "lucide-react"
import { useState } from "react"

type TopbarProps = {
  items: ArmazemUserProps
}

const Topbar = ({ items }: TopbarProps) => {
  const [isLoading, setIsLoading] = useState(false)

  const handleSave = async () => {
    setIsLoading(true)

    await editArmazemUser(items)

    setIsLoading(false)
  }

  return (
    <div className="flex flex-row sticky top-0 h-12 shadow-md w-full justify-end bg-[#1c1c22] z-50">
      <Button
        onClick={() => handleSave()}
        disabled={isLoading}
        className="rounded-none h-full w-[200px] font-semibold"
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
