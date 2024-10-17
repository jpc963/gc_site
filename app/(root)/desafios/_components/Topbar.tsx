"use client"

import { Button } from "@/components/ui/button"

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
    <div className="flex flex-row sticky top-0 h-12 shadow-sm w-full justify-end from-[#30336b] to-[#130f40] bg-gradient-to-br">
      <Button
        variant="ghost"
        className="rounded-none h-full hover:bg-slate-400 text-white"
        onClick={() => resetList()}
      >
        Reset
      </Button>

      <Button
        className="rounded-none h-full w-[200px] font-semibold"
        onClick={() => saveList()}
      >
        Salvar
      </Button>
    </div>
  )
}

export default Topbar
