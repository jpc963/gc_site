"use client"

import Image from "next/image"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { PersonagensIcons } from "@/constants"
import { cn } from "@/lib/utils"

import AddCharForm from "./AddCharForm"

declare type ButtonAddPersonagemProps = {
  label: string
  userId: string
  personagensAdicionados: Personagem[]
}

const ButtonAddPersonagem = ({
  label,
  personagensAdicionados,
  userId,
}: ButtonAddPersonagemProps) => {
  const listaNaoAdicionados = PersonagensIcons.filter(
    (char) => !personagensAdicionados.find((p) => p.nome === char.nome)
  )

  const [selecionado, setSelecionado] = useState({ imgUrl: "", alt: "" })

  const openInputs = (nome: string) => {
    setSelecionado({
      imgUrl: `/icons/personagens/${nome}_00.png`,
      alt: nome,
    })
  }

  const close = () => {
    setSelecionado({ imgUrl: "", alt: "" })
  }

  return (
    <Dialog onOpenChange={() => close()}>
      <DialogTrigger asChild>
        <Button className="rounded-none h-full w-[200px] font-semibold">
          {label}
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-[rgb(28,28,45)] border-none min-w-full p-4 2xl:p-2 lg:min-w-[1000px]">
        <DialogTitle className="text-center font-semibold text-2xl">
          {selecionado.alt ? selecionado.alt : "Selecione o personagem"}
        </DialogTitle>

        <DialogDescription />

        <div
          className={cn("flex flex-row items-center justify-evenly mb-4", {
            hidden: !selecionado.imgUrl,
          })}
        >
          {selecionado.imgUrl && (
            <div className="w-80 h-80 overflow-hidden relative hidden md:block">
              <Image
                src={selecionado.imgUrl}
                alt={selecionado.alt}
                quality={60}
                fill
                sizes="100%"
                className="object-contain"
              />
            </div>
          )}

          <div>
            <AddCharForm
              nomeChar={selecionado.alt}
              userId={userId}
              lista={listaNaoAdicionados}
              personagens={personagensAdicionados}
            />
          </div>
        </div>

        <Separator className="my-4" />

        <TooltipProvider delayDuration={300}>
          <div className="flex flex-row flex-wrap gap-2 justify-center mb-4">
            {listaNaoAdicionados.map((img) => (
              <Tooltip key={img.nome}>
                <div className="relative w-20 h-20 shadow-[#0f172a96] rounded-md">
                  <TooltipTrigger asChild>
                    <Image
                      src={img.imgUrl}
                      alt={img.alt}
                      quality={100}
                      fill
                      sizes="100%"
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
