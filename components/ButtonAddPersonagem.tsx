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

declare type ButtonAddPersonagemProps = {
  label: string
  user: string
  personagensDisponiveis: string[]
  personagensAdicionados: string[]
}

const ButtonAddPersonagem = ({
  label,
  personagensDisponiveis,
  personagensAdicionados,
  user,
}: ButtonAddPersonagemProps) => {
  const [personagemAdd, setPersonagemAdd] = useState<string[]>([])

  const addPersonagem = (nome: string) => {
    console.log(personagensDisponiveis)
    console.log(personagensAdicionados)
    console.log(user)

    setPersonagemAdd([...personagemAdd, nome])

    console.log(nome)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>{label}</Button>
      </DialogTrigger>

      <DialogContent className="bg-[#334258] min-w-fit border-none shadow-sm">
        <DialogTitle>Adicionar personagem</DialogTitle>
        <DialogDescription>Descrição do personagem</DialogDescription>
        <div className="h-96">
          Aqui fica a imagem do personagem completa e os inputs do lado para os
          dados serem preenchidos (vai subir ao selecionar um dos personagens)
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
                    onClick={() => addPersonagem(img.nome)}
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
