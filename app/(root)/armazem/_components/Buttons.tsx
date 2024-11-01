import { Input } from "@/components/ui/input"
import { Minus, Plus } from "lucide-react"
import { useEffect, useState } from "react"

type ButtonsProps = {
  userItem: QtdItemType[]
  item: QtdItemType
}

const Buttons = ({ userItem, item }: ButtonsProps) => {
  const index = userItem.findIndex((i) => i.abrev === item.abrev)
  const [value, setValue] = useState<number>(item.qtd)

  const handleMinus = () => {
    if (value > 0) {
      setValue(value - 1)
    }
  }

  const handlePlus = () => {
    setValue(value + 1)
  }

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value)

    setValue(newValue)
  }

  const handleLeave = () => {
    if (value > 30000) {
      setValue(30000)
    }

    if (value !== userItem[index].qtd) {
      userItem[index].qtd = value
    }
  }

  useEffect(() => {
    setValue(item.qtd)
  }, [item])

  return (
    <div
      className="flex flex-row gap-2 items-center justify-center mt-4 self-end"
      onMouseLeave={handleLeave}
    >
      <Minus
        size={34}
        className="bg-[#1c1c34] p-2 rounded-md cursor-pointer"
        onClick={handleMinus}
      />

      <Input
        type="number"
        name="qtd"
        min={0}
        max={30000}
        value={value}
        onChange={handleInput}
        onBlur={handleLeave}
        className="w-16 border-0 text-center text-white"
      />

      <Plus
        size={34}
        className="bg-[#1c1c34] p-2 rounded-md cursor-pointer"
        onClick={handlePlus}
      />
    </div>
  )
}

export default Buttons
