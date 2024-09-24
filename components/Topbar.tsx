"use client"

import { Button } from "./ui/button"

declare type List = {
  nome: string
  dungeon: string
}

declare interface TopbarProps {
  list: List[]
  reset: () => void
}

const Topbar = ({ list, reset }: TopbarProps) => {
  const saveList = () => {
    console.log(list)
  }

  return (
    <div className="flex flex-row sticky top-0 h-12 shadow-sm w-full bg-[#202b3c] justify-end">
      <Button
        variant="ghost"
        className="rounded-none h-full hover:bg-slate-400 hover:text-white"
        onClick={() => reset()}
      >
        Reset
      </Button>

      <Button
        className="bg-emerald-400 rounded-none h-full w-[200px] hover:bg-emerald-700 font-semibold"
        onClick={() => saveList()}
      >
        Salvar
      </Button>
    </div>
  )
}

export default Topbar
