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
    <div className="flex flex-row sticky top-0 h-12 shadow-sm shadow-[#0f172a96] w-full justify-end bg-[#30336b]">
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
