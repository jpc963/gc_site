"use client"

import { editPersonagemFormSchema } from "@/lib/utils"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { editPersonagensUser } from "@/lib/actions/char.actions"
import { Form } from "@/components/ui/form"
import CustomInputEditChar from "./CustomInputEditChar"
import { useState } from "react"
import SubmitButton from "../SubmitButton"

const EditCharForm = ({
  userId,
  personagem,
  personagens,
}: EditCharFormProps) => {
  const [isLoading, setIsLoading] = useState(false)

  const formSchema = editPersonagemFormSchema()

  // se trocar o values para defaultValue, o form.handleSubmit não funciona, não sei porque
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: {
      userId,
      nome: personagem.nome,
      totalAtk: personagem.totalAtk || 0,
      level: personagem.level || 0,
      gp: personagem.gp || 0,
    },
  })

  const editar = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true)

    const personagensAtualizados = personagens.map((p) => {
      if (p.nome === personagem.nome) {
        return {
          nome: data.nome,
          totalAtk: data.totalAtk,
          level: data.level,
          gp: data.gp,
        }
      }

      return p
    })

    await editPersonagensUser({
      userId,
      personagens: personagensAtualizados,
    })

    console.log(personagensAtualizados)

    window.location.reload()

    setIsLoading(false)
  }

  return (
    <Form {...form}>
      <form
        className="grid gap-4"
        onSubmit={form.handleSubmit(editar)}
      >
        <div className="space-y-2">
          <h3 className="text-center text-xl font-medium leading-none">
            {personagem.nome}
          </h3>

          <p className="text-center text-sm text-muted-foreground">
            Edite as informações do personagem
          </p>
        </div>

        <CustomInputEditChar
          control={form.control}
          name="totalAtk"
          label="Atk Total:"
          id={personagem.nome + "atk"}
          type="number"
        />

        <CustomInputEditChar
          control={form.control}
          name="level"
          label="Level:"
          id={personagem.nome}
          type="number"
        />

        <CustomInputEditChar
          control={form.control}
          name="gp"
          label="GP:"
          id={personagem.nome + "GP"}
          type="number"
        />

        <SubmitButton
          title="Editar"
          isLoading={isLoading}
          submitting="Editando"
        />
      </form>
    </Form>
  )
}

export default EditCharForm
