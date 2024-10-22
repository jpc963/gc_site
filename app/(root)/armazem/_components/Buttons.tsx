import { Input } from "@/components/ui/input"
import { Minus, Plus } from "lucide-react"
import { useState } from "react"

type ButtonsProps = {
  userItem: QtdItemType[]
  item: QtdItemType
}

const Buttons = ({ userItem, item }: ButtonsProps) => {
  const index = userItem.findIndex((i) => i.abrev === item.abrev)
  const [value, setValue] = useState<number>(0)

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
    if (value !== userItem[index].qtd) {
      userItem[index].qtd = value
    }
  }

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
        value={value}
        onChange={handleInput}
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
