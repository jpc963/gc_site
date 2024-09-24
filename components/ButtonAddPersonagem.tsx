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
import { addPersonagemFormSchema, cn } from "@/lib/utils"
import CustomInput from "./CustomInput"
import { Form } from "./ui/form"
import { Loader2 } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useForm } from "react-hook-form"

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
  const [personagemAdd, setPersonagemAdd] = useState<Personagem[]>([])
  const [selecionado, setSelecionado] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const formSchema = addPersonagemFormSchema()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: "",
      level: 1,
      gp: 0,
    },
  })

  const openInputs = () => {
    setSelecionado(!selecionado)
  }

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true)
    const personagem = {
      nome: data.nome,
      level: data.level,
      gp: data.gp,
    }

    setPersonagemAdd([...personagemAdd, { ...personagem }])
    setIsLoading(false)
  }

  return (
    <Dialog>
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

          <div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <CustomInput
                  control={form.control}
                  name="username"
                  label="Usuário"
                  placeholder="Digite seu nome de usuário"
                  id="username"
                />

                <div className="flex flex-col gap-4">
                  <Button
                    type="submit"
                    className="rounded-lg border text-[16px] font-semibold text-white"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2
                          size={20}
                          className="animate-spin"
                        />
                        &nbsp; Adicionando...
                      </>
                    ) : (
                      "Adicionar"
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
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
                    onClick={() => openInputs()}
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
