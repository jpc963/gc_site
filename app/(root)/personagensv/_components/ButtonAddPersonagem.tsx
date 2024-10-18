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

      <DialogContent className="bg-[#130f40] border-[#30336b] min-w-fit w-full border-none">
        <DialogTitle className="text-center font-semibold text-2xl text-white">
          {nomeChar ? nomeChar : "Selecione o personagem"}
        </DialogTitle>

        <DialogDescription />

        <div
          className={cn("flex flex-row items-center justify-center gap-8 mb-4", {
            hidden: !selecionado,
          })}
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

        <Separator className="my-4"/>

        <TooltipProvider delayDuration={300}>
          <div className="grid grid-flow-col grid-rows-2 gap-2 items-center justify-center">
            {listaNaoAdicionados.map((img) => (
              <Tooltip key={img.nome}>
                <TooltipTrigger asChild>
                  <Image
                    src={img.imgUrl}
                    alt={img.alt}
                    width={80}
                    height={80}
                    className="cursor-pointer"
                    onClick={() => openInputs(img.nome)}
                  />
                </TooltipTrigger>

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
