"use client"

import { Button } from "./ui/button"

declare type List = {
  nome: string
  dungeon: string
}

declare interface TopbarProps {
  list: List[]
  set: (value: List[]) => void
}

const Topbar = ({ list, set }: TopbarProps) => {
  const saveList = () => {
    console.log(list)
  }

  const resetList = () => {
    set([])
  }

  return (
    <div className="flex flex-row sticky top-0 h-12 shadow-sm w-full justify-end from-[#202b3c] to-[#334258] bg-gradient-to-bl">
      <Button
        variant="ghost"
        className="rounded-none h-full hover:bg-slate-400 hover:text-white"
        onClick={() => resetList()}
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