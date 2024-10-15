"use client"

import { Loader2 } from "lucide-react"
import { Button } from "./ui/button"
import { Form } from "./ui/form"
import { addPersonagemFormSchema } from "@/lib/utils"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import CustomInputChar from "./CustomInputChar"
import { addPersonagensUser } from "@/lib/actions/user.actions"
import { useState } from "react"

interface AddCharFormProps {
  userId: string
  nomeChar: string
  lista: { imgUrl: string; alt: string; nome: string }[]
}

const AddCharForm = ({ userId, nomeChar, lista }: AddCharFormProps) => {
  const [isLoading, setIsLoading] = useState(false)

  const formSchema = addPersonagemFormSchema()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: "",
      level: 1,
      gp: 0,
      userId,
    },
  })

  const adicionar = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true)
    data.gp = Number(data.gp)
    data.nome = nomeChar

    await addPersonagensUser({ ...data }).then(() => {
      lista.filter((char) => char.nome !== nomeChar)
    })

    form.reset()

    setIsLoading(false)
  }

  return (
    <Form {...form}>
      <form
        className="space-y-8"
        onSubmit={form.handleSubmit(adicionar)}
      >
        <CustomInputChar
          control={form.control}
          name="level"
          label="Level"
          id={nomeChar}
        />

        <CustomInputChar
          control={form.control}
          name="gp"
          label="gp"
          id={nomeChar + "GP"}
        />

        <div className="flex flex-col gap-4">
          <Button
            type="submit"
            className="text-[16px] font-semibold text-white"
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
  )
}
export default AddCharForm
