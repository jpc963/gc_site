"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog"
import { PersonagensIcons } from "@/constants"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useState } from "react"
import AddCharForm from "./AddCharForm"
import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"

declare type ButtonAddPersonagemProps = {
  label: string
  userId: string
  personagensAdicionados: { nome: string; level: number }[]
  className?: string
}

const ButtonAddPersonagem = ({
  label,
  personagensAdicionados,
  userId,
  className,
}: ButtonAddPersonagemProps) => {
  const listaNaoAdicionados = PersonagensIcons.filter(
    (char) => !personagensAdicionados.find((p) => p.nome === char.nome)
  )
  const [nomeChar, setNomeChar] = useState("")

  const [selecionado, setSelecionado] = useState(false)

  const openInputs = (nome: string) => {
    if (!selecionado) {
      setSelecionado(true)
    }

    setNomeChar(nome)
  }

  const close = () => {
    setSelecionado(false)
    setNomeChar("")
  }

  return (
    <Dialog onOpenChange={() => close()}>
      <DialogTrigger asChild>
        <Button className={className}>{label}</Button>
      </DialogTrigger>

      <DialogContent className="bg-[rgb(28,28,45)] border-none min-w-full p-4 2xl:p-2 2xl:min-w-[1200px]">
        <DialogTitle className="text-center font-semibold text-2xl">
          {nomeChar ? nomeChar : "Selecione o personagem"}
        </DialogTitle>

        <DialogDescription />

        <div
          className={cn(
            "flex flex-row items-center justify-evenly mb-4",
            {
              hidden: !selecionado,
            }
          )}
        >
          <div>[IMAGEM COMPLETA DO PERSONAGEM]</div>

          <div>
            <AddCharForm
              nomeChar={nomeChar}
              userId={userId}
              lista={listaNaoAdicionados}
            />
          </div>
        </div>

        <Separator className="my-4" />
        <TooltipProvider delayDuration={300}>
          <div className="flex flex-row flex-wrap gap-2 justify-center mb-4">
            {listaNaoAdicionados.map((img) => (
              <Tooltip key={img.nome}>
                <div className="relative w-28 h-24 rounded-sm bg-[rgba(107,100,243,0.43)] border shadow-[#0f172a96] shadow-inner">
                  <TooltipTrigger asChild>
                    <Image
                      src={img.imgUrl}
                      alt={img.alt}
                      quality={80}
                      fill
                      className="cursor-pointer object-cover"
                      onClick={() => openInputs(img.nome)}
                    />
                  </TooltipTrigger>
                </div>

                <TooltipContent className="bg-[#202b3c]">
                  {img.nome}
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        </TooltipProvider>
      </DialogContent>
    </Dialog>
  )
}

export default ButtonAddPersonagem
