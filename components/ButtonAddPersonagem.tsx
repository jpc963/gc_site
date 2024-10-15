"use client"

import Image from "next/image"
import { Button } from "./ui/button"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "./ui/dialog"
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

declare type ButtonAddPersonagemProps = {
  label: string
  userId: string
  personagensDisponiveis: string[]
  personagensAdicionados: string[]
}

const ButtonAddPersonagem = ({
  label,
  personagensDisponiveis,
  personagensAdicionados,
  userId,
}: ButtonAddPersonagemProps) => {
  //vai adicionar o personagem nessa lista, e depois vai alterar os personagens adicionados com os devidos leveis e gp
  // const [personagemAdd, setPersonagemAdd] = useState<Personagem[]>([])
  const [nomeChar, setNomeChar] = useState("")

  const [selecionado, setSelecionado] = useState(false)

  const [isLoading, setIsLoading] = useState(false)

  const openInputs = (nome: string) => {
    if (!selecionado) {
      setSelecionado(true)
    }

    setNomeChar(nome)
  }

  return (
    <Dialog onOpenChange={() => setSelecionado(false)}>
      <DialogTrigger asChild>
        <Button>{label}</Button>
      </DialogTrigger>

      <DialogContent className="bg-[#334258] min-w-fit border-none shadow-sm">
        <DialogTitle>Adicionar personagem</DialogTitle>
        <DialogDescription>Descrição do personagem</DialogDescription>
        <div
          className={cn("flex gap-2 items-center justify-center flex-row", {
            hidden: !selecionado,
          })}
        >
          <div className="">[IMAGEM COMPLETA DO PERSONAGEM]</div>

          <AddCharForm
            // personagemAdd={personagemAdd}
            isLoading={isLoading}
            // setPersonagemAdd={setPersonagemAdd}
            setIsLoading={setIsLoading}
            nomeChar={nomeChar}
            userId={userId}
          />
        </div>

        <TooltipProvider>
          <div className="grid grid-flow-col grid-rows-2 gap-2 items-center justify-center">
            {PersonagensIcons.map((img) => (
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
