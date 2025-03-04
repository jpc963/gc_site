"use client"

import { Form } from "@/components/ui/form"
import { addPersonagemFormSchema } from "@/lib/utils"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import CustomInputChar from "./CustomInputChar"
import { addPersonagensUser } from "@/lib/actions/char.actions"
import { useState } from "react"
import SubmitButton from "../SubmitButton"

const AddCharForm = ({
  userId,
  nomeChar,
  lista,
  personagens,
}: AddCharFormProps) => {
  const [isLoading, setIsLoading] = useState(false)

  const formSchema = addPersonagemFormSchema()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: "",
      totalAtk: 1,
      level: 1,
      gp: 1,
      awake: false,
    },
  })

  const adicionar = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true)
    data.nome = nomeChar

    await addPersonagensUser({
      userId,
      personagens: [...personagens, data],
    }).then(() => {
      lista.filter((char) => char.nome !== nomeChar)
    })

    form.reset()
    setIsLoading(false)
    window.location.reload()
  }

  return (
    <Form {...form}>
      <form
        className="space-y-3"
        onSubmit={form.handleSubmit(adicionar)}
      >
        <CustomInputChar
          control={form.control}
          name="totalAtk"
          label="Ataque Total"
          id={nomeChar + "atk"}
          type="number"
        />

        <CustomInputChar
          control={form.control}
          name="level"
          label="Level"
          id={nomeChar}
          type="number"
        />

        <CustomInputChar
          control={form.control}
          name="gp"
          label="GP"
          id={nomeChar + "GP"}
          type="number"
        />

        <CustomInputChar
          control={form.control}
          name="awake"
          label="Despertado"
          id={nomeChar + "awake"}
          type="boolean"
        />

        <SubmitButton
          title="Adicionar"
          isLoading={isLoading}
          submitting="Adicionando..."
        />
      </form>
    </Form>
  )
}

export default AddCharForm
